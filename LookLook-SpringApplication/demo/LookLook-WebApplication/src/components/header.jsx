import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryDropdown from "../components/dropdown/categoryDropdown";
import WomanDropdown from "../components/dropdown/womanDropdown";
import ManDropdown from "../components/dropdown/manDropdown";
import OuterDropdown from "../components/dropdown/outerDropdown";
import ShoesDropdown from "../components/dropdown/shoesDropdown";
import FashionDropdown from "../components/dropdown/fashionDropdown";
import { Navigate } from "react-router-dom";

function Header() {

  const accessToken = localStorage.getItem("accessToken");
  const [isStorageNull, setIsStorageNull] = useState(true);


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
      localStorage.removeItem("accessToken");
      navigate("/");
      console.log("로그아웃 후 세션스토리지 값: ", localStorage.getItem("accessToken"))
    }
  }

  const goLogin = () => {
    if(window.confirm("로그인하시겠습니까?")) {
      navigate("/login")
    }
  }
  const clickAvatarBtn = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === null) {
      alert("로그인 후 이용하실 수 있습니다.");
    } else {
      navigate("/AvatarPage");
    }
  }

  return (
    <div className={styles.header}>

      {accessToken === null
      ?
          <div className={styles.topMenu}>
            <Link to="/login">
              <h1>로그인</h1>
            </Link>
            <Link to="/signup">
              <h1 style={{color: '#227acc'}}>회원가입</h1>
            </Link>
            <Link to="/myPage/myInfo">
              <h1>마이페이지</h1>
            </Link>

          </div>
      :
          <div className={styles.topMenu}>
            <h1 style={{cursor:'pointer'}} onClick={logoutClick}>로그아웃</h1>
            <Link to="/cart">
              <h1 style={{fontWeight: 'bold'}}>장바구니</h1>
            </Link>
            <Link to="/myPage/myInfo">
              <h1>마이페이지</h1>
            </Link>
            <Link to="/seller/myProducts">
              <h1 style={{color:'navy'}}>판매자</h1>
            </Link>
          </div>

      }






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
            <h1 className={styles.allCategory}>카테고리</h1>
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

            <button
                onClick={clickAvatarBtn}
              className={styles.avatarBtn}>
              캐릭터 커스텀
            </button>
            
        </div>
      </div>
    </div>
  )
}
export default Header;