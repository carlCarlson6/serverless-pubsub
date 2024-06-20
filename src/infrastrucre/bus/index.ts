import { Bus, BusInstance } from "@node-ts/bus-core";
import { AzureStoragteAccountTransport } from "./transport";
import { deliverMessageHandler } from "../../messaging/message-delivery/DeliverMessage";

export const bus = Bus
  .configure()
  .withTransport(new AzureStoragteAccountTransport())
  .withHandler(deliverMessageHandler)
  .build();

export const startBus = async (bus: BusInstance) => {
  await bus.initialize();
  await bus.start();
}