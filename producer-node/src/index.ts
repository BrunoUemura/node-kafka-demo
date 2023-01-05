import express, { Request, Response } from "express";
import KafkaProducer from "./kafka-producer";

const app = express();
const port = 3000;
const kafkaProducer = new KafkaProducer();

app.use(express.json());

app.post("/produce", async (req: Request, res: Response) => {
  const body = req.body;

  const event = {
    topic: "demo",
    payload: body,
  };

  await kafkaProducer.sendMessage(event);

  return res.status(200).send({
    message: "Successfully sent message",
    data: event,
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
