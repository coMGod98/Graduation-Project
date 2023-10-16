// import React, { useState } from "react";
// import styles from "./list.module.css";
// import Products from "../products.json"
// import { Link } from "react-router-dom";

// function ItemList() {
//   const [prods, setProds] = useState([]);

//   return (
//     <div className={styles.productContainer}>

//       {Products.products.map((data, key) => {
//         return (
//           <div key={key} className={styles.productWrap}>
//             <div className={styles.productImgDiv}>
//               <img src={data.image} alt="prod_img"/>
//             </div>
//             <h2 className={styles.productTitle}>{data.name}</h2>
//             <div className={styles.productPrice}>{data.price}원</div>
//           </div>
//         );
//       })}

//     </div>
//   );
// }
// export default ItemList;

import styles from "./list.module.css";

function ItemList({ list }) {
  return (
    <div className={styles.productContainer}>
      {list && list.map(({ id, name, price, image }) => {
        return (
          <div key={id} className={styles.productWrap}>
            <div className={styles.productImgDiv}>
              <img src={image} alt="prod_img"/>
            </div>
            <h2 className={styles.productTitle}>{name}</h2>
            <div className={styles.productPrice}>{price}원</div>
          </div>
        );
      })}

    </div>
  );
}
export default ItemList;