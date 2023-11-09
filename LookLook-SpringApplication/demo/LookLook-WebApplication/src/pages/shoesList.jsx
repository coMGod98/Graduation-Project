
import React, { useContext } from "react";
import Header from "../components/header";
import styles from "./categoryList.module.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import ItemList from "../components/itemList";
import { Pagination } from "../components/pagination";

function ShoesList() {
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
          <div className={styles.categoryHeader}><h1>신발</h1></div>
          <div className={styles.categoryWrap}>
            {cate === "401"
                ? <Link to="/shoesList/401"><div style={{color:'#1d86da'}}>구두</div></Link>
                : <Link to="/shoesList/401"><div>구두</div></Link>
            }
            {cate === "402"
                ? <Link to="/shoesList/402"><div style={{color:'#1d86da'}}>힐</div></Link>
                : <Link to="/shoesList/402"><div>힐</div></Link>
            }
            {cate === "403"
                ? <Link to="/shoesList/403"><div style={{color:'#1d86da'}}>플랫슈즈</div></Link>
                : <Link to="/shoesList/403"><div>플랫슈즈</div></Link>
            }
            {cate === "404"
                ? <Link to="/shoesList/404"><div style={{color:'#1d86da'}}>샌들</div></Link>
                : <Link to="/shoesList/404"><div>샌들</div></Link>
            }
            {cate === "405"
                ? <Link to="/shoesList/405"><div style={{color:'#1d86da'}}>슬리퍼</div></Link>
                : <Link to="/shoesList/405"><div>슬리퍼</div></Link>
            }
            {cate === "406"
                ? <Link to="/shoesList/406"><div style={{color:'#1d86da', borderRight:'0'}}>부츠</div></Link>
                : <Link to="/shoesList/406"><div style={{borderRight:'0'}}>부츠</div></Link>
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
export default ShoesList;