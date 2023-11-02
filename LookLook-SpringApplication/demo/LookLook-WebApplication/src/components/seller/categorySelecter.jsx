import React, {useState} from "react";
import styles from "./categorySelecter.module.css"
function CategorySelecter(props) {

    const [sltCate, setSltCate] = useState("");
    const [sltSmallCate, setSltSmallCate] = useState("");

    const highClick = (e) => {
        props.highFunction(e.target.name);
        setSltCate(e.target.name);
    }

    return (
        <div>
            <div>
                <p>카테고리 선택</p>
                <div className={styles.cateWrap}>
                    <button type="button" name="여성" onClick={highClick}>여성</button>
                    <button type="button" name="남성" onClick={highClick}>남성</button>
                    <button type="button" name="아우터" onClick={highClick}>아우터</button>
                    <button type="button" name="신발" onClick={highClick}>신발</button>
                    <button type="button" name="패션소품" onClick={highClick}>패션소품</button>
                </div>
            </div>


            {sltCate === "여성"
                ?
                <div>
                    <div className={styles.cateWrap}>
                        <button type="button" onClick={() => props.lowFunction("101")}>셔츠/블라우스</button>
                        <button type="button" onClick={() => props.lowFunction("102")}>니트</button>
                        <button type="button" onClick={() => props.lowFunction("103")}>티셔츠</button>
                        <button type="button" onClick={() => props.lowFunction("104")}>팬츠</button>
                        <button type="button" onClick={() => props.lowFunction("105")}>스커트</button>
                        <button type="button" onClick={() => props.lowFunction("106")}>원피스</button>
                    </div>

                </div>
                : (sltCate === "남성"
                        ?
                        <div>
                            <div className={styles.cateWrap}>
                                <button type="button" onClick={() => props.lowFunction("201")}>셔츠</button>
                                <button type="button" onClick={() => props.lowFunction("202")}>니트</button>
                                <button type="button" onClick={() => props.lowFunction("203")}>티셔츠</button>
                                <button type="button" onClick={() => props.lowFunction("204")}>정장</button>
                                <button type="button" onClick={() => props.lowFunction("205")}>팬츠</button>
                            </div>

                        </div>
                        : (sltCate === "아우터"
                                ?
                                <div>
                                    <div className={styles.cateWrap}>
                                        <button type="button" onClick={() => props.lowFunction("301")}>패딩</button>
                                        <button type="button" onClick={() => props.lowFunction("302")}>가디건</button>
                                        <button type="button" onClick={() => props.lowFunction("303")}>집업</button>
                                        <button type="button" onClick={() => props.lowFunction("304")}>코트</button>
                                        <button type="button" onClick={() => props.lowFunction("305")}>파카</button>
                                        <button type="button" onClick={() => props.lowFunction("306")}>자켓</button>
                                    </div>

                                </div>
                                : (sltCate ==="신발"
                                        ?
                                        <div>
                                            <div className={styles.cateWrap}>
                                                <button type="button" onClick={() => props.lowFunction("401")}>구두</button>
                                                <button type="button" onClick={() => props.lowFunction("402")}>힐</button>
                                                <button type="button" onClick={() => props.lowFunction("403")}>플랫슈즈</button>
                                                <button type="button" onClick={() => props.lowFunction("404")}>샌들</button>
                                                <button type="button" onClick={() => props.lowFunction("405")}>슬리퍼</button>
                                                <button type="button" onClick={() => props.lowFunction("406")}>부츠</button>
                                            </div>

                                        </div>
                                        : (sltCate === "패션소품"
                                                ?
                                                <div>
                                                    <div className={styles.cateWrap}>
                                                        <button type="button" onClick={() => props.lowFunction("501")}>가방</button>
                                                        <button type="button" onClick={() => props.lowFunction("502")}>시계</button>
                                                        <button type="button" onClick={() => props.lowFunction("503")}>선글라스/안경</button>
                                                        <button type="button" onClick={() => props.lowFunction("504")}>벨트</button>
                                                        <button type="button" onClick={() => props.lowFunction("505")}>쥬얼리</button>
                                                    </div>

                                                </div>
                                                : <div style={{color:'grey'}}>카테고리를 선택해주세요.</div>
                                        )
                                )
                        )
                )
            }





        </div>
    );


}

export default CategorySelecter;