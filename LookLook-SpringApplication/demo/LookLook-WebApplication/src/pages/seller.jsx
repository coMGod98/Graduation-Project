import React, {useState} from "react";
import styles from "./seller.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {Link} from "react-router-dom";

import MyProductsList from "../components/seller/myProductsList";
import MyProductsListTag from "../components/seller/myProductsListTag";

import OrderManageList from "../components/seller/orderManageList";
import OrderManageListTag from "../components/seller/orderManageListTag";

import CategorySelecter from "../components/seller/categorySelecter";

function Seller() {

    const {menu} = useParams();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        inputPrName: "", inputPrPrice: "", inputPrStock: "", inputPrGender: "",
        inputPrDetail: "", inputPrImage: "", inputPrDetailImage: ""
    })
    const [sizeField, setSizeField] = useState(['']);   //선택 사이즈
    const [colorField, setColorField] = useState(['']); //선택 색상
    const [highCategory, setHighCategory] = useState(['']); //선택 상위 카테고리
    const [lowCategory, setLowCategory] = useState(['']); //선택 하위 카테고리


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
    }
    const handleColorChange = (idx, e) => {
        const tmp = [...colorField];

        tmp[idx] = e.target.value;
        setColorField(tmp);
    }
    const addSizeField = () => {
        if (sizeField.length === 4) {
            alert('최대 4개까지 설정할 수 있습니다.');
            return;
        }
        const tmp = [...sizeField, ''];
        setSizeField(tmp);
    }
    const addColorField = () => {
        if (colorField.length === 4) {
            alert('최대 4개까지 설정할 수 있습니다.');
            return;
        }
        const tmp = [...colorField, ''];
        setColorField(tmp);
    }
    const resetSizeField = () => {
        setSizeField(['']);
    }
    const resetColorField = () => {
        setColorField(['']);
    }

    const regiSubmit = e => {
        e.preventDefault();
        console.log(values);
        console.log(colorField);
        console.log(sizeField);
        console.log(highCategory);
        console.log(lowCategory);
    }



    const [deleteId, setDeleteId] = useState("");
    const deleteById = () => {
        // setDeleteId();
        //delete버튼 누른 상품id에 해당하는 상품정보 삭제
    }



    return (
        <>
            <div className={styles.sellerHeader}>
                <img src={require("../images/looklook_logo.png")} alt="logo" />
            </div>
            <div className={styles.sellerSection}>
                <div className={styles.sellerMenu}>
                    <div className={styles.sellerInfoWrap}>
                        <h3>님 반갑습니다.</h3>
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
                            <MyProductsList />
                            <MyProductsList />
                            <MyProductsList />

                        </div>
                        <button className={styles.blueBtn}>선택 삭제</button>



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
                                               onChange={handleChange} name="inputPrName" />
                                    </div>
                                </div>
                                <div className={styles.regiWrap}>
                                    <div className={styles.regiTag}>가격</div>
                                    <div className={styles.regiInput}>
                                        <input placeholder="숫자만 입력해주세요" onChange={handleChange} pattern="\d*" name="inputPrPrice"/>
                                    </div>
                                </div>
                                <div className={styles.regiWrap}>
                                    <div className={styles.regiTag}>재고량</div>
                                    <div className={styles.regiInput}>
                                        <input onChange={handleChange} name="inputPrStock" min={1} max={999} pattern="\d*" defaultValue={1} type="number"/>
                                    </div>
                                </div>
                                <div className={styles.regiWrap}>
                                    <div className={styles.regiTag}>성별</div>
                                    <div className={styles.regiInput}>
                                        <input type="radio" name="inputPrGender" id="male" value="male" required onChange={handleChange}
                                               className={styles.radioInput} />남
                                        <input type="radio" name="inputPrGender" id="female" value="female" required onChange={handleChange}
                                               className={styles.radioInput} style={{marginLeft:'15px'}}/>여
                                    </div>
                                </div>
                                <div className={styles.regiWrap}>
                                    <div className={styles.regiTag}>상품 설명</div>
                                    <div className={styles.regiInput}>
                                        <textarea className={styles.longInput} maxLength="999"
                                               onChange={handleChange} style={{height:'200px'}} name="inputPrDetail"/>
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
                                            <input style={{marginBottom:'3px'}}
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
                                            <input  style={{marginBottom:'3px'}}
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
                                    </div>
                                    <div>선택 카테고리: {highCategory} > {lowCategory}</div>
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
                            <button className={styles.blueBtn}>배송 준비중</button>
                            <button className={styles.blueBtn}>배송 중</button>
                            <button className={styles.blueBtn}>배송 완료</button>
                        </div>
                    )}



            </div>
        </>
    );
}
export default Seller;