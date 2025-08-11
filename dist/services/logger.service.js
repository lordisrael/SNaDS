"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logEvent = logEvent;
const kafka_1 = require("../config/kafka");
const producer = kafka_1.kafka.producer();
async function logEvent(eventId, status, messageId, error) {
    await producer.send({
        topic: 'notification-logs',
        messages: [{
                value: JSON.stringify({ eventId, status, messageId, error, timestamp: new Date() })
            }]
    });
}
//# sourceMappingURL=logger.service.js.map