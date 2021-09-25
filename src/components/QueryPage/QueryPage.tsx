import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAddProductMutation, useGetGoodsQuery } from "redux-app";

const QueryPage = () => {
  const [productName, setProductName] = useState("");
  const { data: goods = [], isLoading: isGoodsLoading } = useGetGoodsQuery();
  const [addProduct, { isError }] = useAddProductMutation();

  if (isGoodsLoading) return <h2>Data is loading...</h2>;

  const handleAddProduct = async () => {
    if (productName) {
      await addProduct({ name: productName }).unwrap();
      setProductName("");
    }
  };

  return (
    <div>
      <h1>Query Page</h1>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setProductName(e.target.value)
        }
        value={productName}
      />
      <button
        onClick={handleAddProduct}
        disabled={productName.length ? false : true}
      >
        Add product
      </button>
      <ul>
        {goods.map((item: any) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueryPage;
