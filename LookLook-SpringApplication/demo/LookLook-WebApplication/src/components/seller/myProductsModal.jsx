import React, {useState} from "react";
import styles from "./myProductsModal.module.css"
import CategorySelecter from "./categorySelecter";


function MyProductsModal({isOpen, closeModal}) {


  const [values, setValues] = useState({
    modName: "", modPrice: "", modStock: "", modGender: "",
    modDetail: "", modImage: "", modDetailImage: ""
  })
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const [sizeField, setSizeField] = useState(['']);   //선택 사이즈
  const [colorField, setColorField] = useState(['']); //선택 색상
  const [highCategory, setHighCategory] = useState(['']); //선택 상위 카테고리
  const [lowCategory, setLowCategory] = useState(['']); //선택 하위 카테고리

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
  }
  const handleColorChange = (idx, e) => {
    const tmp = [...colorField];

    tmp[idx] = e.target.value;
    setColorField(tmp);
  }
  const addSizeField = () => {
    if (sizeField.length === 4) {
      alert('최대 4개까지 설정할 수 있습니다.');
      return;
    }
    const tmp = [...sizeField, ''];
    setSizeField(tmp);
  }
  const addColorField = () => {
    if (colorField.length === 4) {
      alert('최대 4개까지 설정할 수 있습니다.');
      return;
    }
    const tmp = [...colorField, ''];
    setColorField(tmp);
  }
  const resetSizeField = () => {
    setSizeField(['']);
  }
  const resetColorField = () => {
    setColorField(['']);
  }


  const modSubmit = e => {
    e.preventDefault();
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
                <div className={styles.modTag}>상품명</div>
                <div className={styles.modInput}>
                  <input name="modName" onChange={handleChange} maxLength="30" />
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>가격</div>
                <div className={styles.modInput}>
                  <input name="modPrice" onChange={handleChange} placeholder="숫자만 입력해주세요" pattern="\d*" />
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>재고량</div>
                <div className={styles.modInput}>
                  <input name="modStock" onChange={handleChange}min={1} max={999} pattern="\d*" defaultValue={1} type="number"/>
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>성별</div>
                <div className={styles.modInput}>
                  <input onChange={handleChange} type="radio" name="modGender" id="male" value="male" required ={styles.radioInput} />남
                  <input onChange={handleChange} type="radio" name="modGender" id="female" value="female" required
                         className={styles.radioInput} style={{marginLeft:'15px'}}/>여
                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>상품 설명</div>
                <div className={styles.modInput}>
                  <textarea name="modDetail" onChange={handleChange} maxLength="999"/>
                </div>
              </div>

            </div>


            <div className={styles.rightSection}>

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
              <div className={styles.modWrap}>
                <div className={styles.modTag}>사이즈</div>
                <div className={styles.modInput}>

                  {sizeField.map((field, idx) => (
                      <input style={{marginBottom:'3px'}}
                             name="modSize" onChange={(e) => handleSizeChange(idx, e)}/>
                  ))}
                  <button type="button"
                          onClick={addSizeField}>옵션 추가</button>
                  <button type="button"
                          onClick={resetSizeField}>초기화</button>

                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>색상</div>
                <div className={styles.modInput}>

                  {colorField.map((field, idx) => (
                      <input  style={{marginBottom:'3px'}}
                              name="modColor" onChange={(e) => handleColorChange(idx, e)}/>
                  ))}
                  <button type="button"
                          onClick={addColorField}>옵션 추가</button>
                  <button type="button"
                          onClick={resetColorField}>초기화</button>

                </div>
              </div>
              <div className={styles.modWrap}>
                <div className={styles.modTag}>카테고리 설정</div>
                <div className={styles.modInput}>

                  <CategorySelecter highFunction={highFunction} lowFunction={lowFunction}/>
                  <div>선택 카테고리: {highCategory} > {lowCategory}</div>

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