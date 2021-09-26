import React from "react";
import classes from "./styles.module.css";

const TodoPage = () => {
  return (
    <div className={classes.container}>
      <h1>TODO</h1>

      <ul className={classes.list}></ul>
    </div>
  );
};

export default TodoPage;
