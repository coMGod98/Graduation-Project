
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function FashionList() {
  const {cate} = useParams();

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
        <div className={styles.categoryHeader}><h>패션소품</h></div>
        <div className={styles.categoryWrap}>
          <Link to="/fashionList/baga"><div>가방</div></Link>
          <Link to="/fashionList/watch"><div>시계</div></Link>
          <Link to="/fashionList/glasses"><div style={{width: '150px'}}>선글라스/안경</div></Link>
          <Link to="/fashionList/belt"><div>벨트</div></Link>
          <Link to="/fashionList/jewely"><div style={{borderRight:'0'}}>쥬얼리</div></Link>
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
export default FashionList;