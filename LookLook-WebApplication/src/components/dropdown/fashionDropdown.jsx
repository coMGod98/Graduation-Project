import React from "react";
import styles from "./smallCategoryDropdown.module.css";

function FashionDropdown() {

  return (
    <div className={styles.dropdownSection}>
      <div>
        <img src={require("../../images/fashion/bag.png")} alt="fashion1"/>
        <p>가방</p>
      </div>
      <div>
        <img src={require("../../images/fashion/watch.png")} alt="fashion2"/>
        <p>시계</p>
      </div>
      <div>
        <img src={require("../../images/fashion/glasses.png")} alt="fashion3"/>
        <p>선글라스/안경</p>
      </div>
      <div>
        <img src={require("../../images/fashion/belt.png")} alt="fashion4"/>
        <p>벨트</p>
      </div>
      <div>
        <img src={require("../../images/fashion/jewely.png")} alt="fashion5"/>
        <p>쥬얼리</p>
      </div>

    </div>
  );
}

export default FashionDropdown;