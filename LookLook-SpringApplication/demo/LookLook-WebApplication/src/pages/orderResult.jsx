import React from "react";
import Header from "../components/header";
import styles from "./orderResult.module.css";
import { Link } from "react-router-dom";

function OrderResult() {
  return (
    <>
      <Header />
      <div className={styles.orderResultSection}>
        <div className={styles.orderResultWrap}>
          <div className={styles.orderWrap}>
            <div className={styles.orderDiv}>장바구니</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문서 작성</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div style={{backgroundColor: 'rgb(184, 223, 255)'}} 
            className={styles.orderDiv}>주문 완료</div>
          </div>


          <div className={styles.resultHeaderWrap}>
            <img src={require("../images/check.png")} alt="check"/>
            <div>
              <h1>고객님의 주문이 완료되었습니다.</h1>
              <p>주문번호: ~~~</p>
              <p>주문일자: ~~~</p>
            </div>
          </div>


          <div className={styles.payInfoHeader}>주문 정보</div>
          <div  style={{borderTop:'1px solid rgb(197, 197, 197)'}}
            className={styles.wrapDiv}>
            <div className={styles.tagDiv}>주문자명 / 연락처</div>
            <div className={styles.infoDiv}>홍길동 / 01012345678</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>최종 결제 금액</div>
            <div className={styles.infoDiv}>#,###원</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>결제수단</div>
            <div className={styles.infoDiv}>신한카드 / 일시불</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>배송 주소</div>
            <div className={styles.infoDiv}>(12345) 서울시 ~~~ a동</div>
          </div>


          

          <div className={styles.shopBtnWrap}>
            <Link to="/">
              <button>홈으로</button>
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
export default OrderResult;