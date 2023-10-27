
import React from "react";
import Header from "../components/header";
import styles from "./searchResult.module.css"
import { useState, useEffect } from "react";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function SearchResult() {
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
      <div className={styles.searchResultSection}>
        <div className={styles.searchHeader}>
          <img src={require("../images/search_header.png")} alt="searchHeader"/>
          <h> 검색 결과입니다()</h></div>

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
export default SearchResult;