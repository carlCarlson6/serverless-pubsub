import express from "express";
import { bus, startBus } from "../bus";
import { buildMessagePublishingRouter } from "../../messaging/message-delivery/messageDelivering";
import { authMiddleWare } from "../../messaging/authMiddleWare";

const app = express();
app.use(express.json());
app.use(authMiddleWare);
app.use(buildMessagePublishingRouter())
app.get('/', (_, res) => res.send('Hello World!'));

export const runServer = async () => {
  await startBus(bus);
  app.listen(
    3000,
    '0.0.0.0',
    () => console.log('the server is running on', 3000)
  );
};
