import React from "react";
import { useQuery } from "react-query";
import classes from "./styles.module.css";
import api from "api";

interface TodoItem {
  id: number;
  title: string;
  text: string;
}

const TodoPage = () => {
  const { data: todoData = [], isLoading } = useQuery("todos", api.fetchTodos);

  if (isLoading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1>TODO LIST</h1>

        <div>
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
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
