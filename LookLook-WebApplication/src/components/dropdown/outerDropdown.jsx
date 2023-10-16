import React from "react";
import styles from "./smallCategoryDropdown.module.css";

function OuterDropdown() {

  return (
    <div className={styles.dropdownSection}>
      <div>
        <img src={require("../../images/outer/padding.png")} alt="outer1"/>
        <p>패딩</p>
      </div>
      <div>
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
      </div>

    </div>
  );
}

export default OuterDropdown;