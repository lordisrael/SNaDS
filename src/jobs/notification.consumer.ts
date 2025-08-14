import { initKafka, onEvent, produceEvent } from "../services/queue.service";
import { getUserPref, checkRateLimit, setUserPref } from "../services/cache.service";
import { sendEmail } from "../services/notification.service";
import { logEvent } from "../services/logger.service";
import Preference from "../models/prefrence.model";

(async () => {
    await initKafka();

    onEvent(async (event) => {
        if (event.from === 'retry') return;
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
            const res = await sendEmail(event, prefs);
            await logEvent(event.id, 'success');
        } catch (error) {
            await produceEvent({ ...event, retry: (event.retry || 0) + 1, from: 'retry' });
            await logEvent(event.id, 'failure');
        }

    });
})