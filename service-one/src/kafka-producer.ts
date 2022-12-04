import { Kafka, Producer, ProducerRecord, RecordMetadata } from "kafkajs";

interface CustomMessageFormat {
  topic: string;
  payload: object;
}

export default class KafkaProducer {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      console.log("Error connecting the producer: ", error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: "producer-client",
      brokers: ["localhost:9092"],
    });

    return kafka.producer();
  }

  public async sendMessage(
    message: CustomMessageFormat
  ): Promise<RecordMetadata[]> {
    await this.start();

    const event: ProducerRecord = {
      acks: 0,
      topic: message.topic,
      messages: [
        {
          key: "key",
          value: JSON.stringify(message),
        },
      ],
    };

    const result = this.producer.send(event);

    console.log(`Successfully sent ${JSON.stringify(event)} event`);

    await this.shutdown();

    return result;
  }
}
