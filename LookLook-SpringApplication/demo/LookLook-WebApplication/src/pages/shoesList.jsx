
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function ShoesList() {
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
        <div className={styles.categoryHeader}><h>신발</h></div>
        <div className={styles.categoryWrap}>
          <Link to="/shoesList/formal_shoes"><div>구두</div></Link>
          <Link to="/shoesList/heels"><div>힐</div></Link>
          <Link to="/shoesList/plat_shoes"><div>플랫슈즈</div></Link>
          <Link to="/shoesList/sandals"><div>샌들</div></Link>
          <Link to="/shoesList/slipper"><div>슬리퍼</div></Link>
          <Link to="/shoesList/boots"><div style={{borderRight:'0'}}>부츠</div></Link>
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
export default ShoesList;