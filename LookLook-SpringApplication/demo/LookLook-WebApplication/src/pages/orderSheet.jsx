import React, {useEffect, useState} from "react";
import Header from "../components/header";
import styles from "./orderSheet.module.css";
import { Link } from "react-router-dom";
import OrderProdInfoList from "../components/orderProdInfoList";

import { useDispatch, useSelector } from "react-redux";
import { addOrderItem, deleteOrderItem } from "../store/orderSlice";



function OrderSheet() {

  const dispatch = useDispatch();

  const [pAddr, setPAddr] = useState("서울");
  const [pIds, setPIds] = useState([1,3,5,7]);
  const [pMethod, setPMethod] = useState("신한카드");
  const [pType, setPType] = useState("일시불");



  const orderAddr = useSelector((state) => state.orderItem.newAddress);
  const orderIds = useSelector((state) => state.orderItem.orderItemIds);
  const orderPayMethod = useSelector((state) => state.orderItem.paymentMethod);
  const orderPayType = useSelector((state) => state.orderItem.paymentType);
  const onClickAdd = () => {
    dispatch(addOrderItem({pAddr, pIds, pMethod, pType}));
  }
  const onClickDelete = () => {
    dispatch(deleteOrderItem());
  }
  const onClickView = () => {
    console.log(orderAddr);
    console.log(orderIds);
    console.log(orderPayMethod);
    console.log(orderPayType);
  }





  const [isAddrNew, setIsAddrNew] = useState(false);

  const [orderListInfo, setOrderListInfo] = useState([]);
  const [numCount, setNumCount] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {

    // const accessToken = localStorage.getItem("accessToken");
    // fetch('/order-sheet', {
    //   method: 'post',
    //   headers: {
    //     "Content-Type": "application/json",
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    //   body: JSON.stringify({
    //     cartItemIds: orderIds,
    //   })
    // })
    //     .then(res => res.json())
    //     .then(res => {
    //       console.log("리덕스 ids", orderIds);
    //       console.log("주문상품 리스트 가져오기", res);
    //
    //
    //
    //       setOrderListInfo(res.orderiteminfo);
    //       setTotalPrice(res.totalPrice);
    //
    //       const tmp = [...numCount];
    //       let i
    //       for (i = 0; i < res.orderiteminfo.length; i++) {
    //         tmp[i] = i + 1;
    //       }
    //       setNumCount(tmp);
    //     })
    //     .catch(err => {
    //       console.log("오류: ", err);
    //     })

  }, [])

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
          <div style={{borderTop:'1px solid rgb(180, 180, 180)'}}
          className={styles.wrapDiv}>
            <div className={styles.tagDiv}>이름</div>
            <div className={styles.infoDiv}>{orderListInfo.userName}</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>휴대전화</div>
            <div className={styles.infoDiv}>~~~</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>주소</div>
            <div className={styles.infoDiv}>
              <div>
                {isAddrNew === false
                    ?
                    <div>
                      <button style={{backgroundColor:'#e7f3ff'}} onClick={() => setIsAddrNew(false)}>기본 주소</button>
                      <button onClick={() => setIsAddrNew(true)}>신규 주소</button>
                    </div>
                    :
                    <div>
                      <button onClick={() => setIsAddrNew(false)}>기본 주소</button>
                      <button style={{backgroundColor:'#e7f3ff'}} onClick={() => setIsAddrNew(true)}>신규 주소</button>
                    </div>
                }


              </div>
              {isAddrNew === false
                  ?
                  <div>
                    <div>서울시 ~~</div>
                  </div>
                  :
                  <div>
                    <input maxLength={30} style={{width:'300px', padding:'3px'}} name="newAddr"/>
                  </div>
              }

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
          <div>
            {/*{orderListInfo.map((item, id) => {*/}
            {/*  return <OrderProdInfoList key={id} list={item} num={numCount[id]} />;*/}
            {/*})}*/}
            {/*{orderListInfo.length < 1*/}
            {/*    ? <div className={styles.emptyDiv}>주문한 상품이 없습니다.</div>*/}
            {/*    : null}*/}
          </div>

          <div className={styles.orderInfoHeader}>
            결제 정보
          </div>
          <div style={{alignItems:'center', borderTop:'1px solid rgb(180, 180, 180)'}}
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
          <div style={{borderTop:'1px solid rgb(180, 180, 180)'}}
          className={styles.wrapDiv}>
            <div className={styles.tagDiv}>배송비</div>
            <div className={styles.infoDiv}>{Number(2500).toLocaleString()}원</div>
          </div>
          <div className={styles.wrapDiv}>
            <div className={styles.tagDiv}>상품 가격</div>
            <div className={styles.infoDiv}>{Number(0).toLocaleString()}원</div>
          </div>
          <div className={styles.wrapDiv}>
            <div style={{fontWeight:'bold'}} className={styles.tagDiv}>총 결제 금액</div>
            <div style={{fontWeight:'bold'}} className={styles.infoDiv}>{Number(0).toLocaleString()}원</div>
          </div>



          <div className={styles.payBtnWrap}>
            <Link to="/orderResult"><button>결제하기</button></Link>
          </div>



          <button onClick={onClickAdd}>설정</button>
          <button onClick={onClickDelete}>삭제</button>
          <button onClick={onClickView}>콘솔</button>







        </div>
      </div>
    </>
  );
}
export default OrderSheet;