"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKafka = initKafka;
exports.produceEvent = produceEvent;
exports.onEvent = onEvent;
const kafka_1 = require("../config/kafka");
const producer = kafka_1.kafka.producer();
const consumer = kafka_1.kafka.consumer({ groupId: 'notification-group' });
async function initKafka() {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'notifications', fromBeginning: true });
}
async function produceEvent(event) {
    await producer.send({
        topic: 'notifications',
        messages: [
            { value: JSON.stringify(event) }
        ]
    });
}
function onEvent(callback) {
    consumer.run({
        eachMessage: async ({ message }) => {
            const event = JSON.parse(message.value.toString());
            await callback(event);
        }
    });
}
//# sourceMappingURL=queue.service.js.map