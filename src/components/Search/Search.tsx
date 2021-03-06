import React, { useEffect, useRef } from "react";
import cn from "classnames";
import classes from "./Search.module.css";

interface SearchProps {
  children?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Search = (props: SearchProps): JSX.Element => {
  const {
    children,
    value = "",
    onChange,
    placeholder = "start search...",
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const inputClasses = cn({
    [classes.input]: true,
    [classes.inputFilled]: Boolean(value.length),
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={classes.search}>
      {children ? children : "Search:"}
      <input
        className={inputClasses}
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Search;
