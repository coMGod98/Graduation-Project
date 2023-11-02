import React, {useEffect, useState} from "react";
import styles from "./seller.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";

import MyProductsList from "../components/seller/myProductsList";
import MyProductsListTag from "../components/seller/myProductsListTag";

import OrderManageList from "../components/seller/orderManageList";
import OrderManageListTag from "../components/seller/orderManageListTag";

import CategorySelecter from "../components/seller/categorySelecter";

import CategoryRename from "../components/categoryRename";


function Seller() {

    const {menu} = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        inputPrName: "", inputPrPrice: "", inputPrStock: 1, inputPrGender: "",
        inputPrDetail: "", inputPrImage: "", inputPrDetailImage: ""
    })
    const [sizeField, setSizeField] = useState(['']);   //선택 사이즈
    const [colorField, setColorField] = useState(['']); //선택 색상
    const [inSize, setInSize] = useState(['']);
    const [inColor, setInColor] = useState(['']);

    const [highCategory, setHighCategory] = useState(''); //선택 상위 카테고리
    const [lowCategory, setLowCategory] = useState(''); //선택 하위 카테고리

    const accessToken = localStorage.getItem("accessToken");
    const [sellerInfo, setSellerInfo] = useState([]);
    const [sellerProds, setSellerProds] = useState([]);
    const [sellerSize, setSellerSize] = useState([[]]);
    const [sellerColor, setSellerColor] = useState([[]]);

    const highFunction = (sltHigh) => {
        if (lowCategory !== '') {
            setLowCategory('');
        }
        setHighCategory(sltHigh);
    }
    const lowFunction = (sltLow) => {
        setLowCategory(sltLow);
    }


    const logoutClick = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("accessToken");
            navigate("/");
        }
    }
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }


    const handleSizeChange = (idx, e) => {
        const tmp = [...sizeField];
        tmp[idx] = e.target.value;
        setSizeField(tmp);

        const tmp2 = [...inSize];
        tmp2[idx] = e.target.value;
        setInSize(tmp2);
    }
    const handleColorChange = (idx, e) => {
        const tmp = [...colorField];
        tmp[idx] = e.target.value;
        setColorField(tmp);

        const tmp2 = [...inColor];
        tmp2[idx] = e.target.value;
        setInColor(tmp2);
    }
    const addSizeField = () => {
        if (sizeField.length === 3) {
            alert('최대 3개까지 설정할 수 있습니다.');
            return;
        }
        const tmp = [...sizeField, ''];
        setSizeField(tmp);
    }
    const addColorField = () => {
        if (colorField.length === 3) {
            alert('최대 3개까지 설정할 수 있습니다.');
            return;
        }
        const tmp = [...colorField, ''];
        setColorField(tmp);
    }
    const resetSizeField = () => {
        setSizeField(['']);
        setInSize(['']);
    }
    const resetColorField = () => {
        setColorField(['']);
        setInColor(['']);
    }



    const regiSubmit = e => {

        const accessToken = localStorage.getItem("accessToken");
        e.preventDefault();

        // 이미지 (파일명.확장자)만 추출
        // let pos = values.inputPrImage.lastIndexOf("\\");
        // let len = values.inputPrImage.length;
        // let imageName = values.inputPrImage.substring(pos + 1, len);

        if (lowCategory === '') {
            alert("카테고리를 선택해주세요");
            return null;
        } else {
            fetch('/seller/items/new', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    uid: Number(sellerInfo.uid),
                    itemName: values.inputPrName,
                    price: Number(values.inputPrPrice),
                    stock: Number(values.inputPrStock),
                    pgender: values.inputPrGender,
                    itemDetail: values.inputPrDetail,
                    size: sizeField,
                    color: colorField,
                    category: lowCategory
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        alert("상품 등록 성공");
                        console.log("등록 성공!", res);
                        navigate("/seller/myProducts");
                        window.location.reload();
                    } else {
                        console.log("등록 실패", res);
                    }
                })
                .catch(err => {
                    console.log("오류: ", err);
                })
        }

        console.log("입력: ", Number(sellerInfo.uid), values.inputPrName, Number(values.inputPrPrice)
            , Number(values.inputPrStock), values.inputPrGender, values.inputPrDetail
            , sizeField, colorField, lowCategory);
    }

    useEffect(() => {
        fetch('/seller', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log("판매자 정보: ", res);
                setSellerInfo(res);
            })
            .catch(err => {
                console.log("오류: ", err);
            })


        fetch('/seller/items', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log("나의상품정보: ", res);
                setSellerProds(res);
                setSellerSize(res.size);
                setSellerColor(res.color);
                console.log("결과: ", res[3].size)

            })
            .catch(err => {
                console.log("오류: ", err);
            })

    }, [])

    return (
        <>
            <div className={styles.sellerHeader}>
                <Link to="/">
                    <img src={require("../images/looklook_logo.png")} alt="logo" />
                    <p>판매자</p>
                </Link>
            </div>
            <div className={styles.sellerSection}>
                <div className={styles.sellerMenu}>
                    <div className={styles.sellerInfoWrap}>
                        <h3>{sellerInfo.userName}님 반갑습니다.</h3>
                        <img onClick={logoutClick}
                             src={require("../images/logout.png")} alt="logout" />
                    </div>
                    {menu === "myProducts"
                        ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}
                               className={styles.menuDiv}>나의 상품 정보 조회</div>
                        :
                        <Link to="/seller/myProducts">
                            <div className={styles.menuDiv}>나의 상품 정보 조회</div>
                        </Link>
                    }
                    {menu === "regiRequest"
                        ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}
                               className={styles.menuDiv}>상품 등록 요청</div>
                        :
                        <Link to="/seller/regiRequest">
                            <div className={styles.menuDiv}>상품 등록 요청</div>
                        </Link>
                    }
                    {menu === "orderManage"
                        ? <div style={{backgroundColor:'rgb(213, 239, 255)'}}
                               className={styles.menuDiv}>주문 관리</div>
                        :
                        <Link to="/seller/orderManage">
                            <div className={styles.menuDiv}>주문 관리</div>
                        </Link>
                    }
                </div>

                {menu === "myProducts"
                    ?
                    <div className={styles.sellerWorkSpace}>
                        <div className={styles.workHeader}>나의 상품 정보 조회</div>
                        <div className={styles.searchWrap}>
                            <input /><button>검색</button>
                        </div>
                        <div className={styles.workWrap}>
                            <MyProductsListTag />
                            {sellerProds.map((item, id) => {
                                return <MyProductsList key={id} list={item} psize={sellerSize}
                                                pcolor={sellerColor}/>;
                            })}
                            {sellerProds.length < 1
                                ? <div className={styles.listEmpty}>등록된 상품이 없습니다.</div>
                                : null
                            }
                        </div>



                    </div>



                    : (menu === "regiRequest"
                            ?
                            <div className={styles.sellerWorkSpace}>
                                <form onSubmit={regiSubmit}>
                                    <div className={styles.workHeader}>상품 등록 요청</div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>상품명</div>
                                        <div className={styles.regiInput}>
                                            <input className={styles.longInput} maxLength="30"
                                                   onChange={handleChange} name="inputPrName" required />
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>가격</div>
                                        <div className={styles.regiInput}>
                                            <input placeholder="숫자만 입력해주세요" onChange={handleChange} pattern="\d*" name="inputPrPrice" required />
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>재고량</div>
                                        <div className={styles.regiInput}>
                                            <input onChange={handleChange} name="inputPrStock" min={1} max={999} pattern="\d*" defaultValue={1} type="number" required />
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>성별</div>
                                        <div className={styles.regiInput}>
                                            <input type="radio" name="inputPrGender" id="MALE" value="MALE" required onChange={handleChange}
                                                   className={styles.radioInput} />남
                                            <input type="radio" name="inputPrGender" id="FEMALE" value="FEMALE" required onChange={handleChange}
                                                   className={styles.radioInput} style={{marginLeft:'15px'}} />여
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>상품 설명</div>
                                        <div className={styles.regiInput}>
                                        <textarea className={styles.longInput} maxLength="999"
                                                  onChange={handleChange} style={{height:'200px'}} name="inputPrDetail" required />
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>대표 이미지</div>
                                        <div className={styles.regiInput}>
                                            <input onChange={handleChange} name="inputPrImage" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>상세 이미지</div>
                                        <div className={styles.regiInput}>
                                            <input onChange={handleChange} name="inputPrDetailImage" type="file" accept="image/*" />
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>사이즈</div>
                                        <div className={styles.regiInput}>
                                            {sizeField.map((field, idx) => (
                                                <input key={idx} style={{marginBottom:'3px'}} required value={inSize[idx]}
                                                       name="inputPrSize" onChange={(e) => handleSizeChange(idx, e)}/>
                                            ))}
                                            <button type="button"
                                                    onClick={addSizeField}>옵션 추가</button>
                                            <button type="button"
                                                    onClick={resetSizeField}>초기화</button>
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>색상</div>
                                        <div className={styles.regiInput}>
                                            {colorField.map((field, idx) => (
                                                <input key={idx} style={{marginBottom:'3px'}} required value={inColor[idx]}
                                                       name="inputPrColor" onChange={(e) => handleColorChange(idx, e)}/>
                                            ))}
                                            <button type="button"
                                                    onClick={addColorField}>옵션 추가</button>
                                            <button type="button"
                                                    onClick={resetColorField}>초기화</button>
                                        </div>
                                    </div>
                                    <div className={styles.regiWrap}>
                                        <div className={styles.regiTag}>카테고리</div>
                                        <div className={styles.regiInput}>
                                            <CategorySelecter highFunction={highFunction} lowFunction={lowFunction}/>
                                            <div style={{marginTop:'20px'}}>선택 카테고리: {highCategory} > <CategoryRename cate={lowCategory}/></div>
                                        </div>

                                    </div>
                                    <button type="submit" className={styles.regiBtn}>등록 요청</button>
                                </form>




                            </div>





                            :
                            <div className={styles.sellerWorkSpace}>
                                <div className={styles.workHeader}>주문 관리</div>
                                <div className={styles.searchWrap}>
                                    <input /><button>검색</button>
                                </div>
                                <div className={styles.workWrap}>
                                    <OrderManageListTag />
                                    <OrderManageList />
                                    <OrderManageList />
                                    <OrderManageList />
                                </div>
                            </div>
                    )}



            </div>
        </>
    );
}
export default Seller;