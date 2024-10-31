import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [List, SetList] = useState([]);
  const [Pages, Setpages] = useState(1);
  useEffect(() => {
    GetData();
  }, [Pages]);

  const HandClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.innerText);
    Setpages(parseInt(e.target.innerText));
  };
  const HandPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (Pages > 1) {
      Setpages((oPage) => {
        return oPage - 1;
      });
    }
  };
  const HandNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (Pages < 10) {
      Setpages((oPage) => {
        return oPage + 1;
      });
    }
  };

  const GetData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${10}&skip=${(Pages - 1) * 10}`
    );
    const data = await res.json();
    SetList(data);
  };
  if (List) {
    console.log(List);
    // let n = Math.ceil(List.total / 10);

    // console.log([...Array(n)]);
  }
  // .slice(Pages * 10, (Pages + 1) * 10)?
  // .slice((Pages - 1) * 10, Pages * 10)?
  return (
    <div className="app-p">
      <div className="App">
        {List?.products?.length > 0 &&
          List?.products?.map((e) => {
            return (
              <span className="product-box">
                <img src={e.images} alt="" />
                <b>{e.title}</b>
              </span>
            );
          })}
      </div>
      <div className="page">
        <span
          onClick={(e) => {
            HandPrev(e);
          }}
          className="box"
        >
          ◀
        </span>
        {List?.products?.length > 0 &&
          [...Array(Math?.ceil(List?.total / 20))]?.map((_, i) => {
            return (
              <span
                className={Pages - 1 == i ? "box high" : "box"}
                onClick={(e) => {
                  HandClicked(e);
                }}
              >
                {i + 1}
              </span>
            );
          })}
        <span
          onClick={(e) => {
            HandNext(e);
          }}
          className="box"
        >
          ▶
        </span>
      </div>
    </div>
  );
}
