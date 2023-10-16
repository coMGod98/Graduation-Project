// import React from "react";
// import Header from "../components/header";
// import styles from "./productShow.module.css"
// import { useState } from "react";
// import ItemList from "../components/itemList";

// function ProductShow() {
//   return (
//     <>
//       <Header />
//       <div className={styles.productShowSection}>
//         <div className={styles.categoryHeader}><h>아우터</h></div>
//         <div className={styles.categoryWrap}>
//           <div>패딩</div><div>가디건</div><div>집업</div>
//           <div>코트</div><div>파카</div><div style={{borderRight:'0'}}>자켓</div>
//         </div>
//         <ItemList />
//       </div>
//     </>
//   )
// }
// export default ProductShow;

import React from "react";
import Header from "../components/header";
import styles from "./productShow.module.css"
import { useState, useEffect } from "react";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function ProductShow() {
  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const prodsPerPage = 12;

  useEffect(() => {setProds(Products);
  }, []);

  const firstProdIndex = (currentPage - 1) * prodsPerPage;
  const lastProdIndex = firstProdIndex + prodsPerPage;
  const currentPosts = prods.slice(firstProdIndex, lastProdIndex);

  return (
    <>
      <Header />
      <div className={styles.productShowSection}>
        <div className={styles.categoryHeader}><h>아우터</h></div>
        <div className={styles.categoryWrap}>
          <div>패딩</div><div>가디건</div><div>집업</div>
          <div>코트</div><div>파카</div><div style={{borderRight:'0'}}>자켓</div>
        </div>

        <ItemList list={currentPosts}/>
        
        <Pagination
          prodsNum={prods.length}
          prodsPerPage={prodsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  )
}
export default ProductShow;