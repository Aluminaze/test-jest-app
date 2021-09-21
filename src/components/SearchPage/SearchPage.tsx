import React, { useState, useEffect } from "react";
import List from "components/List";
import Search from "components/Search";
import { listData } from "TestData/ListData";

const SearchPage = () => {
  const [data, setData] = useState<string[]>(listData);
  const [value, setValue] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  useEffect(() => {
    if (value) {
      setData(
        listData.filter((elem: string) =>
          elem.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setData(listData);
    }
  }, [value]);

  return (
    <div>
      <Search value={value} onChange={onChangeSearch} />
      <List items={data} />
    </div>
  );
};

export default SearchPage;
