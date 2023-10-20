import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function OuterDropdown() {
  const categorys = [
    {cateID: "padding", cateName: "패딩"},
    {cateID: "cardigan", cateName: "가디건"},
    {cateID: "zipup", cateName: "집업"},
    {cateID: "coat", cateName: "코트"},
    {cateID: "parka", cateName: "파카"},
    {cateID: "jacket", cateName: "자켓"}
  ]

  return (
    <div className={styles.dropdownSection}>
      {categorys && categorys.map(cate => (
        <div>
          <Link to={`/outerList/${cate.cateID}`}>
            <img src={require(`../../images/outer/${cate.cateID}.png`)} alt="outer_item"/>
            <p>{cate.cateName}</p>
          </Link>
        </div>
      ))}

      {/* <div>
        <img src={require("../../images/outer/cardigan.png")} alt="outer2"/>
        <p>가디건</p>
      </div>
      <div>
        <img src={require("../../images/outer/zipup.png")} alt="outer3"/>
        <p>집업</p>
      </div>
      <div>
        <img src={require("../../images/outer/coat.png")} alt="outer4"/>
        <p>코트</p>
      </div>
      <div>
        <img src={require("../../images/outer/parka.png")} alt="outer5"/>
        <p>파카</p>
      </div>
      <div>
        <img src={require("../../images/outer/jacket.png")} alt="outer6"/>
        <p>자켓</p>
      </div> */}

    </div>
  );
}

export default OuterDropdown;