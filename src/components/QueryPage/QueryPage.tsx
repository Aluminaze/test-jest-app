import React, { ChangeEvent, useState } from "react";
import {
  useAddProductMutation,
  useGetGoodsQuery,
  useDeleteProductMutation,
} from "redux-app";
import classes from "./styles.module.css";

const QueryPage = () => {
  const [productName, setProductName] = useState("");
  const { data: goods = [], isLoading: isGoodsLoading } = useGetGoodsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  if (isGoodsLoading) return <h2>Data is loading...</h2>;

  const handleAddProduct = async () => {
    if (productName) {
      await addProduct({ name: productName }).unwrap();
      setProductName("");
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (id) {
      await deleteProduct(id);
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
      {Boolean(goods.length) && (
        <ul className={classes.list}>
          {goods.map((item: any) => (
            <li onClick={() => handleDeleteProduct(item.id)} key={item.name}>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QueryPage;
