import React from "react";
import styles from "./smallCategoryDropdown.module.css";
import { Link } from "react-router-dom";

function ShoesDropdown() {
  const categorys = [
    {cateID: "formal_shoes", cateName: "구두"},
    {cateID: "heels", cateName: "힐"},
    {cateID: "plat_shoes", cateName: "플랫슈즈"},
    {cateID: "sandals", cateName: "샌들"},
    {cateID: "slipper", cateName: "슬리퍼"},
    {cateID: "boots", cateName: "부츠"}
  ]

  return (
    <div className={styles.dropdownSection}>
      {categorys && categorys.map(cate => (
        <div>
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