import { DequeuedMessageItem, QueueClient, QueueServiceClient } from "@azure/storage-queue";
import { CoreDependencies, Transport, TransportInitializationOptions, TransportMessage } from "@node-ts/bus-core";
import { Event, MessageAttributes, MessageAttributeMap, Command } from "@node-ts/bus-messages";
import { env } from "../env";
import { initializeAzureStorageQueue } from "./initializeAzureStorageQueue";
import { readNextMessageOnStorageQueue } from "./readNextMessageOnStorageQueue";

export class AzureStoragteAccountTransport implements Transport<DequeuedMessageItem> {
  private readonly queueService: QueueServiceClient;
  private readonly messagingQueue: QueueClient;
  private readonly deadLetter: QueueClient;
  
  constructor() {
    this.queueService   = QueueServiceClient.fromConnectionString(env.azureStorageAccountConnStr);
    this.messagingQueue = this.queueService.getQueueClient(env.messagingQueueName);
    this.deadLetter     = this.queueService.getQueueClient(env.deadLetterQueueName);
  }

  async send<TCommand extends Command>(command: TCommand, messageOptions?: MessageAttributes<MessageAttributeMap, MessageAttributeMap> | undefined): Promise<void> {
    await this.messagingQueue.sendMessage(JSON.stringify(command));
  }
  
  readNextMessage(): Promise<TransportMessage<DequeuedMessageItem> | undefined> {
    return readNextMessageOnStorageQueue(this.messagingQueue);
  }

  async deleteMessage(message: TransportMessage<DequeuedMessageItem>): Promise<void> {
    await this.messagingQueue.deleteMessage(message.raw.messageId, message.raw.popReceipt);
  }
  
  async returnMessage(message: TransportMessage<DequeuedMessageItem>): Promise<void> {
    console.error('message:', message.domainMessage.$name, 'failed - sending to dead letter');
    await this.deadLetter.sendMessage(JSON.stringify(message));
    await this.deleteMessage(message);
  }

  async initialize?(options: TransportInitializationOptions): Promise<void> {
    await initializeAzureStorageQueue(this.queueService);
  }
  
  prepare(coreDependencies: CoreDependencies): void {}

  fail(transportMessage: TransportMessage<DequeuedMessageItem>): Promise<void> {
    throw new Error("[fail] - Method not implemented.");
  }

  publish<TEvent extends Event>(event: TEvent, messageOptions?: MessageAttributes<MessageAttributeMap, MessageAttributeMap> | undefined): Promise<void> {
    throw new Error("[publish] - Method not implemented.");
  }
  
}

