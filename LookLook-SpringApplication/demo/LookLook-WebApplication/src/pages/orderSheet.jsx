import React, {useEffect, useState} from "react";
import Header from "../components/header";
import styles from "./orderSheet.module.css";
import { Link } from "react-router-dom";
import OrderProdInfoList from "../components/orderProdInfoList";

import { useDispatch, useSelector } from "react-redux";
import { setNewAddress, setItemIds, setPaymentMethod, setPaymentType, deleteOrderItem } from "../store/orderSlice";
import { setOrderInfo } from "../store/orderInfoSlice";
import {useNavigate} from "react-router-dom";
import {Redirect} from "react-router-dom";


function OrderSheet() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //orderInfoSlice 스토어
  const orderOAddress = useSelector((state) => state.orderInfoItem.oAddress);
  const orderItemInfo = useSelector((state) => state.orderInfoItem.orderiteminfo);

  //orderSlice 스토어
  const orderAddr = useSelector((state) => state.orderItem.newAddress);
  const orderIds = useSelector((state) => state.orderItem.orderItemIds);
  const orderPayMethod = useSelector((state) => state.orderItem.paymentMethod);
  const orderPayType = useSelector((state) => state.orderItem.paymentType);

  const [methodState, setMethodState] = useState("카드 선택");
  const [typeState, setTypeState] = useState("할부 선택");

  const onClickView = () => {
    console.log("세션스토리지(oiteminfo는없음):", oaddress, oprice, onumber, ofee, ototalprice, ousername);
    console.log("스토어 iteminfo: ", orderItemInfo);
    console.log("신규주소:", orderAddr);
    console.log("주문 상품IDs:", orderIds);
    console.log("결제 방식(카드) 스토어:", orderPayMethod);
    console.log("결제 방식(할부) 스토어:", orderPayType);

    console.log("결제 방식(카드) state:", methodState);
    console.log("결제 방식(할부) state:", typeState);
  }





  const [isAddrNew, setIsAddrNew] = useState(false);

  const [orderListInfo, setOrderListInfo] = useState([]);
  const [numCount, setNumCount] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);



  const oaddress = sessionStorage.getItem("oaddress");
  const oprice = sessionStorage.getItem("oprice");
  const onumber = sessionStorage.getItem("onumber");
  const ofee = sessionStorage.getItem("ofee");
  const ototalprice = sessionStorage.getItem("ototalprice");
  const ousername = sessionStorage.getItem("ousername");


  useEffect(() => {

    setOrderListInfo(orderItemInfo);

    const tmp = [...numCount];
    let i
    for (i = 0; i < orderItemInfo.length; i++) {
      tmp[i] = i + 1;
    }
    setNumCount(tmp);

    // const accessToken = sessionStorage.getItem("accessToken");
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

  const pmethodChangeHandler = e => {
    // setPMethod(e.target.value)
    // dispatch(setPaymentMethod(pMethod));
    dispatch(setPaymentMethod(e.target.value));
    setMethodState(e.target.value);
  }
  const ptypeChangeHandler = e => {
    dispatch(setPaymentType(e.target.value));
    setTypeState(e.target.value);
  }



  const payClickHandler = () => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (methodState === "카드 선택" || typeState === "할부 선택") {
      alert("결제 수단을 선택해주세요!");
    } else {


      if (isAddrNew === false) {
        //기존 주소로 주문
        fetch('/order', {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            orderItemIds: JSON.parse(localStorage.getItem("orderItemIds")),
            paymentMethod: methodState,
            paymentType: typeState,
          })
        })
            .then(res => res.json())
            .then(res => {
              console.log("주문 성공(기존 주소)", res);


              return fetch(`/order-success/${res}`, {
                headers: {
                  "Content-Type": "application/json",
                }
              })
                  .then(res => res.json())
                  .then(res => {
                    console.log("return:", res);
                    sessionStorage.setItem("resultIds", res.order.id);
                    sessionStorage.setItem("resultDate", (res.order.orderDate).substr(0, 10));
                    sessionStorage.setItem("resultUserName", ousername);
                    sessionStorage.setItem("resultNumber", onumber); //
                    sessionStorage.setItem("resultTotalPrice", res.order.totalPrice);
                    sessionStorage.setItem("resultMethod", res.order.paymentMethod);
                    sessionStorage.setItem("resultType", res.order.paymentType);
                    sessionStorage.setItem("resultAddr", res.order.address);

                    navigate("/orderResult", {replace: true});
                  })
                  ;
            })
            .catch(err => console.log("오류:", err))





      } else {
        if (inputNewAddr === "") {
          alert("신규 주소를 입력해주세요");
        } else {
          //신규 주소로 주문
          fetch('/order', {
            method: 'post',
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              newAddress: inputNewAddr,
              orderItemIds: JSON.parse(localStorage.getItem("orderItemIds")),
              paymentMethod: methodState,
              paymentType: typeState,
            })
          })
              .then(res => res.json())
              .then(res => {
                console.log("주문 성공(신규 주소)", res);

                return fetch(`/order-success/${res}`, {
                  headers: {
                    "Content-Type": "application/json",
                  }
                })
                    .then(res => res.json())
                    .then(res => {
                      console.log("return:", res);
                      sessionStorage.setItem("resultIds", res.order.id);
                      sessionStorage.setItem("resultDate", (res.order.orderDate).substr(0, 10));
                      sessionStorage.setItem("resultUserName", ousername);
                      sessionStorage.setItem("resultNumber", onumber); //
                      sessionStorage.setItem("resultTotalPrice", res.order.totalPrice);
                      sessionStorage.setItem("resultMethod", res.order.paymentMethod);
                      sessionStorage.setItem("resultType", res.order.paymentType);
                      sessionStorage.setItem("resultAddr", res.order.address);

                      navigate("/orderResult", {replace: true});
                    })
                    ;
              })
              .catch(err => console.log("오류:", err))
        }

      }

    }
  }

  const [inputNewAddr, setInputNewAddr] = useState("");

  const newAddrChangeHandler = e => {
    setInputNewAddr(e.target.value);
  }

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
              <div className={styles.infoDiv}>{ousername}</div>
            </div>
            <div className={styles.wrapDiv}>
              <div className={styles.tagDiv}>휴대전화</div>
              <div className={styles.infoDiv}>{onumber}</div>
            </div>
            <div className={styles.wrapDiv}>
              <div className={styles.tagDiv}>주소</div>
              <div className={styles.infoDiv}>
                <div>
                  {isAddrNew === false
                      ?
                      <div>
                        <button className={styles.addrBtn} style={{border:'1px solid #2287e3', color:'#2287e3'}} onClick={() => setIsAddrNew(false)}>기본 주소</button>
                        <button className={styles.addrBtn} onClick={() => setIsAddrNew(true)}>신규 주소</button>
                      </div>
                      :
                      <div>
                        <button className={styles.addrBtn} onClick={() => setIsAddrNew(false)}>기본 주소</button>
                        <button className={styles.addrBtn} style={{border:'1px solid #2287e3', color:'#2287e3'}} onClick={() => setIsAddrNew(true)}>신규 주소</button>
                      </div>
                  }


                </div>
                {isAddrNew === false
                    ?
                    <div>
                      <div>{oaddress}</div>
                    </div>
                    :
                    <div>
                      <input onChange={(e) => newAddrChangeHandler(e)}
                             maxLength={30} style={{width:'300px', padding:'3px'}} name="newAddr"/>
                    </div>
                }

              </div>
            </div>



            <div className={styles.orderInfoHeader}>
              상품 정보
            </div>
            <div className={styles.prodInfoTag}>
              <div className={styles.prodInfoTag1}>전체 {orderListInfo.length}개</div>
              <div className={styles.prodInfoTag2}>상품명(옵션)</div>
              <div className={styles.prodInfoTag3}>수량</div>
              <div className={styles.prodInfoTag4}>판매가</div>
            </div>
            <div className={styles.orderItemsWrap}>
              {orderListInfo.map((item, id) => {
                return <OrderProdInfoList key={id} list={item} num={numCount[id]} />;
              })}
              {orderListInfo.length < 1
                  ? <div className={styles.emptyDiv}>주문한 상품이 없습니다.</div>
                  : null}
            </div>

            <div className={styles.orderInfoHeader}>
              결제 정보
            </div>
            <div style={{alignItems:'center', borderTop:'1px solid rgb(180, 180, 180)'}}
                 className={styles.wrapDiv}>
              <div className={styles.tagDiv}>결제 수단</div>
              <div className={styles.infoDiv}>
                <div>
                  <select defaultValue="카드 선택" onChange={(e) => pmethodChangeHandler(e)}>
                    <option value="카드 선택">카드 선택</option>
                    <option value="신한카드">신한카드</option>
                    <option value="우리카드">우리카드</option>
                  </select>
                  <select defaultValue="할부 선택" onChange={(e) => ptypeChangeHandler(e)}>
                    <option value="할부 선택">할부 선택</option>
                    <option value="일시불">일시불</option>
                    <option value="6개월 할부">6개월 할부</option>
                    <option value="1년 할부">1년 할부</option>
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
              <div className={styles.infoDiv}>{Number(ofee).toLocaleString()}원</div>
            </div>
            <div className={styles.wrapDiv}>
              <div className={styles.tagDiv}>상품 가격</div>
              <div className={styles.infoDiv}>{Number(oprice).toLocaleString()}원</div>
            </div>
            <div className={styles.wrapDiv}>
              <div style={{fontWeight:'bold'}} className={styles.tagDiv}>총 결제 금액</div>
              <div style={{fontWeight:'bold'}} className={styles.infoDiv}>{Number(ototalprice).toLocaleString()}원</div>
            </div>

            <div className={styles.payBtnWrap}>
              <button style={{border:'0'}} onClick={payClickHandler}>결제하기</button>
            </div>

          </div>
        </div>
      </>
  );
}
export default OrderSheet;