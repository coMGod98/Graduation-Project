import React from "react";
import styles from "./banner.module.css";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className={styles.bannerSection}>
      <Link to="/">
        <img src={require("../images/main_banner.png")} alt="logo"/>
      </Link>
    </div>
  )
}
export default Banner;