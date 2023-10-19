import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function FashionDropdown() {
  const categorys = [
    {cateID: "bag", cateName: "가방"},
    {cateID: "watch", cateName: "시계"},
    {cateID: "glasses", cateName: "선글라스/안경"},
    {cateID: "belt", cateName: "벨트"},
    {cateID: "jewely", cateName: "쥬얼리"}
  ]

  return (
    <div className={styles.dropdownSection}>
      {categorys && categorys.map(cate => (
        <div>
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