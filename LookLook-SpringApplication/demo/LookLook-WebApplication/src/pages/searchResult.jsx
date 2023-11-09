
import React from "react";
import Header from "../components/header";
import styles from "./searchResult.module.css"
import { useState, useEffect } from "react";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";
import {useParams} from "react-router-dom";

function SearchResult() {

    const {keyword} = useParams();

  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const prodsPerPage = 12;

  useEffect(() => {setProds(Products);

      fetch(`/product/search/${keyword}`)
          .then(res => res.json())
          .then(res => {
              console.log("검색:", res);
              setProds(res);
          })
          .catch(err => {
              console.log("오류:", err);
          })

  }, [keyword]);

  const firstProdIndex = (currentPage - 1) * prodsPerPage;
  const lastProdIndex = firstProdIndex + prodsPerPage;
  const currentPosts = prods.slice(firstProdIndex, lastProdIndex);

  return (
      <>
        <Header />
        <div className={styles.searchResultSection}>
          <div className={styles.searchHeader}>
            <img src={require("../images/search_header.png")} alt="searchHeader"/>
            <h1>'{keyword}' 검색 결과입니다({prods.length}개)</h1></div>

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