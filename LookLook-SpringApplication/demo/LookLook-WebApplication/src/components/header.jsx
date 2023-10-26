import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryDropdown from "../components/dropdown/categoryDropdown";
import WomanDropdown from "../components/dropdown/womanDropdown";
import ManDropdown from "../components/dropdown/manDropdown";
import OuterDropdown from "../components/dropdown/outerDropdown";
import ShoesDropdown from "../components/dropdown/shoesDropdown";
import FashionDropdown from "../components/dropdown/fashionDropdown";
import Modal from "./modal";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [isCategoryHover, setIsCategoryHover] = useState(false);
  const [isWomanHover, setIsWomanHover] = useState(false);
  const [isManHover, setIsManHover] = useState(false);
  const [isOuterHover, setIsOuterHover] = useState(false);
  const [isShoesHover, setIsShoesHover] = useState(false);
  const [isFashionHover, setIsFashionHover] = useState(false);

  const logoutClick = () => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      sessionStorage.setItem("accessToken", "");
      navigate("/");
    }
    
  }

  const goLogin = () => {
    if(window.confirm("로그인하시겠습니까?")) {
      navigate("/login")
    }
  }

  // useEffect(() => {
  //   {sessionStorage.getItem("accessToken") === "" 
  //   ? setIsLogin(false)
  //   : setIsLogin(true)
  //   }
    
  // }, [])
  
  return (
    <div className={styles.header}>

      {/* {sessionStorage.getItem("accessToken") === "임시토큰" 
      ? 
      <div className={styles.topMenu}>
        {sessionStorage.getItem("accessToken")}
        <h style={{cursor:'pointer'}} onClick={logoutClick}>로그아웃</h>
        <Link to="/cart">
          <h style={{fontWeight: 'bold'}}>장바구니</h>
        </Link>
        <Link to="/myPage/myInfo">
          <h>마이페이지</h>
        </Link>
      </div>
      : */}
      <div className={styles.topMenu}>
        {sessionStorage.getItem("accessToken")} 
        <Link to="/login">
          <h>로그인</h>
        </Link>
        <Link to="/signup">
          <h style={{color: '#227acc'}}>회원가입</h>
        </Link>
        <Link to="/myPage/myInfo">
          <h>마이페이지</h>
        </Link>
        
      </div>
      {/* } */}





      
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
            
        </div>
      </div>
    </div>
  )
}
export default Header;