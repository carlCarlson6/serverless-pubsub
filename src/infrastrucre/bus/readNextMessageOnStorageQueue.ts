import { DequeuedMessageItem, QueueClient } from "@azure/storage-queue";
import { TransportMessage } from "@node-ts/bus-core";
import { deliverMessageSchema } from "../../messaging/message-delivery/messageDelivering";
import { DeliverMessage } from "../../messaging/message-delivery/DeliverMessage";
import { match } from "ts-pattern";
import { z } from "zod";

export const readNextMessageOnStorageQueue = async (queue: QueueClient) : Promise<TransportMessage<DequeuedMessageItem> | undefined> => {
  const response = await queue.receiveMessages({ numberOfMessages: 1 });
  const message = response.receivedMessageItems.at(0);

  if (!message) return undefined;

  try {
    const domainMessage = await messageParser(message);
    if (!domainMessage) return undefined;
  
    return {
      id: message.messageId,
      raw: message,
      domainMessage: domainMessage,
      attributes: {
        correlationId: message.messageId,
        attributes: {},
        stickyAttributes: {}
      },
    }
  }
  catch(e) {
    console.log(e);
    return undefined;
  }
}

const busMessageSchema = z.object({ $name: z.string().min(1) });

const messageParser = async (message: DequeuedMessageItem) => {
  try {
    const jsonMessageText = JSON.parse(message.messageText);
    const busMessage = await busMessageSchema.parseAsync(jsonMessageText);
    const maybeDomainMessage = await match(busMessage.$name)
      .with('serverlespubsub/message/delivery', async () => {
        const parsed = await deliverMessageSchema.parseAsync(jsonMessageText)
        return new DeliverMessage(parsed.url, parsed.body);
      })
      .otherwise(_ => Promise.resolve(undefined));
      return maybeDomainMessage;
  }
  catch(e) {
    console.log(e);
    return undefined;
  }
}