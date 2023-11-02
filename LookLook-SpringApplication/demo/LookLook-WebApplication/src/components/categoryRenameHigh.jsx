import React from "react";
function CategoryRenameHigh({cate}) {
    //cate는 101, 102, ...
    const renameFunction = () => {
        if (cate === "100") {   //100 여성
            return "여성";
        } else if (cate === "101") {
            return "여성"
        } else if (cate === "102") {
            return "여성"
        } else if (cate === "103") {
            return "여성"
        } else if (cate === "104") {
            return "여성"
        } else if (cate === "105") {
            return "여성"
        } else if (cate === "106") {
            return "여성"
        } else if (cate === "200") {  //200 남성
            return "남성"
        } else if (cate === "201") {
            return "남성"
        } else if (cate === "202") {
            return "남성"
        } else if (cate === "203") {
            return "남성"
        } else if (cate === "204") {
            return "남성"
        } else if (cate === "205") {
            return "남성"
        } else if (cate === "300") {  //300 아우터
            return "아우터"
        } else if (cate === "301") {
            return "아우터"
        } else if (cate === "302") {
            return "아우터"
        } else if (cate === "303") {
            return "아우터"
        } else if (cate === "304") {
            return "아우터"
        } else if (cate === "305") {
            return "아우터"
        } else if (cate === "306") {
            return "아우터"
        } else if (cate === "400") {  //400 신발
            return "신발"
        } else if (cate === "401") {
            return "신발"
        } else if (cate === "402") {
            return "신발"
        } else if (cate === "403") {
            return "신발"
        } else if (cate === "404") {
            return "신발"
        } else if (cate === "405") {
            return "신발"
        } else if (cate === "406") {
            return "신발"
        } else if (cate === "500") {  //500 패션소품
            return "패션소품"
        } else if (cate === "501") {
            return "패션소품"
        } else if (cate === "502") {
            return "패션소품"
        } else if (cate === "503") {
            return "패션소품"
        } else if (cate === "504") {
            return "패션소품"
        } else if (cate === "505") {
            return "패션소품"
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
export default CategoryRenameHigh;