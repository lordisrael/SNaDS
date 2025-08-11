import { initKafka, onEvent, produceEvent } from "../services/queue.service";
import { getUserPref, checkRateLimit } from "../services/cache.service";
import { sendEmail } from "../services/notification.service";
import { logEvent } from "../services/logger.service";

(async () => {
    await initKafka();

    onEvent(async (event) => {
        const prefs = await getUserPref(event.user_id);
        if (!prefs) return;
        if (!prefs.notifications[event.method]) return;
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