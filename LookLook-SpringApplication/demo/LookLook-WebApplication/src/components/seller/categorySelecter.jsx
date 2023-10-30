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
                        <button type="button" onClick={() => props.lowFunction("셔츠/블라우스")}>셔츠/블라우스</button>
                        <button type="button" onClick={() => props.lowFunction("니트")}>니트</button>
                        <button type="button" onClick={() => props.lowFunction("티셔츠")}>티셔츠</button>
                        <button type="button" onClick={() => props.lowFunction("팬츠")}>팬츠</button>
                        <button type="button" onClick={() => props.lowFunction("스커트")}>스커트</button>
                        <button type="button" onClick={() => props.lowFunction("원피스")}>원피스</button>
                    </div>

                </div>
                : (sltCate === "남성"
                    ?
                    <div>
                        <div className={styles.cateWrap}>
                            <button type="button" onClick={() => props.lowFunction("셔츠")}>셔츠</button>
                            <button type="button" onClick={() => props.lowFunction("니트")}>니트</button>
                            <button type="button" onClick={() => props.lowFunction("티셔츠")}>티셔츠</button>
                            <button type="button" onClick={() => props.lowFunction("정장")}>정장</button>
                            <button type="button" onClick={() => props.lowFunction("팬츠")}>팬츠</button>
                        </div>

                    </div>
                    : (sltCate === "아우터"
                        ?
                        <div>
                            <div className={styles.cateWrap}>
                                <button type="button" onClick={() => props.lowFunction("패딩")}>패딩</button>
                                <button type="button" onClick={() => props.lowFunction("가디건")}>가디건</button>
                                <button type="button" onClick={() => props.lowFunction("집업")}>집업</button>
                                <button type="button" onClick={() => props.lowFunction("코트")}>코트</button>
                                <button type="button" onClick={() => props.lowFunction("파카")}>파카</button>
                                <button type="button" onClick={() => props.lowFunction("자켓")}>자켓</button>
                            </div>

                        </div>
                        : (sltCate ==="신발"
                            ?
                            <div>
                                <div className={styles.cateWrap}>
                                    <button type="button" onClick={() => props.lowFunction("구두")}>구두</button>
                                    <button type="button" onClick={() => props.lowFunction("힐")}>힐</button>
                                    <button type="button" onClick={() => props.lowFunction("플랫슈즈")}>플랫슈즈</button>
                                    <button type="button" onClick={() => props.lowFunction("샌들")}>샌들</button>
                                    <button type="button" onClick={() => props.lowFunction("슬리퍼")}>슬리퍼</button>
                                    <button type="button" onClick={() => props.lowFunction("부츠")}>부츠</button>
                                </div>

                            </div>
                            : (sltCate === "패션소품"
                                ?
                                <div>
                                    <div className={styles.cateWrap}>
                                        <button type="button" onClick={() => props.lowFunction("가방")}>가방</button>
                                        <button type="button" onClick={() => props.lowFunction("시계")}>시계</button>
                                        <button type="button" onClick={() => props.lowFunction("선글라스/안경")}>선글라스/안경</button>
                                        <button type="button" onClick={() => props.lowFunction("벨트")}>벨트</button>
                                        <button type="button" onClick={() => props.lowFunction("쥬얼리")}>쥬얼리</button>
                                    </div>

                                </div>
                                : <div>카테고리를 선택해주세요</div>
                            )
                        )
                    )
                )
            }





        </div>
    );


}

export default CategorySelecter;