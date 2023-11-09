import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function OuterDropdown() {
  const categorys = [
    {cateID: "301", cateName: "패딩"},
    {cateID: "302", cateName: "가디건"},
    {cateID: "303", cateName: "집업"},
    {cateID: "304", cateName: "코트"},
    {cateID: "305", cateName: "파카"},
    {cateID: "306", cateName: "자켓"}
  ]

  return (
      <div className={styles.dropdownSection}>
        {categorys && categorys.map((cate, id) => (
            <div key={id}>
              <Link to={`/outerList/${cate.cateID}`}>
                <img src={require(`../../images/outer/${cate.cateID}.png`)} alt="outer_item"/>
                <p>{cate.cateName}</p>
              </Link>
            </div>
        ))}

        {/* <div>
        <img src={require("../../images/outer/302.png")} alt="outer2"/>
        <p>가디건</p>
      </div>
      <div>
        <img src={require("../../images/outer/303.png")} alt="outer3"/>
        <p>집업</p>
      </div>
      <div>
        <img src={require("../../images/outer/304.png")} alt="outer4"/>
        <p>코트</p>
      </div>
      <div>
        <img src={require("../../images/outer/305.png")} alt="outer5"/>
        <p>파카</p>
      </div>
      <div>
        <img src={require("../../images/outer/306.png")} alt="outer6"/>
        <p>자켓</p>
      </div> */}

      </div>
  );
}

export default OuterDropdown;