import { QueueServiceClient } from "@azure/storage-queue";
import { CoreDependencies, Transport, TransportConnectionOptions, TransportInitializationOptions, TransportMessage } from "@node-ts/bus-core";
import { Event, MessageAttributes, MessageAttributeMap, Command } from "@node-ts/bus-messages";
import { env } from "./env";

const queueServiceClient = QueueServiceClient.fromConnectionString(env.azureStorageAccountConnStr);

export class AzureStoragteAccountTransport implements Transport {
  publish<TEvent extends Event>(event: TEvent, messageOptions?: MessageAttributes<MessageAttributeMap, MessageAttributeMap> | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  send<TCommand extends Command>(command: TCommand, messageOptions?: MessageAttributes<MessageAttributeMap, MessageAttributeMap> | undefined): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  fail(transportMessage: TransportMessage<unknown>): Promise<void>;
  fail(transportMessage: TransportMessage<unknown>): Promise<void>;
  fail(transportMessage: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  readNextMessage(): Promise<TransportMessage<{}> | undefined> {
    throw new Error("Method not implemented.");
  }
  
  deleteMessage(message: TransportMessage<{}>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  returnMessage(message: TransportMessage<{}>): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  prepare(coreDependencies: CoreDependencies): void {
    throw new Error("Method not implemented.");
  }
  
  connect?(options: TransportConnectionOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  disconnect?(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  start?(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  stop?(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  initialize?(options: TransportInitializationOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  dispose?(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}