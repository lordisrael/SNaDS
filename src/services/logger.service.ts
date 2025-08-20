

import { kafka } from "../config/kafka";

const producer = kafka.producer();

export async function initLogProducer() {
  await producer.connect();
}


export async function logEvent(eventId: string,
    status: string,
    message?: string,
    error?: string) {
    await producer.send({
        topic: 'notification-logs',
        messages: [{
            value: JSON.stringify({ eventId, status, message, error, timestamp: new Date() })
        }]
    });
}