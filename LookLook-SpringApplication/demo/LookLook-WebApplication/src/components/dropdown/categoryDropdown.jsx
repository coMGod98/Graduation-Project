import React from "react";
import styles from "./categoryDropdown.module.css";
import { Link } from "react-router-dom";

function CategoryDropdown() {

  const categorysWoman = [
    {cateID: "101", cateName: "셔츠/블라우스"},
    {cateID: "102", cateName: "니트"},
    {cateID: "103", cateName: "티셔츠"},
    {cateID: "104", cateName: "팬츠"},
    {cateID: "105", cateName: "스커트"},
    {cateID: "106", cateName: "원피스"}
  ]
  const categorysMan = [
    {cateID: "201", cateName: "셔츠"},
    {cateID: "202", cateName: "니트"},
    {cateID: "203", cateName: "티셔츠"},
    {cateID: "204", cateName: "정장"},
    {cateID: "205", cateName: "팬츠"},
  ]
  const categorysOuter = [
    {cateID: "301", cateName: "패딩"},
    {cateID: "302", cateName: "가디건"},
    {cateID: "303", cateName: "집업"},
    {cateID: "304", cateName: "코트"},
    {cateID: "305", cateName: "파카"},
    {cateID: "306", cateName: "자켓"}
  ]
  const categorysShoes = [
    {cateID: "401", cateName: "구두"},
    {cateID: "402", cateName: "힐"},
    {cateID: "403", cateName: "플랫슈즈"},
    {cateID: "404", cateName: "샌들"},
    {cateID: "405", cateName: "슬리퍼"},
    {cateID: "406", cateName: "부츠"}
  ]
  const categorysFashion = [
    {cateID: "501", cateName: "가방"},
    {cateID: "502", cateName: "시계"},
    {cateID: "503", cateName: "선글라스/안경"},
    {cateID: "504", cateName: "벨트"},
    {cateID: "505", cateName: "쥬얼리"}
  ]

  return (
      <div className={styles.dropdownSection}>

        <div>
          <p className={styles.cateTag}>여성</p>
          {categorysWoman && categorysWoman.map((cate, id) => (
              <Link key={id} to={`/womanList/${cate.cateID}`}>
                <p>{cate.cateName}</p>
              </Link>
          ))}
        </div>
        <div>
          <p className={styles.cateTag}>남성</p>
          {categorysMan && categorysMan.map((cate, id) => (
              <Link key={id} to={`/manList/${cate.cateID}`}>
                <p>{cate.cateName}</p>
              </Link>
          ))}
        </div>
        <div>
          <p className={styles.cateTag}>아우터</p>
          {categorysOuter && categorysOuter.map((cate, id) => (
              <Link key={id} to={`/outerList/${cate.cateID}`}>
                <p>{cate.cateName}</p>
              </Link>
          ))}
        </div>
        <div>
          <p className={styles.cateTag}>신발</p>
          {categorysShoes && categorysShoes.map((cate, id) => (
              <Link key={id} to={`/shoesList/${cate.cateID}`}>
                <p>{cate.cateName}</p>
              </Link>
          ))}
        </div>
        <div>
          <p className={styles.cateTag}>패션소품</p>
          {categorysFashion && categorysFashion.map((cate, id) => (
              <Link key={id} to={`/fashionList/${cate.cateID}`}>
                <p>{cate.cateName}</p>
              </Link>
          ))}
        </div>

      </div>
  );
}

export default CategoryDropdown;