import { kafka } from "../config/kafka";

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'notification-group' });

export async function initKafka() {
    await producer.connect();
    await consumer.connect();
    await consumer.subscribe({ topic: 'notifications', fromBeginning: true });
}

export async function produceEvent(event: any) {
    await producer.send({
        topic: 'notifications',
        messages: [
            { value: JSON.stringify({...event, _id: event._id?.toString()}) }
        ]
    });
}

export function onEvent(callback: (event: any) => Promise<void>) {
    consumer.run({
        eachMessage: async({message}) => {
            const event = JSON.parse(message.value!.toString());
            await callback(event);
        }
    });
}