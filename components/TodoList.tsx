import React, { useEffect, useState } from "react";
// import { fetchTodos, deleteTodo, updateTodo } from "../actions/TodoActions";
import { Trash } from "lucide-react";
import { todo } from "@/db/schema";
import { motion, AnimatePresence, easeInOut } from "framer-motion";

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<(typeof todo)[]>();

  //   useEffect(() => {
  //     const getTodos = async () => {
  //       const todos = await fetchTodos();
  //       setTodos(todos);
  //     };
  //     getTodos();
  //   }, []);

  //   const handleDelete = async (id: string) => {
  //     await deleteTodo(id);
  //     setTodos(todos?.filter((todo) => todo._id !== id));
  //   };

  //   const handleToggle = async (id: string, completed: boolean) => {
  //     const updatedTodo = await updateTodo(id, completed);
  //     setTodos(todos?.map((todo) => (todo._id === id ? updatedTodo : todo)));
  //   };

  return (
    <div>
      <AnimatePresence>
        {todos?.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            // onDelete={handleDelete}
            // onToggle={handleToggle}
          />
        ))}
      </AnimatePresence>
      {/* @ts-ignore */}
      {todos?.length > 0 && <hr className="mt-4" />}
    </div>
  );
};

interface TodoItemProps {
  todo: typeof todo;
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
          //   @ts-ignore
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          id={todo.id}
          className="bg-white text-white"
        />
        <label
          className={`ml-4 ${
            todo.completed && "text-gray-300 dark:text-gray-400"
          } `}
          htmlFor={todo.id}
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
