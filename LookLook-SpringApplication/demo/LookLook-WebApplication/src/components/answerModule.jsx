import React, {useEffect, useState} from "react";

function AnswerModule({quest}) {

    const [answer, setAnswer] = useState("");
    const uid = sessionStorage.getItem("uid");

    useEffect(() => {
        fetch("/chat/ask", {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uid: uid,        //특정 사용자 질문을 db에 저장하는 데 쓰임
                content: quest,
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === 500) {
                    console.log("챗봇 응답:", res);
                    setAnswer("죄송합니다. 챗봇 답변을 불러오는데 실패했습니다.");
                } else {
                    console.log("챗봇 응답:", res);
                    console.log("챗봇 응답:", res.choices[0].message.content);
                    setAnswer(res.choices[0].message.content);
                }

            })
            .catch(err => {
                console.log("챗봇 오류:", err);
            })



    }, []);

    return (
        <div style={{lineHeight:'18px'}}>{answer}</div>
    )
}
export default AnswerModule;