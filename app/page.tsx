import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";
import { drizzle } from "drizzle-orm/libsql";

export default async function Home() {

  const todos = await db.select().from(todo)

  console.log('Todos',todos)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Todo List app built with Next.js and Drizzle ORM.
    </main>
  );
}
