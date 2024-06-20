import { handlerFor } from "@node-ts/bus-core";
import { Command } from "@node-ts/bus-messages";

export class DeliverMessage extends Command {
  $name = 'serverlespubsub/message/delivery';
  $version = 1;

  constructor(
    readonly url: string,
    readonly body: any
  ) {
    super();
  }
}

export const deliverMessageHandler = handlerFor(DeliverMessage, async (message) => {
  const response = await fetch(message.url, {
    body: JSON.stringify(message.body),
    method: 'POST'
  });

  if (!response.ok) {
    console.error('could not deliver message to target');
    throw new Error('ERROR_DELIVERING_MESSAGE');
  }

  console.log('succed to deliver message');
});

const handleSucceedToDeliverMessage = () => {}
const handleFailToDeliverMessage = () => {}