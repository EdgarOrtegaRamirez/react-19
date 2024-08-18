import { useActionState, useOptimistic } from "react";

interface Todo {
  name: string;
  done: boolean;
  saved: boolean;
}
interface State {
  todos: Todo[];
}

export const Form = () => {
  const [todos, formAction, isPending] = useActionState<State, FormData>(
    async (prevState, formData) => {
      const newTodo = {
        name: formData.get("name")?.toString() || "",
        done: false,
        saved: false,
      };
      addOptimisticTodos(newTodo);

      console.log({ formData, prevState });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return {
        todos: [...prevState.todos, newTodo],
      };
    },
    { todos: [] },
  );

  const [optimisticTodos, addOptimisticTodos] = useOptimistic<State, Todo>(
    todos,
    (state, newTodo) => {
      return { todos: [...state.todos, newTodo] };
    },
  );
  console.log({ todos, optimisticTodos });

  return (
    <>
      <form action={formAction}>
        <input type="text" name="name" placeholder="ToDo" />
        <button type="submit" disabled={isPending}>
          {isPending ? "Adding..." : "Add ToDo"}
        </button>
      </form>
      {optimisticTodos.todos.map((todo, index) => (
        <div key={index}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() => {
              alert("not implemented");
            }}
          />
          <span style={{ textDecoration: todo.done ? "line-through" : "" }}>
            {todo.name}
          </span>
        </div>
      ))}
    </>
  );
};
