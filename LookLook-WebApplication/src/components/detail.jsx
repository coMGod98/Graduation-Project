import React from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const {cate} = useParams()
  
  return (
    <h1>테스트{cate}</h1>
  )
}
export default Detail;