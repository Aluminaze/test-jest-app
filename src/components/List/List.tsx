import React from "react";
import classes from "./List.module.css";

interface ListProps {
  items: string[];
}

const List = (props: ListProps) => {
  const { items = [] } = props;

  if (items.length) {
    return (
      <ul className={classes.list}>
        {items.map((item: string) => (
          <li className={classes.listItem} key={item}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return null;
};

export default List;
