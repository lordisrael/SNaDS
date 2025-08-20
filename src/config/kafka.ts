// import { Kafka } from "kafkajs";

// export const kafka = new Kafka({
//     clientId: "snads-service",
//     brokers: [process.env.KAFKA_BROKER || "localhost:9092"]
// });

import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "snads-service",
  brokers: ["kafka:9092"], // 👈 must match docker network hostname
});
