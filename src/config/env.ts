import { z } from "zod";

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, { message: "BOT_TOKEN is required" }),
  DATABASE_URI: z.string().min(1, { message: "DATABASE_URI is required" }),

  NODE_ENV: z
    .enum(["development", "production"])
    .default("development")
    .optional(), // allow missing, fallback to default

  ADMIN_USERS: z
    .string()
    .optional() // if not set, it won’t break
    .transform((val) =>
      val ? val.split(",").filter(Boolean).map((n) => Number(n)) : []
    ),

  REDIS_URI: z
    .string()
    .default("redis://127.0.0.1:6379")
    .optional(), // default covers missing case

  CUSTOM_API_ROOT: z
    .string()
    .url({ message: "CUSTOM_API_ROOT must be a valid URL" })
    .default("https://api.telegram.org")
    .optional(),
});

export const env = envSchema.parse(process.env);
