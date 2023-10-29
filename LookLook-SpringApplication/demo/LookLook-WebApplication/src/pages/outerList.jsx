
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function OuterList() {
  const {cate} = useParams();

  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const prodsPerPage = 12;

  useEffect(() => {
    setProds(Products);
  }, []);

  const firstProdIndex = (currentPage - 1) * prodsPerPage;
  const lastProdIndex = firstProdIndex + prodsPerPage;
  const currentProds = prods.slice(firstProdIndex, lastProdIndex);

  return (
    <>
      <Header />
      <div className={styles.productShowSection}>
        <div className={styles.categoryHeader}><h>아우터</h></div>
        <div className={styles.categoryWrap}>
          <Link to="/outerList/outer_padding"><div>패딩</div></Link>
          <Link to="/outerList/outer_cardigan"><div>가디건</div></Link>
          <Link to="/outerList/outer_zipup"><div>집업</div></Link>
          <Link to="/outerList/outer_coat"><div>코트</div></Link>
          <Link to="/outerList/outer_parka"><div>파카</div></Link>
          <Link to="/outerList/outer_jacket"><div style={{borderRight:'0'}}>자켓</div></Link>
        </div>

        <ItemList list={currentProds}/>
        
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
export default OuterList;