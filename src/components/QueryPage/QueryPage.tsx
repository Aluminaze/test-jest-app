import React from "react";
import { useGetGoodsQuery } from "redux-app";

const QueryPage = () => {
  const { data: goods = [], isLoading: isGoodsLoading } = useGetGoodsQuery();

  if (isGoodsLoading) return <h2>Data is loading...</h2>;

  return (
    <div>
      <h1>Query Page</h1>
      <ul>
        {goods.map((item: any) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueryPage;
