import React from "react";
import styles from "./categoryDropdown.module.css";
import { Link } from "react-router-dom";

function CategoryDropdown() {

  const categorysWoman = [
    {cateID: "woman_shirt_blouse", cateName: "셔츠/블라우스"},
    {cateID: "woman_knit", cateName: "니트"},
    {cateID: "woman_tshirt", cateName: "티셔츠"},
    {cateID: "woman_pants", cateName: "팬츠"},
    {cateID: "woman_skirt", cateName: "스커트"},
    {cateID: "woman_onepiece", cateName: "원피스"}
  ]
  const categorysMan = [
    {cateID: "man_shirt", cateName: "셔츠"},
    {cateID: "man_knit", cateName: "니트"},
    {cateID: "man_tshirt", cateName: "티셔츠"},
    {cateID: "man_suit", cateName: "정장"},
    {cateID: "man_pants", cateName: "팬츠"},
  ]
  const categorysOuter = [
    {cateID: "padding", cateName: "패딩"},
    {cateID: "cardigan", cateName: "가디건"},
    {cateID: "zipup", cateName: "집업"},
    {cateID: "coat", cateName: "코트"},
    {cateID: "parka", cateName: "파카"},
    {cateID: "jacket", cateName: "자켓"}
  ]
  const categorysShoes = [
    {cateID: "formal_shoes", cateName: "구두"},
    {cateID: "heels", cateName: "힐"},
    {cateID: "plat_shoes", cateName: "플랫슈즈"},
    {cateID: "sandals", cateName: "샌들"},
    {cateID: "slipper", cateName: "슬리퍼"},
    {cateID: "boots", cateName: "부츠"}
  ]
  const categorysFashion = [
    {cateID: "bag", cateName: "가방"},
    {cateID: "watch", cateName: "시계"},
    {cateID: "glasses", cateName: "선글라스/안경"},
    {cateID: "belt", cateName: "벨트"},
    {cateID: "jewely", cateName: "쥬얼리"}
  ]

  return (
    <div className={styles.dropdownSection}>

      <div>
        <p className={styles.cateTag}>여성</p>
        {categorysWoman && categorysWoman.map(cate => (
          <Link to={`/womanList/${cate.cateID}`}>
              <p>{cate.cateName}</p>
          </Link>
        ))}
      </div>
      <div>
        <p className={styles.cateTag}>남성</p>
        {categorysMan && categorysMan.map(cate => (
          <Link to={`/manList/${cate.cateID}`}>
              <p>{cate.cateName}</p>
          </Link>
        ))}
      </div>
      <div>
        <p className={styles.cateTag}>아우터</p>
        {categorysOuter && categorysOuter.map(cate => (
          <Link to={`/outerList/${cate.cateID}`}>
              <p>{cate.cateName}</p>
          </Link>
        ))}
      </div>
      <div>
        <p className={styles.cateTag}>신발</p>
        {categorysShoes && categorysShoes.map(cate => (
          <Link to={`/shoesList/${cate.cateID}`}>
              <p>{cate.cateName}</p>
          </Link>
        ))}
      </div>
      <div>
        <p className={styles.cateTag}>패션소품</p>
        {categorysFashion && categorysFashion.map(cate => (
          <Link to={`/fashionList/${cate.cateID}`}>
              <p>{cate.cateName}</p>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default CategoryDropdown;