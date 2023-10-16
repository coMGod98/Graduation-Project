import React from "react";
import Header from "../components/header";
import styles from "./product.module.css"
import { useState } from "react";

function Product() {
  const sizeList = ["사이즈 선택", "M", "L", "XL"];
  const colorList = ["색상 선택", "블랙", "화이트"];
  const [sizeSelected, setSizeSelected] = useState("사이즈 선택");
  const [colorSelected, setColorSelected] = useState("색상 선택");

  const handleSizeSelect = (e) => {
    setSizeSelected(e.target.value);
  };
  const handleColorSelect = (e) => {
    setColorSelected(e.target.value);
  };

  return (
    <>
      <Header />
      <div className={styles.productSection}>
        <div className={styles.detailOrder}>
          <div className={styles.productImgWrap}>
            <div style={{fontSize:'17px'}}>전체 카테고리 &gt;</div>
            <img src={require('../images/sample.png')} alt='sample' />
            
          </div>
          <div className={styles.productInfoWrap}>
            
            <h1 style={{fontSize:'23px', fontWeight:'bold'}}>상품명</h1>
            <hr/>

            <div style={{display:'flex'}}>
              <div className={styles.productInfoTag}>
                <ul>
                  <li>&gt; 성별</li>
                  <li>&gt; 판매가</li>
                  <li>&gt; 배송비</li>
                  <li>&gt; 재고</li>
                  <li>&gt; 사이즈</li>
                  <li>&gt; 색상</li>
                </ul>
              </div>

              <div className={styles.productInfo}>
                <ul>
                  <li>ex.남</li>
                  <li>ex.12,345원</li>
                  <li>ex.12,34원</li>
                  <li>ex.7</li>

                  <select onChange={handleSizeSelect} value={sizeSelected}>
                    {sizeList.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select><br></br>
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
            {(sizeSelected != "사이즈 선택") && (colorSelected != "색상 선택") ? 
            <table>
              <th>상품명</th><th>수량</th><th>가격</th><th></th>
              <tr>
                <td>ex.남성셔츠 {sizeSelected}{colorSelected}</td>
                <td></td>
                <td>ex.12,345원</td>
                <td><button>삭제</button></td>
              </tr>
            </table>
            : ""}
            
            <div className={styles.totalPriceDiv}>총 상품금액: </div>
            <div className={styles.btnWrap}>
              <button style={{color:'white', backgroundColor:'navy'}}>바로 구매</button>
              <button>장바구니 담기</button>   
            </div>
          </div>
        </div>
        
        <div className={styles.detailInfo}>
          <div className={styles.detailInfoHeader}>
            상품 정보
          </div>
          <div className={styles.detailImageWrap}>
            <img src={require('../images/looklook_logo.png')} alt='detailed_info'></img>
          </div>
          <div className={styles.detailInfoWrap}>
            본 상품은 ~~~~
          </div>
        </div>  
      </div>
    </>
  )
}
export default Product;