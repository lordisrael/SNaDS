

import { kafka } from "../config/kafka";

const producer = kafka.producer();

export async function logEvent(eventId: string,
    status: string,
    messageId?: string,
    error?: string) {
    await producer.send({
        topic: 'notification-logs',
        messages: [{
            value: JSON.stringify({ eventId, status, messageId, error, timestamp: new Date() })
        }]
    });
}