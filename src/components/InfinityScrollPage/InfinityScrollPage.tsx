import React from "react";

import { useStyles } from "./styles";

export const InfinityScrollPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Infinity Scroll</h1>

      <div className={classes.blockContent}></div>
    </div>
  );
};
