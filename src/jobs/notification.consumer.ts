import { initKafka, onEvent, produceEvent } from "../services/queue.service";
import { getUserPref, checkRateLimit, setUserPref } from "../services/cache.service";
import { sendEmail } from "../services/notification.service";
import { logEvent } from "../services/logger.service";
import Preference from "../models/prefrence.model";
import Event from "../models/event.model";

export const startWorker = async () => {
    onEvent(async (event) => {
        if (event.from === "retry" && event.retry > 3) return;
        // Ensure event is queued before processing
        const freshEvent = await Event.findById(event._id);
        if (!freshEvent || freshEvent.status !== "queued") return;
        let prefs = await getUserPref(event.user_id);
        if (!prefs) {
            const dbPrefs = await Preference.findOne({ user_id: event.user_id });
            if (!dbPrefs) return; // no prefs at all → stop
            prefs = dbPrefs.toObject();
            await setUserPref(event.user_id, prefs);
        }
        if (!prefs.notifications[`${event.method}_enabled`]) return;
        if (!(await checkRateLimit(event.user_id, event.method))) return;

        try {
            // ✅ Only send email if method is 'email'
            if (event.method === 'email') {
                await sendEmail(event, prefs);
                await Event.findByIdAndUpdate(event._id, {
                    status: "success",
                    sent_at: new Date(),
                });
                await logEvent(event._id, 'success', "message sent successfully", undefined);
                return
            }
        } catch (error) {
            const retryCount = (event.retry || 0) + 1;

             if (retryCount > 3) {
                await Event.findByIdAndUpdate(event._id, {
                    status: "failure",
                    sent_at: new Date(),
                });
                await logEvent(event._id, 'permanent_failure', "message failed permanently", undefined);
                return; // 🚫 stop retrying
            }
            const wait = Math.pow(2, retryCount) * 1000; // exponential backoff
            setTimeout(async () => {
                await produceEvent({ ...event, retry: retryCount, from: "retry" });
            }, wait);
            await logEvent(event._id, 'retry_scheduled', `Retrying in ${wait / 1000} seconds`, undefined);
        }
    });
}