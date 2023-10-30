
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import { Pagination } from "../components/pagination";

function WomanList() {
  const {cate} = useParams();

  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const prodsPerPage = 12;

  useEffect(() => {
      fetch(`/category/${cate}`, {})
          .then(res => res.json())
          .then(res => {
            console.log("카테고리별 상품 목록: ", res);
            setProds(res);
          })
          .catch(err => console.log("오류: ", err))
  }, [cate]);

  const firstProdIndex = (currentPage - 1) * prodsPerPage;
  const lastProdIndex = firstProdIndex + prodsPerPage;
  const currentPosts = prods.slice(firstProdIndex, lastProdIndex);

  return (
    <>
      <Header />
      <div className={styles.productShowSection}>
        <div className={styles.categoryHeader}><h>여성</h></div>
        <div className={styles.categoryWrap}>
          <Link to="/womanList/101">
            <div style={{width: '150px'}}>셔츠/블라우스</div>
          </Link>
          <Link to="/womanList/102"><div>니트</div></Link>
          <Link to="/womanList/103"><div>티셔츠</div></Link>
          <Link to="/womanList/104"><div>팬츠</div></Link>
          <Link to="/womanList/105"><div>스커트</div></Link>
          <Link to="/womanList/106"><div style={{borderRight:'0'}}>원피스</div></Link>


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