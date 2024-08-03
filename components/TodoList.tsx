"use client";

import React from "react";
import { Trash } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { deleteTodo, toggleTodo } from "@/actions/TodoActions";
import { useRouter } from "next/navigation";
import { Todo } from "@/types";

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      router.refresh();
    } catch (err) {
      console.log("Error", err);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      await toggleTodo(id, completed);
      router.refresh();
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {todos?.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        ))}
      </AnimatePresence>

      {todos?.length > 0 && <hr className="mt-4" />}
    </div>
  );
};

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  return (
    <motion.div
      className="border flex items-center justify-between w-full p-2 mt-2 rounded-md"
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 50,
      }}
      transition={{
        duration: 0.7,
        ease: easeInOut,
      }}
    >
      <div className="ml-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          id={todo.id.toString()}
          className="bg-white text-white"
        />
        <label
          className={`ml-4 ${
            todo.completed && "text-gray-300 dark:text-gray-400"
          } `}
          htmlFor={todo.id.toString()}
        >
          {todo.title}
        </label>
      </div>
      <button
        title="Delete todo"
        onClick={() => onDelete(todo.id)}
        className="bg-red-500 text-white rounded-md px-2 py-1 hover:bg-red-400 transition-colors duration-700 cursor-pointer ease-linear"
      >
        <Trash className="w-5" />
      </button>
    </motion.div>
  );
};
