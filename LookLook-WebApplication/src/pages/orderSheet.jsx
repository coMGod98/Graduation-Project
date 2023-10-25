import React from "react";
import Header from "../components/header";
import styles from "./orderSheet.module.css";
import { Link } from "react-router-dom";
import OrderProdInfoList from "../components/orderProdInfoList";

function OrderSheet() {
  return (
    <>
      <Header />
      <div className={styles.OrderSection}>
        <div className={styles.OrderWrap}>
          <div className={styles.OrderHeader}>주문서 작성</div>

          <div className={styles.orderWrap}>
            <div className={styles.orderDiv}>장바구니</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div style={{backgroundColor: 'rgb(184, 223, 255)'}} 
            className={styles.orderDiv}>주문서 작성</div>
            <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
            <div className={styles.orderDiv}>주문 완료</div>
          </div>

          
          <div className={styles.orderInfoHeader}>
            배송 정보
          </div>
          <div style={{borderTop:'1px solid rgb(197, 197, 197)'}}
          className={styles.wrapDiv}>
            <div className={styles.tagDiv}>이름</div>
            <div className={styles.infoDiv}>~~~</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>연락처</div>
            <div className={styles.infoDiv}>~~~</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>주소</div>
            <div className={styles.infoDiv}>
              <div>
                <button>기본 주소</button>
                <button>신규 주소</button>
              </div>
              <div>서울시 ~~</div>
              <div>a동</div>
            </div>
          </div>



          <div className={styles.orderInfoHeader}>
            상품 정보
          </div>
          <div className={styles.prodInfoTag}>
            <div className={styles.prodInfoTag1}>전체 개</div>
            <div className={styles.prodInfoTag2}>상품명(옵션)</div>
            <div className={styles.prodInfoTag3}>수량</div>
            <div className={styles.prodInfoTag4}>판매가</div>
          </div>
          <OrderProdInfoList />
          <OrderProdInfoList />



          <div className={styles.orderInfoHeader}>
            결제 정보
          </div>
          <div style={{alignItems:'center', borderTop:'1px solid rgb(197, 197, 197)'}}
          className={styles.wrapDiv}>
            <div className={styles.tagDiv}>결제 수단</div>
            <div className={styles.infoDiv}>
              <div>
                <select>
                  <option value="0">신한카드</option>
                  <option value="1">우리카드</option>
                </select>
                <select>
                  <option value="0">일시불</option>
                  <option value="1">6개월</option>
                  <option value="2">1년</option>
                </select>
              </div>
            </div>
          </div>



          <div className={styles.orderInfoHeader}>
            결제 금액
          </div>
          <div style={{borderTop:'1px solid rgb(197, 197, 197)'}}
          className={styles.wrapDiv}>
            <div className={styles.tagDiv}>배송비</div>
            <div className={styles.infoDiv}>#,###원</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>상품 가격</div>
            <div className={styles.infoDiv}>#,###원</div>
          </div>
          <div className={styles.wrapDiv}>
            <div style={{fontWeight:'bold'}} className={styles.tagDiv}>총 결제 금액</div>
            <div style={{fontWeight:'bold'}} className={styles.infoDiv}>#,###원</div>
          </div>



          <div className={styles.payBtnWrap}>
            <Link to="/orderResult"><button>결제하기</button></Link>
            
          </div>







        </div>
      </div>
    </>
  );
}
export default OrderSheet;