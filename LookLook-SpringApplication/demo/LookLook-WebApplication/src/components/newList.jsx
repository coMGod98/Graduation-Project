import React from "react";
import styles from "./list.module.css";
import { Link } from "react-router-dom";

function NewList({list}) {
  return (
    <div className={styles.productContainer}>


      {list.length != 0 ? 
      list && list.map(({ id, name, price, image }) => {
        return (
          <div key={id} className={styles.productWrap}>

            <Link to={`/Product/${id}`}>
              <div className={styles.productImgDiv}>
                <div className={styles.productImgWrap}>
                  <img src={image} alt="prod_img"/>
                </div>
              </div>
              <h2 className={styles.productTitle}>{name}</h2>
            </Link>
            <div className={styles.productPrice}>{Number(price).toLocaleString()}원</div>
            
          </div>
        );
      })
      : <div className={styles.noResult}>조건에 맞는 결과가 없습니다.</div>
      }

      {/* <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new1" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new2" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new3" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="new4" 
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div> */}
      

    </div>
  )
}
export default NewList;