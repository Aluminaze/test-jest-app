import React, { ChangeEvent, useState } from "react";
import classes from "./styles.module.css";
import * as hooks from "hooks";
import { TodoItem } from "types";

const TodoPage = () => {
  const { data: todoData = [], isLoading } = hooks.useFetchTodos();
  const createTodoM = hooks.useCreateTodo();
  const deleteTodoM = hooks.useDeleteTodo();
  const [newTitle, setNewTitle] = useState<string>("");
  const [newText, setNewText] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleCreateTodo = async (e: any) => {
    e.preventDefault();

    try {
      setIsFetching(true);
      await createTodoM.mutateAsync({
        id: String(Number(new Date())),
        title: newTitle,
        text: newText,
      });
    } finally {
      setIsFetching(false);
      setNewTitle("");
      setNewText("");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    console.log("~ id", id);
    await deleteTodoM.mutateAsync(id);
  };

  if (isLoading) {
    return <h1>Loading data...</h1>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <form className={classes.form} onSubmit={handleCreateTodo}>
          <fieldset className={classes.fieldset} disabled={isFetching}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={newTitle}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewTitle(e.target.value)
              }
            />
            <label htmlFor="text">Text:</label>
            <input
              type="text"
              title="text"
              value={newText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewText(e.target.value)
              }
            />
            <input type="submit" value="Create todo" />
          </fieldset>
        </form>
        <h1>TODO LIST</h1>

        {Boolean(todoData.length) && (
          <ul className={classes.list}>
            {todoData.map((todo: TodoItem) => (
              <li className={classes.listItem} key={todo.id}>
                <div className={classes.listItemContent}>
                  <h2>{todo.title}</h2>
                  <span>{todo.text}</span>
                </div>
                <div className={classes.listItemBtn}>
                  <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoPage;
