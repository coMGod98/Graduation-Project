import React from "react";
import { useParams } from "react-router-dom";

function Detail({list, name, age}) {
  const {cate} = useParams()
  
  return (
    <div>
      {list.map((item, id) => 
        <div key={id}>
          {item.name}{item.age}
        </div>
      )}

      {name}{age}
    </div>
  )
}
export default Detail;