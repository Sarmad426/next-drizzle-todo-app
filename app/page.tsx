import { createTodo } from "@/actions/TodoActions";
import AddTodo from "@/components/AddTodo";
import { TodoList } from "@/components/TodoList";
import { db } from "@/db/drizzle";
import { todo } from "@/db/schema";
import { ToastContainer } from "react-toastify";

export default async function Home() {
  // Querying todos
  const todos = await db.select().from(todo);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold my-2 text-center">Todo List</h1>
          <p className="text-gray-400">Make yourself productive</p>
        </div>
        <TodoList todos={todos} />
        <AddTodo onAdd={createTodo} />
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </main>
  );
}
