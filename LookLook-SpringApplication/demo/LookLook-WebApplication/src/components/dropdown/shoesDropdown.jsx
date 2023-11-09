import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function ShoesDropdown() {
  const categorys = [
    {cateID: "401", cateName: "구두"},
    {cateID: "402", cateName: "힐"},
    {cateID: "403", cateName: "플랫슈즈"},
    {cateID: "404", cateName: "샌들"},
    {cateID: "405", cateName: "슬리퍼"},
    {cateID: "406", cateName: "부츠"}
  ]

  return (
      <div className={styles.dropdownSection}>
        {categorys && categorys.map((cate, id) => (
            <div key={id}>
              <Link to={`/shoesList/${cate.cateID}`}>
                <img src={require(`../../images/shoes/${cate.cateID}.png`)} alt="outer_item"/>
                <p>{cate.cateName}</p>
              </Link>
            </div>
        ))}
      </div>
  );
}

export default ShoesDropdown;