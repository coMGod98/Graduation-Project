import React, {useEffect, useState} from "react";
import Header from "../components/header";
import styles from "./cart.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/cartItem";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setOItemIds } from "../store/orderSlice";
import { setOrderInfo } from "../store/orderInfoSlice";

function Cart() {

    const orderOAddress = useSelector((state) => state.orderInfoItem.oAddress);
    const orderItemInfo = useSelector((state) => state.orderInfoItem.orderiteminfo);



    const [oAddress, setOAddress] = useState("");
    const [oItemPrice, setOItemPrice] = useState(0);
    const [oItemInfo, setOItemInfo] = useState([]);
    const [oPhoneNumber, setOPhoneNumber] = useState("");
    const [oShipment_FEE, setOShipment_FEE] = useState(0);
    const [oTotalPrice, setOTotalPrice] = useState(0);
    const [oUserName, setOUserName] = useState("");


    const dispatch = useDispatch();

    const [pIds, setPIds] = useState([]);

    const orderAddr = useSelector((state) => state.orderItem.newAddress);
    const orderIds = useSelector((state) => state.orderItem.orderItemIds);
    const orderPayMethod = useSelector((state) => state.orderItem.paymentMethod);
    const orderPayType = useSelector((state) => state.orderItem.paymentType);
    const onClickView = () => {
        console.log("itemIds", itemIds);

        console.log("리덕스 주소", orderOAddress);
        console.log("리덕스 상품리스트", orderItemInfo);
    }





    const navigate = useNavigate();

    const [cartListInfo, setCartListInfo] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [itemIds, setItemIds] = useState([]);

    const [numCount, setNumCount] = useState([]);

    const tmpList = [
        { name: "상품명1", price: "1111" },
        { name: "상품명2", price: "2000" },
        { name: "상품명3", price: "3003" }
    ];

    const [quantity, setQuantity] = useState(1);
    const [stock, setStock] = useState(10);

    // const [test, setTest] = useState([1,2,3,4]);
    // const clickBtn = () => {
    //   test[1] = 10;
    //   console.log(test);
    //
    //   quantity[idx] += e;
    //   console.log(quantity);
    // }

    const [isTokenEnd, setIsTokenEnd] = useState(true);

    useEffect(() => {

        const accessToken = sessionStorage.getItem("accessToken");
        fetch('/cart', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 500 || res.status === 401) {
                    console.log("토큰 만료됨:", res);
                    setIsTokenEnd(true);
                    navigate("/");
                    sessionStorage.removeItem("accessToken");
                    alert("토큰이 만료되었습니다.");
                } else {
                    console.log("정보 가져오기 성공", res);
                    setIsTokenEnd(false);
                    setCartListInfo(res.CartItemList);
                    setTotalPrice(res.totalPrice);

                    const tmp = [...itemIds];
                    let i;
                    for (i = 0; i < res.CartItemList.length; i++) {
                        tmp[i] = res.CartItemList[i].cartItemId;
                    }
                    setItemIds(tmp);       //장바구니 번호


                    const tmp2 = [...numCount];
                    let j
                    for (j = 0; j < res.CartItemList.length; j++) {
                        tmp2[j] = j + 1;
                    }
                    setNumCount(tmp2);
                }
            })
            .catch(err => {
                console.log("오류: ", err);
            })
    }, []);


    // const checkedId = tmpList.map(item => {
    //   return item.id;
    // });


    const handleClickCounter = (e) => {
        setQuantity((prev) => prev + e);
        console.log(quantity);
    };

    const orderClick = () => {

        // dispatch(setIdsOrderItem({itemIds}));


        const accessToken = sessionStorage.getItem("accessToken");
        if (itemIds.length < 1) {
            alert("장바구니에 상품이 없습니다.");
        } else {
            fetch('/order-sheet', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    cartItemIds: itemIds,
                })
            })
                .then(res => res.json())
                .then(res => {
                    console.log("itemIds:", itemIds);
                    console.log("반환값:", res);
                    console.log(res.orderiteminfo);
                    dispatch(setOItemIds(itemIds));

                    let i;
                    let tmp = [];
                    for (i = 0; i < res.orderiteminfo.length; i++) {
                        tmp[i] = res.orderiteminfo[i].orderItemId;
                    }
                    console.log(tmp);
                    localStorage.setItem("orderItemIds", JSON.stringify(tmp));

                    // setOAddress(res.address);
                    // setOItemPrice(res.orderItemPrice);
                    // setOPhoneNumber(res.phoneNumber);
                    // setOShipment_FEE(res.shipment_FEE);
                    // setOTotalPrice(res.totalPrice);
                    // setOUserName(res.userName);

                    // setOItemInfo(res.orderiteminfo);
                    dispatch(setOrderInfo(res.orderiteminfo));

                    sessionStorage.setItem("oaddress", res.address);
                    sessionStorage.setItem("oprice", res.orderItemPrice);
                    sessionStorage.setItem("oiteminfo", res.orderiteminfo);
                    sessionStorage.setItem("onumber", res.phoneNumber);
                    sessionStorage.setItem("ofee", res.shipment_FEE);
                    sessionStorage.setItem("ototalprice", res.totalPrice);
                    sessionStorage.setItem("ousername", res.userName);

                    // alert("주문서 작성 페이지로 이동합니다.");

                    navigate("/orderSheet");
                })
                .catch(err => {
                    console.log("오류:", err);
                })
        }

    }

    return (

        <>
            <Header />
            <div className={styles.CartSection}>
                <div className={styles.CartWrap}>
                    <div className={styles.CartHeader}>장바구니</div>

                    <div className={styles.orderWrap}>
                        <div style={{backgroundColor: 'rgb(184, 223, 255)'}}
                             className={styles.orderDiv}>장바구니</div>
                        <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
                        <div className={styles.orderDiv}>주문서 작성</div>
                        <div style={{fontSize:'28px', fontWeight:'bold'}}>&gt;</div>
                        <div className={styles.orderDiv}>주문 완료</div>
                    </div>

                    <div className={styles.CartListWrap}>
                        <div className={styles.cartListTag}>
                            <div className={styles.cartTag1}>전체 {cartListInfo.length}개</div>
                            <div className={styles.cartTag2}>상품명(옵션)</div>
                            <div className={styles.cartTag3}>수량</div>
                            <div className={styles.cartTag4}>판매가</div>
                        </div>
                        <div className={styles.cartItemsWrap}>
                            {isTokenEnd === true
                                ? <div className={styles.emptyWrap}>토큰이 만료되었습니다.</div>
                                : (cartListInfo.length < 1
                                        ? <div className={styles.emptyWrap}>장바구니에 담은 상품이 없습니다.</div>
                                        :
                                        cartListInfo.map((item, id) => {
                                            return <CartItem key={id} list={item} num={numCount[id]}/>;
                                        })
                                )
                            }
                        </div>

                    </div>
                    <div className={styles.btnWrap}>
                        <div>배송비 : 2,500원 / 총 상품금액: {Number(totalPrice).toLocaleString()}원</div>
                    </div>
                    <div className={styles.orderBtnWrap}>
                        <button style={{border:'0'}} onClick={orderClick}>주문하기</button>
                    </div>



                </div>
            </div>
        </>
    );
}
export default Cart;