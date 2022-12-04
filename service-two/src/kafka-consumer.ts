import ip from "ip";
import {
  Consumer,
  ConsumerSubscribeTopics,
  Kafka,
  EachMessagePayload,
  logLevel,
} from "kafkajs";

const host = ip.address();

export default class KafkaConsumer {
  private kafkaConsumer: Consumer;

  public constructor() {
    this.kafkaConsumer = this.createConsumer();
  }

  public async start(): Promise<void> {
    const topics: ConsumerSubscribeTopics = {
      topics: ["demo"],
      fromBeginning: true,
    };

    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topics);

      console.log(`Consumer connected`);

      await this.kafkaConsumer.run({
        autoCommit: true,
        autoCommitInterval: 100,
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          const parsedMessage = JSON.parse(message?.value?.toString() || "");

          console.log(
            `Received message on topic: ${topic} partition: ${partition}`
          );

          console.log(`Message: ${JSON.stringify(parsedMessage)}`);
          console.log(parsedMessage);
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect();
  }

  private createConsumer(): Consumer {
    const kafka = new Kafka({
      logLevel: logLevel.INFO,
      clientId: "client-id",
      brokers: [`${host}:9092`],
    });

    return kafka.consumer({
      groupId: "consumer-group",
      retry: { retries: 5 },
    });
  }
}
