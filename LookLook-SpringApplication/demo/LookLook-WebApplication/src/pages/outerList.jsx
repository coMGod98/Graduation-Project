
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import { Pagination } from "../components/pagination";

function OuterList() {
  const {cate} = useParams();

  const [prods, setProds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const prodsPerPage = 12;

  useEffect(() => {
    fetch(`/category/${cate}`, {
        // headers: {
        //     'Content-Type': 'multipart/form-data',
        // }
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
  const currentProds = prods.slice(firstProdIndex, lastProdIndex);
  //   const currentProds = [];

  return (
      <>
        <Header />
        <div className={styles.productShowSection}>
          <div className={styles.categoryHeader}><h1>아우터</h1></div>
          <div className={styles.categoryWrap}>
            {cate === "301"
                ? <Link to="/outerList/301"><div style={{color:'#1d86da'}}>패딩</div></Link>
                : <Link to="/outerList/301"><div>패딩</div></Link>
            }
            {cate === "302"
                ? <Link to="/outerList/302"><div style={{color:'#1d86da'}}>가디건</div></Link>
                : <Link to="/outerList/302"><div>가디건</div></Link>
            }
            {cate === "303"
                ? <Link to="/outerList/303"><div style={{color:'#1d86da'}}>집업</div></Link>
                : <Link to="/outerList/303"><div>집업</div></Link>
            }
            {cate === "304"
                ? <Link to="/outerList/304"><div style={{color:'#1d86da'}}>코트</div></Link>
                : <Link to="/outerList/304"><div>코트</div></Link>
            }
            {cate === "305"
                ? <Link to="/outerList/305"><div style={{color:'#1d86da'}}>파카</div></Link>
                : <Link to="/outerList/305"><div>파카</div></Link>
            }
            {cate === "306"
                ? <Link to="/outerList/306"><div style={{color:'#1d86da', borderRight:'0'}}>자켓</div></Link>
                : <Link to="/outerList/306"><div style={{borderRight:'0'}}>자켓</div></Link>
            }

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