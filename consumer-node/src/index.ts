import express, { Request, Response } from "express";
import KafkaConsumer from "./kafka-consumer";

const app = express();
const port = 3001;
const kafkaConsumer = new KafkaConsumer();

kafkaConsumer.start();

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
