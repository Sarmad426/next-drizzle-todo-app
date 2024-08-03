"use client";

import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";

interface AddTodoProps {
  onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [pending, startTransition] = useTransition();

  const router = useRouter();

  const newTodoAction = (e: FormData) => {
    startTransition(async () => {
      const title = e.get("title")?.valueOf();
      if (typeof title !== "string" || title.length === 0) {
        setError("Todo must not be empty");
        throw new Error("Invalid Title");
      }
      try {
        await onAdd(title);
        router.refresh();
        setTitle("");
      } catch (err) {
        console.log("Error", err);
      }
    });
  };

  return (
    <form
      className="w-full flex items-center justify-center gap-4 relative"
      action={newTodoAction}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        name="title"
        placeholder="Add a new todo"
        className="outline outline-2 rounded-md my-4 p-2 w-5/6 focus:outline-teal-400 focus:shadow-sm focus:shadow-teal-400 bg-transparent"
      />
      <button
        type="submit"
        className="text-sm bg-teal-700 text-white rounded-md p-2 hover:bg-teal-600 transition-colors duration-700 cursor-pointer ease-linear disabled:cursor-not-allowed disabled:opacity-50"
        disabled={pending || title.length === 0}
      >
        Submit
      </button>
      <span className="absolute text-xs text-red-400 bottom-[-15px] left-0 p-1 rounded-md">
        {error}
      </span>
    </form>
  );
};

export default AddTodo;
