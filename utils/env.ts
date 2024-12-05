import zod from "zod";
const envSchema = zod.object({
  NEXT_PUBLIC_API_URL: zod.string().min(1),
  AWS_SECRET_ACCESS_KEY: zod.string().min(1),
  AWS_ACCESS_KEY: zod.string().min(1),
  AWS_REGION: zod.string().min(1),
  AWS_BUCKET_NAME: zod.string().min(1),
  // OPENAI_API_KEY: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
