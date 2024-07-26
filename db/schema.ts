import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todo = sqliteTable('todo', {
  id: integer('id').primaryKey(),
  title: text('text').notNull(),
  completed: integer('done', { mode: 'boolean' }).default(false).notNull(),
});