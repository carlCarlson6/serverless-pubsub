import { z } from "zod";

const envSchema = z.object({
  azureStorageAccountConnStr: z.string().min(1),
  messagingQueueName:         z.string().min(1),
  deadLetterQueueName:        z.string().min(1),
  pubSubApiKey:               z.string().min(1),
});

const createEnv = (env: z.infer<typeof envSchema>) => envSchema.parse({...env});

export const env = createEnv({
  azureStorageAccountConnStr: process.env.AZURE_STORAGE_ACCOUNT_CONN_STR!,
  messagingQueueName:         process.env.MESSAGING_QUEUE_NAME!,
  deadLetterQueueName:        process.env.DEAD_LETTER_QUEUE_NAME!,
  pubSubApiKey:               process.env.PUBSUB_API_KEY!,
})