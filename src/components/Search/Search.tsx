import React from "react";

interface SearchProps {
  children?: React.ReactNode;
  value: string;
  onChange: () => void;
  placeholder?: string;
}

const Search = (props: SearchProps): JSX.Element => {
  const {
    children,
    value = "",
    onChange,
    placeholder = "start search...",
  } = props;
  return (
    <div>
      {children ? children : "Search:"}
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Search;
