import React, {useEffect, useState} from "react";
import styles from "./list.module.css";
import { Link } from "react-router-dom";

function RecList() {

    const [recItemList, setRecItemList] = useState([]);

    useEffect(() => {
        fetch('/recommended-products')
            .then(res => res.json())
            .then(res => {
                if (res.status === 500) {
                    console.log("추천상품 실패:", res);
                    setRecItemList([]);
                } else {
                    console.log("추천상품:", res);
                    setRecItemList(res);
                }
            })
            .catch(err => {
                console.log("오류:", err);
                setRecItemList([]);
            })
    }, [])

    return (
        <div className={styles.productContainer}>

            {recItemList.length > 0 ?
                recItemList && recItemList.map((item, id) => {
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
                : <div className={styles.noResult}>추천상품이 존재하지 않습니다.</div>
            }


            {/* <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="hot1"
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="hot2"
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="hot3"
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div>
      <div className={styles.productWrap}>
        <div className={styles.productImgDiv}>
          <img src={require("../images/sample.png")} alt="hot4"
          className={styles.productImg}/>
        </div>
        <h2 className={styles.productTitle}> 인기 상품</h2>
        <div className={styles.productPrice}> 15,000원</div>
      </div> */}


        </div>
    )
}
export default RecList;