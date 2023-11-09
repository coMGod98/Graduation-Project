import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function WomanDropdown() {
  const categorys = [
    {cateID: "101", cateName: "셔츠/블라우스"},
    {cateID: "102", cateName: "니트"},
    {cateID: "103", cateName: "티셔츠"},
    {cateID: "104", cateName: "팬츠"},
    {cateID: "105", cateName: "스커트"},
    {cateID: "106", cateName: "원피스"}
  ]

  return (
      <div className={styles.dropdownSection}>
        {categorys && categorys.map((cate, id) => (
            <div key={id}>
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