import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function ManDropdown() {
  const categorys = [
    {cateID: "201", cateName: "셔츠"},
    {cateID: "202", cateName: "니트"},
    {cateID: "203", cateName: "티셔츠"},
    {cateID: "204", cateName: "정장"},
    {cateID: "205", cateName: "팬츠"},
  ]

  return (
      <div className={styles.dropdownSection}>
        {categorys && categorys.map((cate, id) => (
            <div key={id}>
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