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
                uid: uid,
                content: quest,
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log("챗봇 응답:", res);
                console.log("챗봇 응답:", res.choices[0].message.content);
                setAnswer(res.choices[0].message.content);
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