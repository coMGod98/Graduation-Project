import React, {useEffect, useState} from "react";

function AnswerModule({quest}) {

    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if (quest === "안녕") {
            setAnswer("111");
        } else {
            setAnswer("222");
        }
    }, []);

    return (
        <div>{answer}</div>
    )
}
export default AnswerModule;