import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [List, SetList] = useState([]);

  useEffect(() => {
    GetData();
  }, []);

  const GetData = async () => {
    const res = await fetch(`https://dummyjson.com/products?limit=5`);
    const data = await res.json();
    SetList(data);
  };
  if (List) {
    console.log(List);
  }

  return (
    <div className="App">
      {List?.products?.map((e) => {
        return (
          <span className="product-box">
            <img src={e.images} alt="" />
            <b>{e.title}</b>
          </span>
        );
      })}
      {}
    </div>
  );
}
