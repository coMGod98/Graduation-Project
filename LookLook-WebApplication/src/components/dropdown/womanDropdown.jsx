import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function WomanDropdown() {

  return (
    <div className={styles.dropdownSection}>
      <div>
        <img src={require("../../images/woman/woman_shirt_blouse.png")} alt="woman1"/>
        <p>셔츠/블라우스</p>
      </div>
      <div>
        <img src={require("../../images/woman/woman_knit.png")} alt="woman2"/>
        <p>니트</p>
      </div>
      <div>
        <img src={require("../../images/woman/woman_tshirt.png")} alt="woman3"/>
        <p>티셔츠</p>
      </div>
      <div>
        <img src={require("../../images/woman/woman_pants.png")} alt="woman4"/>
        <p>팬츠</p>
      </div>
      <div>
        <img src={require("../../images/woman/woman_skirt.png")} alt="woman5"/>
        <p>스커트</p>
      </div>
      <div>
        <img src={require("../../images/woman/woman_onepiece.png")} alt="woman6"/>
        <p>원피스</p>
      </div>

    </div>
  );
}

export default WomanDropdown;