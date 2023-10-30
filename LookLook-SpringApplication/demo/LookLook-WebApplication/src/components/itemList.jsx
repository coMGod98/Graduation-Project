

import styles from "./list.module.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import products from "../products.json"

function ItemList({ list }) {


  const [prods, setProds] = useState(products);


  useEffect(() => {
    console.log(list);
  }, []);

  return (
    <div className={styles.productContainer}>
      {list.length != 0 ? 
      list && list.map((item, id) => {
        return (
          <div key={id} className={styles.productWrap}>

            <Link to={`/Product/${item.pid}`}>
              <div className={styles.productImgDiv}>
                {/*<img src={image} alt="prod_img"/>*/}
              </div>
              <h2 className={styles.productTitle}>{item.itemName}</h2>
            </Link>
            <div className={styles.productPrice}>{item.price}원</div>
            
          </div>
        );
      })
      : <div className={styles.noResult}>조건에 맞는 결과가 없습니다.</div>
      }
    </div>
  );
}
export default ItemList;