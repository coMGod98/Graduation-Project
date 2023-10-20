
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function WomanList() {
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
        <div className={styles.categoryHeader}><h>여성</h></div>
        <div className={styles.categoryWrap}>
          <Link to="/womanList/woman_shirt_blouse">
            <div style={{width: '150px'}}>셔츠/블라우스</div>
          </Link>
          <Link to="/womanList/woman_knit"><div>니트</div></Link>
          <Link to="/womanList/woman_tshit"><div>티셔츠</div></Link>
          <Link to="/womanList/woman_pants"><div>팬츠</div></Link>
          <Link to="/womanList/woman_skirt"><div>스커트</div></Link>
          <Link to="/womanList/woman_onepiece"><div style={{borderRight:'0'}}>원피스</div></Link>
          
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
export default WomanList;