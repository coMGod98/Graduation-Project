

import styles from "./list.module.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import products from "../products.json"

function ItemList({ list }) {

  const [prods, setProds] = useState(products);

  return (
      <div className={styles.productContainer}>
        {list.length > 0 ?
            list && list.map((item, id) => {
              return (
                  <div key={id} className={styles.productWrap}>

                    <Link to={`/Product/${item.pid}`}>
                      <div className={styles.productImgDiv}>
                        <div className={styles.productImgWrap}>
                          <img src={item.mainImgUrl} alt="prod_img"/>
                        </div>
                      </div>
                      <h2 className={styles.productTitle}>{item.itemName}</h2>
                    </Link>
                    <div className={styles.productPrice}>{Number(item.price).toLocaleString()}원</div>

                  </div>
              );
            })
            : <div className={styles.noResult}>조건에 맞는 결과가 없습니다.</div>
        }
      </div>
  );
}
export default ItemList;