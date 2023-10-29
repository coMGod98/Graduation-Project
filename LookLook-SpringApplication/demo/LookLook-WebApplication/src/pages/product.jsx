import React from "react";
import Header from "../components/header";
import styles from "./product.module.css"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import products from "../products.json";
import PutItem from "../components/putItem"

function Product() {
  const {id} = useParams();

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





  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(products[id].price);
  const [stock, setStock] = useState(8);

  const handleClickCounter = (e) => {
    setQuantity((prev) => prev + e);
    setTotal((prev) => prev + products[id].price * e);
    console.log(quantity, total);
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
            
            <h1 style={{fontSize:'23px', fontWeight:'bold'}}>{products[id].name}</h1>
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
                  <li>남</li>
                  <li>{products[id].price}원</li>
                  <li>2500원</li>
                  <li>{stock}</li>

                  {stock === 0 
                  ? <h>품절된 상품입니다.</h>
                  : <select onChange={handleSizeSelect} value={sizeSelected}>
                      {sizeList.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  }
                  
                  <br></br>

                  {stock === 0 
                  ? <h>품절된 상품입니다.</h>
                  : <select onChange={handleColorSelect} value={colorSelected}>
                      {colorList.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  }
                  
                </ul>
              </div>
            </div>
            <div className={styles.putWrap}>
            <div className={styles.putTag}>
              <div className={styles.nameDiv}>상품명</div>
              <div className={styles.quantDiv}>수량</div>
              <div className={styles.priceDiv}>가격</div>
            </div>
              {(sizeSelected !== "사이즈 선택") && (colorSelected !== "색상 선택") ? 

              <PutItem id={products[id].id} name={products[id].name} 
              price={products[id].price} size={sizeSelected}
               color={colorSelected} stock={stock} quantity={quantity} onClick={handleClickCounter}/>
               : 
               (stock === 0 ? 
                <div style={{borderTop:'1px solid gray', color:'gray'}} className={styles.putTag}>품절된 상품입니다.</div>
                :<div style={{borderTop:'1px solid gray'}} className={styles.putTag}>담은 상품이 없습니다.</div>
               )}
               
               
               
            </div>
            {(sizeSelected !== "사이즈 선택") && (colorSelected !== "색상 선택") 
            ? <div className={styles.totalPriceDiv}>
            총 상품금액: {2500 + total}원</div>
            : <div className={styles.totalPriceDiv}>총 상품금액: 0원</div>
            }


              {stock === 0 
              ? <div className={styles.btnWrap}>
                  <button style={{color:'white', backgroundColor:'rgb(180, 180, 180)'}} disabled>일시 품절</button>
                  <button style={{color:'gray'}} disabled>일시 품절</button>
                </div>
              : 

                <div className={styles.btnWrap}>
                  <button style={{color:'white', backgroundColor:'navy'}}>바로 구매</button>
                  <Link to="/Cart"><button>장바구니 담기</button></Link>
                </div>
              }

            
              
              
              
              



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