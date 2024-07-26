import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';


export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  // driver: 'sqlite',
  dialect:'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;