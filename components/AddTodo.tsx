"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

interface AddTodoProps {
  onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onAdd(title);
      router.refresh();
      setTitle("");
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <form
      className="w-full flex items-center justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        className="outline outline-2 rounded-md my-4 p-2 w-5/6 focus:outline-teal-400 focus:shadow-sm focus:shadow-teal-400 bg-transparent"
      />
      <button
        type="submit"
        className="text-sm bg-teal-600 text-white rounded-md p-2 hover:bg-teal-500 transition-colors duration-700 cursor-pointer ease-linear"
      >
        Submit
      </button>
    </form>
  );
};

export default AddTodo;
