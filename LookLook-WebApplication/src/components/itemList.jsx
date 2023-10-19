

import styles from "./list.module.css";
import { Link } from "react-router-dom";

function ItemList({ list }) {
  return (
    <div className={styles.productContainer}>
      {list.length != 0 ? 
      list && list.map(({ id, name, price, image }) => {
        return (
          <div key={id} className={styles.productWrap}>

            <Link to={`/Product/${id}`} id={id} name={name}>
              <div className={styles.productImgDiv}>
                <img src={image} alt="prod_img"/>
              </div>
              <h2 className={styles.productTitle}>{name}</h2>
            </Link>
            <div className={styles.productPrice}>{price}원</div>
            
          </div>
        );
      })
      : <div className={styles.noResult}>조건에 맞는 결과가 없습니다.</div>
      }
    </div>
  );
}
export default ItemList;