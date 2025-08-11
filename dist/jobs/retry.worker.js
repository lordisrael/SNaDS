"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queue_service_1 = require("../services/queue.service");
(0, queue_service_1.onEvent)(async (event) => {
    if (event.from !== 'retry')
        return;
    if (event.retry > 5)
        return; // stop retrying after 5 attempts
    const wait = Math.pow(2, event.retry) * 1000; // 2s, 4s, 8s ...
    setTimeout(async () => {
        await (0, queue_service_1.produceEvent)(event);
    }, wait);
});
//# sourceMappingURL=retry.worker.js.map