import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function WomanDropdown() {
  const categorys = [
    {cateID: "woman_shirt_blouse", cateName: "셔츠/블라우스"},
    {cateID: "woman_knit", cateName: "니트"},
    {cateID: "woman_tshirt", cateName: "티셔츠"},
    {cateID: "woman_pants", cateName: "팬츠"},
    {cateID: "woman_skirt", cateName: "스커트"},
    {cateID: "woman_onepiece", cateName: "원피스"}
  ]

  return (
    <div className={styles.dropdownSection}>
      {categorys && categorys.map(cate => (
        <div>
          <Link to={`/womanList/${cate.cateID}`}>
            <img src={require(`../../images/woman/${cate.cateID}.png`)} alt="outer_item"/>
            <p>{cate.cateName}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default WomanDropdown;