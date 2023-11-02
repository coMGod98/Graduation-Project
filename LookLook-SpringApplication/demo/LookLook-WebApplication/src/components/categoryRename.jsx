import React from "react";
function CategoryRename({cate}) {
    //cate는 101, 102, ...
    const renameFunction = () => {
        if (cate === "100") {   //100 여성
            return "여성";
        } else if (cate === "101") {
            return "셔츠/블라우스"
        } else if (cate === "102") {
            return "니트"
        } else if (cate === "103") {
            return "티셔츠"
        } else if (cate === "104") {
            return "팬츠"
        } else if (cate === "105") {
            return "스커트"
        } else if (cate === "106") {
            return "원피스"
        } else if (cate === "200") {  //200 남성
            return "남성"
        } else if (cate === "201") {
            return "셔츠"
        } else if (cate === "202") {
            return "니트"
        } else if (cate === "203") {
            return "티셔츠"
        } else if (cate === "204") {
            return "정장"
        } else if (cate === "205") {
            return "팬츠"
        } else if (cate === "300") {  //300 아우터
            return "아우터"
        } else if (cate === "301") {
            return "패딩"
        } else if (cate === "302") {
            return "가디건"
        } else if (cate === "303") {
            return "집업"
        } else if (cate === "304") {
            return "코트"
        } else if (cate === "305") {
            return "파카"
        } else if (cate === "306") {
            return "자켓"
        } else if (cate === "400") {  //400 신발
            return "신발"
        } else if (cate === "401") {
            return "구두"
        } else if (cate === "402") {
            return "힐"
        } else if (cate === "403") {
            return "플랫슈즈"
        } else if (cate === "404") {
            return "샌들"
        } else if (cate === "405") {
            return "슬리퍼"
        } else if (cate === "406") {
            return "부츠"
        } else if (cate === "500") {  //500 패션소품
            return "패션소품"
        } else if (cate === "501") {
            return "가방"
        } else if (cate === "502") {
            return "시계"
        } else if (cate === "503") {
            return "선글라스/안경"
        } else if (cate === "504") {
            return "벨트"
        } else if (cate === "505") {
            return "쥬얼리"
        } else {
            return null;
        }
    }

    return (
        <>
            {renameFunction()}
        </>
    );
}
export default CategoryRename;