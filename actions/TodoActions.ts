'use server'

import { todo } from '@/db/schema';
import {db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Create a new todo
export const createTodo = async (title:string): Promise<Todo> => {
  const result : Todo[] = await db.insert(todo).values({
    title
  }).returning({
    id: todo.id,
    title: todo.title,
    completed: todo.completed
  });

  return result[0];
};

// Get all todos
export const getAllTodos = async (): Promise<Todo[]> => {
  const todos = await db.select().from(todo).all();
  return todos;
};

// Get a todo by id
export const getTodoById = async (id: number): Promise<Todo | undefined> => {
  const result = await db.select().from(todo).where(eq(todo.id, id)).all();
  return result[0];
};

// Update a todo
export const toggleTodo = async (id: number,completed:boolean): Promise<void> => {
  await db.update(todo)
    .set({completed})
    .where(eq(todo.id, id))
    .execute();
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await db.delete(todo)
    .where(eq(todo.id, id))
    .execute();
};
