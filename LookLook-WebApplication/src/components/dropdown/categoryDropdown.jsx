import React from "react";
import styles from "./categoryDropdown.module.css";
import { Link } from "react-router-dom";

function CategoryDropdown() {

  return (
    <div className={styles.dropdownSection}>
      <div>
        <p className={styles.cateTag}>여성</p><p>셔츠/블라우스</p>
        <p>니트</p><p>티셔츠</p>
        <p>팬츠</p><p>스커트</p>
        <p>원피스</p>
      </div>
      <div>
        <p className={styles.cateTag}>남성</p><p>셔츠</p>
        <p>니트</p><p>티셔츠</p>
        <p>정장</p><p>팬츠</p>
      </div>
      <div>
        <p className={styles.cateTag}>아우터</p>
        <Link to="/productShow"><p>패딩</p></Link>
        <p>가디건</p><p>집업</p>
        <p>코트</p><p>파카</p>
        <p>자켓</p>
      </div>
      <div>
        <p className={styles.cateTag}>신발</p><p>구두</p>
        <p>힐</p><p>플랫슈즈</p>
        <p>샌들</p><p>슬리퍼</p>
        <p>부츠</p>
      </div>
      <div style={{borderRight:'0px'}}>
        <p className={styles.cateTag}>패션소품</p><p>가방</p>
        <p>시계</p><p>선글라스/안경</p>
        <p>벨트</p><p>쥬얼리</p>
      </div>

    </div>
  );
}

export default CategoryDropdown;