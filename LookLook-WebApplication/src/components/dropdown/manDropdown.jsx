import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function ManDropdown() {
  const categorys = [
    {cateID: "man_shirt", cateName: "셔츠"},
    {cateID: "man_knit", cateName: "니트"},
    {cateID: "man_tshirt", cateName: "티셔츠"},
    {cateID: "man_suit", cateName: "정장"},
    {cateID: "man_pants", cateName: "팬츠"},
  ]

  return (
    <div className={styles.dropdownSection}>
      {categorys && categorys.map(cate => (
        <div>
          <Link to={`/manList/${cate.cateID}`}>
            <img src={require(`../../images/man/${cate.cateID}.png`)} alt="outer_item"/>
            <p>{cate.cateName}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ManDropdown;