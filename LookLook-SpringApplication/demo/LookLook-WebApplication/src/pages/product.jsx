import React, {useEffect} from "react";
import Header from "../components/header";
import styles from "./product.module.css"
import { useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import products from "../products.json";
import PutItem from "../components/putItem"
import CategoryRename from "../components/categoryRename";
import {Navigator} from "react-router-dom";
import ProductBuyModal from "../components/productBuyModal";
import {setOItemIds} from "../store/orderSlice";
import {setOrderInfo} from "../store/orderInfoSlice";
import { useDispatch, useSelector } from "react-redux";

function Product() {

    const dispatch = useDispatch();

    const {id} = useParams();

    const navigate = useNavigate();

    const [prodInfo, setProdInfo] = useState([]);

    const [sizeList, setSizeList] = useState(["사이즈 선택"]);
    const [colorList, setColorList] = useState(["색상 선택"]);
    const [sizeSelected, setSizeSelected] = useState("사이즈 선택");
    const [colorSelected, setColorSelected] = useState("색상 선택");

    const handleSizeSelect = (e) => {
        setSizeSelected(e.target.value);
    };
    const handleColorSelect = (e) => {
        setColorSelected(e.target.value);
    };


    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState("");

    const handleClickCounter = (e) => {
        setQuantity((prev) => prev + e);
        setTotal((prev) => prev + prodInfo.price * e);
    };


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const loginAlert = () => {
        alert("로그인 후 이용하실 수 있습니다.");
    }

    const [isTokenEnd, setIsTokenEnd] = useState(true);
    const clickBuy = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken === null) {
            loginAlert();
        } else {

            fetch('/order-sheet', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    pid: Number(prodInfo.pid),
                    size: sizeSelected,
                    color: colorSelected,
                    count: Number(quantity),
                })
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === 500) {
                        setIsTokenEnd(true);
                        console.log("토큰 만료됨:", res);
                        sessionStorage.removeItem("accessToken");
                        navigate("/");
                        alert("토큰이 만료되었습니다.");
                    } else {
                        setIsTokenEnd(false);
                        console.log("반환값:", res);
                        console.log(res.orderiteminfo);

                        let i;
                        let tmp = [];
                        for (i = 0; i < res.orderiteminfo.length; i++) {
                            tmp[i] = res.orderiteminfo[i].orderItemId;
                        }
                        console.log(tmp);
                        localStorage.setItem("orderItemIds", JSON.stringify(tmp));

                        // dispatch(setOItemIds(itemIds)); //***********************************

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
                    }

                })
                .catch(err => {
                    console.log("오류:", err);
                })

        }
    }
    const clickGoCart = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken === null) {
            loginAlert();
        } else {
            navigate("/Cart");
        }
    }

    useEffect(() => {

        fetch(`/product/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log("상세 상품정보: ", res);
                setProdInfo(res);
                const tmp1 = [...sizeList];
                const tmp2 = [...colorList];
                let i, j;
                for (i = 0; i < res.size.length; i++) {
                    tmp1[i + 1] = res.size[i];
                }
                for (j = 0; j < res.color.length; j++) {
                    tmp2[j + 1] = res.color[j];
                }
                setSizeList(tmp1);
                setColorList(tmp2);
                setTotal(res.price);


                if (res.category > 100 && res.category < 200) {
                    setHighCateName("여성"); setHighListName("womanList");
                } else if (res.category > 200 && res.category < 300) {
                    setHighCateName("남성"); setHighListName("manList");
                } else if (res.category > 300 && res.category < 400) {
                    setHighCateName("아우터"); setHighListName("outerList");
                } else if (res.category > 400 && res.category < 500) {
                    setHighCateName("신발"); setHighListName("shoesList");
                } else if (res.category > 500 && res.category < 600) {
                    setHighCateName("패션소품"); setHighListName("fashionList");
                } else {
                    return null;
                }
            })
            .catch(err => {
                console.log("오류: ". err);
            })
    }, []);

    const [highCateName, setHighCateName] = useState("");
    const [highListName, setHighListName] = useState("");

    const putCartClick = () => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken === null) {
            loginAlert();
        } else {
            if ((sizeSelected !== "사이즈 선택") && (colorSelected !== "색상 선택")) {


                fetch('/cart', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        pid: Number(prodInfo.pid),
                        size: sizeSelected,
                        color: colorSelected,
                        count: Number(quantity),
                    })
                })
                    .then(res => {
                        if (res.status === 500) {
                            setIsTokenEnd(true);
                            sessionStorage.removeItem("accessToken");
                            navigate("/");
                            alert("토큰이 만료되었습니다.");
                        } else {
                            if (res.status === 200) {
                                setIsTokenEnd(false);
                                alert("상품을 장바구니에 담았습니다.");
                                console.log("장바구니 담기 성공!", res);
                            } else {
                                alert("장바구니에 상품을 담지 못했습니다.");
                                console.log("장바구니 담기 실패", res);
                            }
                        }
                    })
                    .catch(err => {
                        console.log("오류: ", err);
                    })
            } else {
                alert("옵션을 선택해주세요.");
            }
        }
    }

    return (
        <>
            <Header />

            <div className={styles.productSection}>
                <div className={styles.detailOrder}>
                    <div className={styles.productImgWrap}>
                        <Link style={{color:'black'}} to={"/" + highListName + "/" + prodInfo.category}>
                            <div style={{fontSize:'17px'}}>전체 카테고리 &gt;&nbsp;
                                <p>{highCateName}</p>
                                <div>&nbsp;&gt;&nbsp;<CategoryRename cate={String(prodInfo.category)}/></div>
                            </div>
                        </Link>
                        <div className={styles.imgWrap}>
                            <img src={prodInfo.mainImgUrl} alt='product_img' />
                        </div>

                    </div>
                    <div className={styles.productInfoWrap}>

                        <h1 style={{fontSize:'21px', fontWeight:'bold', lineHeight:'30px'}}>{prodInfo.itemName}</h1>
                        <hr/>

                        <div style={{display:'flex'}}>
                            <div className={styles.productInfoTag}>
                                <ul>
                                    <li>&gt; 성별</li>
                                    <li>&gt; 판매가</li>
                                    <li>&gt; 배송비</li>
                                    <li>&gt; 사이즈</li>
                                    <li>&gt; 색상</li>
                                </ul>
                            </div>

                            <div className={styles.productInfo}>
                                <ul>
                                    <li>{prodInfo.pgender === "MAN" ? <p>남성</p> : <p>여성</p>}</li>
                                    <li>{Number(prodInfo.price).toLocaleString()}원</li>
                                    <li>{Number(2500).toLocaleString()}원</li>

                                    <select onChange={handleSizeSelect} value={sizeSelected}>
                                        {sizeList.map((item) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <br></br>
                                    <select onChange={handleColorSelect} value={colorSelected}>
                                        {colorList.map((item) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>

                                </ul>
                            </div>
                        </div>
                        <div className={styles.putWrap}>
                            <div style={{backgroundColor:'#e8f7ff'}} className={styles.putTag}>
                                <div className={styles.nameDiv}>상품명</div>
                                <div className={styles.quantDiv}>수량</div>
                                <div className={styles.priceDiv}>가격</div>
                            </div>
                            {(sizeSelected !== "사이즈 선택") && (colorSelected !== "색상 선택") ?

                                <PutItem id={prodInfo.pid} name={prodInfo.itemName}
                                         price={prodInfo.price} size={sizeSelected}
                                         color={colorSelected} quantity={quantity} onClick={handleClickCounter}/>
                                : <div style={{borderTop:'1px solid gray'}} className={styles.putTag}>담은 상품이 없습니다.</div>
                                }
                        </div>
                        {(sizeSelected !== "사이즈 선택") && (colorSelected !== "색상 선택")
                            ? <div className={styles.totalPriceDiv}>
                                총 상품금액: {Number(2500 + total).toLocaleString()}원</div>
                            : <div className={styles.totalPriceDiv}>총 상품금액: 0원</div>
                        }

                        <div className={styles.btnWrap}>
                            <button onClick={clickBuy}
                                    style={{border:'0', color:'white', backgroundColor:'#25324f'}}>바로 구매</button>
                            <button onClick={putCartClick}>장바구니 담기</button>
                            <button onClick={clickGoCart} style={{width:'40px'}}>
                                <img src={require('../images/cart.png')} alt='navi_cart' />
                            </button>
                        </div>

                    </div>
                </div>

                <div className={styles.detailInfo}>
                    <div className={styles.detailInfoHeader}>
                        상품 정보
                    </div>
                    <div className={styles.detailImageWrap}>
                        <img src={prodInfo.detailedImgsUrl} alt='product_img' />
                    </div>
                    <div className={styles.detailInfoWrap}>
                        {prodInfo.itemDetail}
                    </div>
                </div>
                <ProductBuyModal isOpen={isModalOpen} closeModal={closeModal}/>
            </div>
        </>
    )
}
export default Product;