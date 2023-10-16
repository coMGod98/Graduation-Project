import React from "react";
import styles from "./smallCategoryDropdown.module.css";

function ShoesDropdown() {

  return (
    <div className={styles.dropdownSection}>
      <div>
        <img src={require("../../images/shoes/formal_shoes.png")} alt="shoes1"/>
        <p>구두</p>
      </div>
      <div>
        <img src={require("../../images/shoes/heels.png")} alt="shoes2"/>
        <p>힐</p>
      </div>
      <div>
        <img src={require("../../images/shoes/plat_shoes.png")} alt="shoes3"/>
        <p>플랫슈즈</p>
      </div>
      <div>
        <img src={require("../../images/shoes/sandals.png")} alt="shoes4"/>
        <p>샌들</p>
      </div>
      <div>
        <img src={require("../../images/shoes/slipper.png")} alt="shoes5"/>
        <p>슬리퍼</p>
      </div>
      <div>
        <img src={require("../../images/shoes/boots.png")} alt="shoes6"/>
        <p>부츠</p>
      </div>

    </div>
  );
}

export default ShoesDropdown;