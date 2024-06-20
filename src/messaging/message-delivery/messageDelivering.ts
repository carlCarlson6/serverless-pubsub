import { BusInstance } from "@node-ts/bus-core";
import { Request, Response, Router } from "express";
import { ZodError, z } from "zod";
import { bus } from "../../infrastrucre/bus";
import { DeliverMessage } from "./DeliverMessage";
import { authMiddleWare } from "../authMiddleWare";

export const buildMessagePublishingRouter = () => {
  const messagePublishingRouter = Router();
  messagePublishingRouter.post('/api/deliver-message', messagePublishingEndpoint(bus));
  return messagePublishingRouter;
}

export const deliverMessageSchema = z.object({
  url: z.string().min(1).url(),
  body: z.any().nullable(),
});

const messagePublishingEndpoint = (bus: BusInstance) => async (req: Request, res: Response) => {
  try {
    const reqBody = await deliverMessageSchema.parseAsync(req.body);
    await bus.send(new DeliverMessage(reqBody.url, reqBody.body));
    res.status(201).send('OK').end();
  }
  catch(e) {
    console.error(e)
    if(e instanceof ZodError) return res.status(400).json({error: 'invalid-input'}).end();

    return res.status(500).end();
  }
}

