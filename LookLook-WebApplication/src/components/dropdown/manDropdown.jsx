import React from "react";
import styles from "./smallCategoryDropdown.module.css";

function ManDropdown() {

  return (
    <div className={styles.dropdownSection}>
      <div>
        <img src={require("../../images/man/man_shirt.png")} alt="man1"/>
        <p>셔츠</p>
      </div>
      <div>
        <img src={require("../../images/man/man_knit.png")} alt="man2"/>
        <p>니트</p>
      </div>
      <div>
        <img src={require("../../images/man/man_tshirt.png")} alt="man3"/>
        <p>티셔츠</p>
      </div>
      <div>
        <img src={require("../../images/man/man_suit.png")} alt="man4"/>
        <p>정장</p>
      </div>
      <div>
        <img src={require("../../images/man/man_pants.png")} alt="man5"/>
        <p>팬츠</p>
      </div>

    </div>
  );
}

export default ManDropdown;