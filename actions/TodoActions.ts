'use server'

import { todo } from '@/db/schema';
import {db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';

interface Todo {
  id?: number;
  title: string;
  completed?: boolean;
}

// Create a new todo
export const createTodo = async (newTodo: Todo): Promise<number> => {
  const result : Todo = await db.insert(todo).values({
    title: newTodo.title,
    completed: newTodo.completed ?? false
  }).returning('id');

  return result[0]?.id;
};

// Get all todos
export const getAllTodos = async (): Promise<Todo[]> => {
  const result = await db.select().from(todo).all();
  return result;
};

// Get a todo by id
export const getTodoById = async (id: number): Promise<Todo | undefined> => {
  const result = await db.select().from(todo).where(eq(todo.id, id)).all();
  return result[0];
};

// Update a todo
export const updateTodo = async (id: number, updatedTodo: Partial<Todo>): Promise<void> => {
  await db.update(todo)
    .set(updatedTodo)
    .where(eq(todo.id, id))
    .execute();
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<void> => {
  await db.delete(todo)
    .where(eq(todo.id, id))
    .execute();
};
