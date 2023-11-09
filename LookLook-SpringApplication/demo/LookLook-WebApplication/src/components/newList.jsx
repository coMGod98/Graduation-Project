import React, {useEffect, useState} from "react";
import styles from "./list.module.css";
import { Link } from "react-router-dom";

function NewList() {

    const [newItemList, setNewItemList] = useState([]);

    useEffect(() => {
        fetch('/new-products')
            .then(res => res.json())
            .then(res => {
                if (res.status === 500) {
                    console.log("신상품 실패:", res);
                    setNewItemList([]);
                } else {
                    console.log("신상품:", res);
                    setNewItemList(res);
                }
            })
            .catch(err => {
                console.log("오류:", err);
                setNewItemList([]);
            })
    }, [])

  return (
      <div className={styles.productContainer}>


        {newItemList.length > 0 ?
            newItemList && newItemList.map((item, id) => {
              return (
                  <div key={id} className={styles.productWrap}>

                    <Link to={`/Product/${item.pid}`}>
                      <div className={styles.productImgDiv}>
                        <div className={styles.productImgWrap}>
                          <img src={item.mainImgUrl} alt="prod_img"/>
                        </div>
                      </div>
                      <h2 className={styles.productTitle}>{item.itemName}</h2>
                    </Link>
                    <div className={styles.productPrice}>{Number(item.price).toLocaleString()}원</div>

                  </div>
              );
            })
            : <div className={styles.noResult}>신상품이 존재하지 않습니다.</div>
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