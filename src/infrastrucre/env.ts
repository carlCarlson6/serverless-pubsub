import { z } from "zod";

const envSchema = z.object({
  azureStorageAccountConnStr: z.string().min(0),
});

export const env = envSchema.parse({
  azureStorageAccountConnStr: process.env.AZURE_STORAGE_ACCOUNT!,
});