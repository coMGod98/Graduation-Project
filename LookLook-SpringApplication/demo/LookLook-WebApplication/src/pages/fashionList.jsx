
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import { Pagination } from "../components/pagination";

function FashionList() {
  const {cate} = useParams();

  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const prodsPerPage = 12;

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    fetch(`/category/${cate}`, {
      'Authorization': `Bearer ${accessToken}`,
    })
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
          <div className={styles.categoryHeader}><h1>패션소품</h1></div>
          <div className={styles.categoryWrap}>
            {cate === "501"
                ? <Link to="/fashionList/501"><div style={{color:'#1d86da'}}>가방</div></Link>
                : <Link to="/fashionList/501"><div>가방</div></Link>
            }
            {cate === "502"
                ? <Link to="/fashionList/502"><div style={{color:'#1d86da'}}>시계</div></Link>
                : <Link to="/fashionList/502"><div>시계</div></Link>
            }
            {cate === "503"
                ? <Link to="/fashionList/503"><div style={{color:'#1d86da', width: '150px'}}>선글라스/안경</div></Link>
                : <Link to="/fashionList/503"><div style={{width: '150px'}}>선글라스/안경</div></Link>
            }
            {cate === "504"
                ? <Link to="/fashionList/504"><div style={{color:'#1d86da'}}>벨트</div></Link>
                : <Link to="/fashionList/504"><div>벨트</div></Link>
            }
            {cate === "505"
                ? <Link to="/fashionList/505"><div style={{color:'#1d86da', borderRight:'0'}}>쥬얼리</div></Link>
                : <Link to="/fashionList/505"><div style={{borderRight:'0'}}>쥬얼리</div></Link>
            }

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