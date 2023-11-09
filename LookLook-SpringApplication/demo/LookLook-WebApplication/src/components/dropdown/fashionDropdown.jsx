import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function FashionDropdown() {
  const categorys = [
    {cateID: "501", cateName: "가방"},
    {cateID: "502", cateName: "시계"},
    {cateID: "503", cateName: "선글라스/안경"},
    {cateID: "504", cateName: "벨트"},
    {cateID: "505", cateName: "쥬얼리"}
  ]

  return (
      <div className={styles.dropdownSection}>
        {categorys && categorys.map((cate, id) => (
            <div key={id}>
              <Link to={`/fashionList/${cate.cateID}`}>
                <img src={require(`../../images/fashion/${cate.cateID}.png`)} alt="outer_item"/>
                <p>{cate.cateName}</p>
              </Link>
            </div>
        ))}
      </div>
  );
}

export default FashionDropdown;