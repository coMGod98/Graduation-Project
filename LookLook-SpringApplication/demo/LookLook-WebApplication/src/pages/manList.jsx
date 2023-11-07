
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import Products from "../products.json"
import { Pagination } from "../components/pagination";

function ManList() {
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
          <div className={styles.categoryHeader}><h1>남성</h1></div>
          <div className={styles.categoryWrap}>
            {cate === "201"
                ? <Link to="/manList/201"><div style={{color:'#1d86da'}}>셔츠</div></Link>
                : <Link to="/manList/201"><div>셔츠</div></Link>
            }
            {cate === "202"
                ? <Link to="/manList/202"><div style={{color:'#1d86da'}}>니트</div></Link>
                : <Link to="/manList/202"><div>니트</div></Link>
            }
            {cate === "203"
                ? <Link to="/manList/203"><div style={{color:'#1d86da'}}>티셔츠</div></Link>
                : <Link to="/manList/203"><div>티셔츠</div></Link>
            }
            {cate === "204"
                ? <Link to="/manList/204"><div style={{color:'#1d86da'}}>정장</div></Link>
                : <Link to="/manList/204"><div>정장</div></Link>
            }
            {cate === "205"
                ? <Link to="/manList/205"><div style={{color:'#1d86da' ,borderRight:'0'}}>팬츠</div></Link>
                : <Link to="/manList/205"><div style={{borderRight:'0'}}>팬츠</div></Link>
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
export default ManList;