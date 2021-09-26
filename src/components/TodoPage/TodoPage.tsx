import React, { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import classes from "./styles.module.css";
import api from "api";

export interface TodoItem {
  id: string;
  title: string;
  text: string;
}

const TodoPage = () => {
  const { data: todoData = [], isLoading } = useQuery("todos", api.fetchTodos);
  const { mutate } = useMutation((newTodo: TodoItem) => {
    return api.fetchAddTodo(newTodo);
  });
  const [newTitle, setNewTitle] = useState<string>("");
  const [newText, setNewText] = useState<string>("");

  const handleCreateTodo = () => {
    mutate({ id: String(Number(new Date())), title: newTitle, text: newText });
    setNewTitle("");
    setNewText("");
  };

  if (isLoading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>TODO LIST</h1>

        {Boolean(todoData.length) && (
          <ul className={classes.list}>
            {todoData.map((todo: TodoItem) => (
              <li className={classes.listItem} key={todo.id}>
                <h2>{todo.title}</h2>
                <span>{todo.text}</span>
              </li>
            ))}
          </ul>
        )}

        <div className={classes.addTodo}>
          <label>Title:</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
          />
          <label>Text:</label>
          <input
            type="text"
            value={newText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewText(e.target.value)
            }
          />
          <button onClick={handleCreateTodo}>Create Todo</button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
