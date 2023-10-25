import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { Link, useParams } from "react-router-dom";
import CategoryDropdown from "../components/dropdown/categoryDropdown";
import WomanDropdown from "../components/dropdown/womanDropdown";
import ManDropdown from "../components/dropdown/manDropdown";
import OuterDropdown from "../components/dropdown/outerDropdown";
import ShoesDropdown from "../components/dropdown/shoesDropdown";
import FashionDropdown from "../components/dropdown/fashionDropdown";
import Modal from "./modal";
import Swal from "sweetalert2";


function Header() {
  // const handleButtonClick = () => { 
  //   Swal.fire('모달 테스트');
  // };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isCategoryHover, setIsCategoryHover] = useState(false);
  const [isWomanHover, setIsWomanHover] = useState(false);
  const [isManHover, setIsManHover] = useState(false);
  const [isOuterHover, setIsOuterHover] = useState(false);
  const [isShoesHover, setIsShoesHover] = useState(false);
  const [isFashionHover, setIsFashionHover] = useState(false);
  
  return (
    <div className={styles.header}>
      <div className={styles.topMenu}>
        <Link to="/login">
          <h>로그인</h>
        </Link>
        <Link to="/signup">
          <h style={{color: '#227acc'}}>회원가입</h>
        </Link>
        <Link to="/myPage/myInfo">
          <h>마이페이지</h>
        </Link>

          {/* <Link to="/login">
          <h>로그아웃</h>
        </Link>
        <Link to="/signup">
          <h style={{fontWeight: 'bold'}}>장바구니</h>
        </Link>
        <Link to="/product">
          <h>마이페이지</h>
        </Link> */}
      </div>
      <div className={styles.logoSection}>
        <Link to="/">
          <img src={require("../images/looklook_logo.png")} alt="logo"/>
        </Link>
      </div>
      <div className={styles.inputSection}>
        <input type="text" placeholder="상품을 검색해보세요!" />
        <Link to="/searchResult">
          <button className={styles.searchBtn}>
            <img src={require("../images/search_white.png")} alt="search_button" />
          </button>
        </Link>
      </div>
      <div className={styles.menuWrap}>
        <div className={styles.menu}>
          {/* 전체 카테고리 */}
          <div className={styles.allCategoryWrap}
            onMouseOver={() => setIsCategoryHover(true)}
            onMouseOut={() => setIsCategoryHover(false)}>
            <img src={require("../images/hamburger_icon.png")} alt="전체카테고리" />
            <h className={styles.allCategory}>카테고리</h>
            {isCategoryHover && <CategoryDropdown />}
          </div>

          <div className={styles.categoryWrap}>
            <span onMouseOver={() => setIsWomanHover(true)}
            onMouseOut={() => setIsWomanHover(false)}>여성
            {isWomanHover && <WomanDropdown />}</span>

            <span onMouseOver={() => setIsManHover(true)}
            onMouseOut={() => setIsManHover(false)}>남성
            {isManHover && <ManDropdown />}</span>

            <span onMouseOver={() => setIsOuterHover(true)}
            onMouseOut={() => setIsOuterHover(false)}>아우터
            {isOuterHover && <OuterDropdown />}</span>

            <span onMouseOver={() => setIsShoesHover(true)}
            onMouseOut={() => setIsShoesHover(false)}>신발
            {isShoesHover && <ShoesDropdown />}</span>

            <span onMouseOver={() => setIsFashionHover(true)}
            onMouseOut={() => setIsFashionHover(false)}>패션소품
            {isFashionHover && <FashionDropdown />}</span>
          </div>

          <Link to="/avatarPage">
            <button
              className={styles.avatarBtn}>
              캐릭터 커스텀
            </button>
          </Link>
            
            
            {/* <div>
              <button onClick={openModal}>모달 열기</button>
              <Modal isOpen={isModalOpen} content="yes" closeModal={closeModal} />
            </div> */}
            
            {/* <button onClick={handleButtonClick}>
              클릭!
            </button> */}
            



        </div>
      </div>
    </div>
  )
}
export default Header;