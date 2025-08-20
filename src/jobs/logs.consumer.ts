import { kafka } from "../config/kafka";
import Log from "../models/log.model";

const logConsumer = kafka.consumer({ groupId: "log-consumer-group" });

export async function startLogConsumer() {
  await logConsumer.connect();
  await logConsumer.subscribe({ topic: "notification-logs", fromBeginning: true });

  await logConsumer.run({
    eachMessage: async ({ message }) => {
      try {
        const logData = JSON.parse(message.value?.toString() || "{}");
        await Log.create(logData); // save to MongoDB
        console.log("📥 Log saved:", logData);
      } catch (err) {
        console.error("❌ Failed to process log:", err);
      }
    },
  });
}