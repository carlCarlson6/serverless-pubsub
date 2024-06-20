import { QueueServiceClient } from "@azure/storage-queue";
import { env } from "../env";

export const initializeAzureStorageQueue = async (queueService: QueueServiceClient) => Promise.all([
  createQueue(queueService, env.messagingQueueName),
  createQueue(queueService, env.deadLetterQueueName),
]);

const createQueue = async (queueService: QueueServiceClient, queueName: string) => {
  const iter = queueService.listQueues();
  for await (const item of iter) {
    if (item.name === queueName) return;
  }

  const response = await queueService.createQueue(queueName);
  if (!response) throw new Error(`error while trying to create queue ${queueName}`);
}