import React from "react";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Landing page!</h1>
      <div className={classes.block}>Block</div>
      <div className={classes.block}>Block</div>
      <div className={classes.block}>Block</div>
      <div className={classes.block}>Block</div>
    </div>
  );
};

export default LandingPage;
