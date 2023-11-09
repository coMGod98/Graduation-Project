import React, {useEffect, useState} from "react";
import styles from "./myProductsModal.module.css"
import CategorySelecter from "./categorySelecter";
import {useNavigate} from "react-router-dom";

import CategoryRename from "../categoryRename";
import CategoryRenameHigh from "../categoryRenameHigh";
function MyProductsModal({mpid, mprice, mstock, mpgender, mitemDetail, msize
                           ,mcolor, mcategory, isOpen, closeModal}) {

  const [inPrice, setInPrice] = useState(mprice);
  const [inStock, setInStock] = useState(mstock);
  const [inPGender, setInPGender] = useState(mpgender);
  const [inItemDetail, setInItemDetail] = useState(mitemDetail);
  const [inSize, setInSize] = useState(msize);
  const [inColor, setInColor] = useState(mcolor);
  const [inCategory, setInCategory] = useState(mcategory);


  const navigate = useNavigate();

  const [values, setValues] = useState({
    modName: "", modPrice: mprice, modStock: mstock, modGender: mpgender,
    modDetail: mitemDetail, modImage: "", modDetailImage: ""
  })
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const [sizeField, setSizeField] = useState(msize);   //선택 사이즈
  const [colorField, setColorField] = useState(mcolor); //선택 색상
  const [highCategory, setHighCategory] = useState(''); //선택 상위 카테고리
  const [lowCategory, setLowCategory] = useState(mcategory); //선택 하위 카테고리

  const highFunction = (sltHigh) => {
    if (lowCategory !== '') {
      setLowCategory('');
    }
    setHighCategory(sltHigh);
  }
  const lowFunction = (sltLow) => {
    setLowCategory(sltLow);
  }

  const handleSizeChange = (idx, e) => {
    const tmp = [...sizeField];
    tmp[idx] = e.target.value;
    setSizeField(tmp);

    const tmp2 = [...inSize];
    tmp2[idx] = e.target.value;
    setInSize(tmp2);
  }
  const handleColorChange = (idx, e) => {
    const tmp = [...colorField];
    tmp[idx] = e.target.value;
    setColorField(tmp);

    const tmp2 = [...inColor];
    tmp2[idx] = e.target.value;
    setInColor(tmp2);
  }
  const addSizeField = () => {
    if (sizeField.length === 3) {
      alert('최대 3개까지 설정할 수 있습니다.');
      return;
    }
    const tmp = [...sizeField, ''];
    setSizeField(tmp);
  }
  const addColorField = () => {
    if (colorField.length === 3) {
      alert('최대 3개까지 설정할 수 있습니다.');
      return;
    }
    const tmp = [...colorField, ''];
    setColorField(tmp);
  }
  const resetSizeField = () => {
    setSizeField(['']);
    setInSize([''])
  }
  const resetColorField = () => {
    setColorField(['']);
    setInColor([''])
  }


  useEffect(() => {
    if (Number(mcategory) > 100 && Number(mcategory) < 200) {
      setHighCategory("여성");
    } else if (Number(mcategory) > 200 && Number(mcategory) < 300) {
      setHighCategory("남성");
    } else if (Number(mcategory) > 300 && Number(mcategory) < 400) {
      setHighCategory("아우터");
    } else if (Number(mcategory) > 400 && Number(mcategory) < 500) {
      setHighCategory("신발");
    } else if (Number(mcategory) > 500 && Number(mcategory) < 600) {
      setHighCategory("패션소품");
    } else {
      return null;
    }
  }, []);

  const modSubmit = e => {
    const accessToken = sessionStorage.getItem("accessToken");
    e.preventDefault();
    if (lowCategory === '') {
      alert("카테고리를 선택해주세요")
      return null;
    } else {

      fetch(`/seller/item/${mpid}`, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          price: Number(values.modPrice),
          stock: Number(values.modStock),
          pgender: values.modGender,
          itemDetail: values.modDetail,
          size: sizeField,
          color: colorField,
          category: lowCategory,
        })
      })
          .then(res => {
            if (res.status === 200) {
              console.log(res);
              alert("수정이 완료되었습니다!");
              closeModal();
            } else {
              alert("수정 실패");
            }
          })
          .catch(err => {
            console.log("오류: ", err);
          })
    }

    console.log(values);
    console.log(colorField);
    console.log(sizeField);
    console.log(highCategory);
    console.log(lowCategory);
  }

  return (
      <div className={styles.back} style={{display:isOpen ? "block" : "none"}}>
        <div className={styles.front}>

          <form onSubmit={modSubmit}>
            <div className={styles.leftSection}>

              <div className={styles.modWrap}>
                <div className={styles.modTag}>가격</div>
                <div className={styles.modInput}>
                  <input name="modPrice" onChange={handleChange} defaultValue={inPrice} placeholder="숫자만 입력해주세요" pattern="\d*" required />
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>재고량</div>
                <div className={styles.modInput}>
                  <input name="modStock" onChange={handleChange} min={1} max={999} pattern="\d*" defaultValue={inStock} type="number" required />
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>성별</div>
                {mpgender === "MALE"
                    ?
                    <div className={styles.modInput}>
                      <input onChange={handleChange} defaultChecked="checked" type="radio" name="modGender" id="MALE" value="MALE" required />남
                      <input onChange={handleChange} type="radio" name="modGender" id="FEMALE" value="FEMALE" required
                             style={{marginLeft:'15px'}}/>여
                    </div>
                    :
                    <div className={styles.modInput}>
                      <input onChange={handleChange} type="radio" name="modGender" id="MALE" value="MALE" required />남
                      <input onChange={handleChange} defaultChecked="checked" type="radio" name="modGender" id="FEMALE" value="FEMALE" required
                             style={{marginLeft:'15px'}}/>여
                    </div>
                }

              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>상품 설명</div>
                <div className={styles.modInput}>
                  <textarea name="modDetail" onChange={handleChange} defaultValue={inItemDetail} maxLength="999" required />
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>대표 이미지</div>
                <div className={styles.modInput}>
                  <input onChange={handleChange} name="modImage" type="file" accept="image/*" />
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>상세 이미지</div>
                <div className={styles.modInput}>
                  <input onChange={handleChange} name="modDetailImage" type="file" accept="image/*" />
                </div>
              </div>

            </div>


            <div className={styles.rightSection}>


              <div className={styles.modWrap}>
                <div className={styles.modTag}>사이즈</div>
                <div className={styles.modInput}>

                  {sizeField.map((field, idx) => (
                      <input style={{marginBottom:'3px'}} required value={inSize[idx]}
                             name="modSize" onChange={(e) => handleSizeChange(idx, e)}/>
                  ))}
                  <div>
                    <button type="button" style={{marginRight:'5px', backgroundColor:'aliceblue'}}
                            onClick={addSizeField}>옵션 추가</button>
                    <button type="button" style={{backgroundColor:'white'}}
                            onClick={resetSizeField}>초기화</button>

                  </div>

                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>색상</div>
                <div className={styles.modInput}>

                  {colorField.map((field, idx) => (
                      <input  style={{marginBottom:'3px'}} required value={inColor[idx]}
                              name="modColor" onChange={(e) => handleColorChange(idx, e)}/>
                  ))}
                  <div>
                    <button type="button" style={{marginRight:'5px', backgroundColor:'aliceblue'}}
                            onClick={addColorField}>옵션 추가</button>
                    <button type="button" style={{backgroundColor:'white'}}
                            onClick={resetColorField}>초기화</button>
                  </div>


                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.cateInput}>
                  <CategorySelecter highFunction={highFunction} lowFunction={lowFunction}/>
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.cateInput}>
                  <div>선택 카테고리: {highCategory} > <CategoryRename cate={lowCategory}/></div>
                </div>
              </div>
            </div>
            <div className={styles.btnWrap}>
              <button type="submit">수정</button>
              <button type="button" onClick={closeModal}>취소</button>
            </div>


          </form>









        </div>
      </div>
  );
}

export default MyProductsModal;