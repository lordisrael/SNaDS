"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_service_1 = require("../services/queue.service");
const cache_service_1 = require("../services/cache.service");
const notification_service_1 = require("../services/notification.service");
const logger_service_1 = require("../services/logger.service");
(async () => {
    await (0, queue_service_1.initKafka)();
    (0, queue_service_1.onEvent)(async (event) => {
        const prefs = await (0, cache_service_1.getUserPref)(event.user_id);
        if (!prefs)
            return;
        if (!prefs.notifications[event.method])
            return;
        if (!(await (0, cache_service_1.checkRateLimit)(event.user_id, event.method)))
            return;
        try {
            const res = await (0, notification_service_1.sendEmail)(event, prefs);
            await (0, logger_service_1.logEvent)(event.id, 'success');
        }
        catch (error) {
            await (0, queue_service_1.produceEvent)({ ...event, retry: (event.retry || 0) + 1, from: 'retry' });
            await (0, logger_service_1.logEvent)(event.id, 'failure');
        }
    });
});
//# sourceMappingURL=notification.consumer.js.map