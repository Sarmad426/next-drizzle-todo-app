# Full Stack Todo app built with Next.js and Drizzle ORM

## Project setup

**Create Next app:**

```bash
pnpm dlx create-next-app@latest --typescript
```

Make sure to add *tailwind css*.

**Install dependencies:**

```bash
pnpm add drizzle-orm
pnpm add -D drizzle-kit
pnpm i @libsql/client
```

**Create a folder name `db`**

Create two files `drizzle.ts` and `schema.ts`

**Paste the following code into `drizzle.ts`**

```ts
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import * as schema from './schema'

const client = createClient({
  url: process.env.DATABASE_URL!,
});

export const db = drizzle(client,{schema});
```

**Paste the following code into `schema.ts`**

```ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todo = sqliteTable('todo', {
  id: integer('id').primaryKey(),
  title: text('text').notNull(),
  completed: integer('done', { mode: 'boolean' }).default(false).notNull(),
});
```

**Now create a `drizzle.config.ts` in the root of the project**

Paste the following code into `drizzle.config.ts`

```ts
import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';


export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect:'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;
```

Run the following command to push the changes to the database.

```bash
pnpm drizzle-kit push
```

Run the Drizzle push

```bash
pnpm drizzle-kit studio
```

**Run the development server:**

```bash
pnpm dev
```
