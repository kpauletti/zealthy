import { z } from "zod";

const schema = z
    .object({
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
        PORT: z.string().default("3000"),
        DB_PORT: z.string().default("5432"),
        DB_HOST: z.string().default("localhost"),
        DB_NAME: z.string().default("app"),
        DB_USER: z.string().default("postgres"),
        DB_PASSWORD: z.string().default(""),
        JWT_SECRET: z.string().default("secret"),
    })
    // If NODE_ENV is test, then append _test to DB_NAME
    .transform((val) => ({
        ...val,
        DB_NAME: val.NODE_ENV === "test" ? `${val.DB_NAME}_test` : val.DB_NAME,
    }));

const parsed = schema.safeParse(process.env);

if (parsed.success === false) {
    console.error("Invalid env variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid env variables");
}

export const env = parsed.data as z.infer<typeof schema>;
