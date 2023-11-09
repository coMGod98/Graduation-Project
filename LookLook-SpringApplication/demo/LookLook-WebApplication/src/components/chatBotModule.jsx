import React, {Component} from "react";
import {useState} from "react";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";
import botIcon from "../images/looklook_chatbot.png";
import styles from "./chatBotModule.module.css"

import Tmp from "./answerModule";
import AnswerModule from "./answerModule";

class Answer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uInput: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { uInput } = steps;

        this.setState({ uInput });
    }

    render() {
        const { uInput } = this.state;
        return (
            <div style={{ width: '100%' }}>
                <div><AnswerModule quest={uInput.value} /></div>
            </div>
        );
    }
}
function ChatBotModule() {

    const [userMessage, setUserMessage] = useState("");
    const [botMessage, setBotMessage] = useState("(문의에 대한 답변)");

    const tempFunction = () => {
        return "(함수응답)";
    }

    const steps = [
        {
            id: 1,
            message: '안녕하세요 LOOKLOOK 챗봇입니다!😄',
            trigger: 2,
        },
        {
            id: 2,
            message: '무엇을 도와드릴까요?',
            trigger: 'uInput',
        },
        {
            id: 'uInput',
            user: true,
            trigger: 3,
        },
        {
            id: 3,
            component: <Answer />,
            asMessage: true,
            trigger: 4,
        },
        {
            id: 4,
            message: "또 무엇을 도와드릴까요?",
            trigger: 'uInput',
            delay: 5000,
        }
    ]

    const theme = {
        background: 'white',  //전체 배경색
        fontFamily: 'Helvetica Neue', //글꼴
        headerBgColor: 'linear-gradient(110deg, #2e276e 0%, #31478c 74%)',  //헤더 배경색
        headerFontColor: 'white', //헤더 글 색
        headerFontSize: '17px', //헤더 글 크기
        botBubbleColor: '#e1f3ff', //말풍선 배경 색
        botFontColor: 'black',  //말풍선 글 색
        userBubbleColor: '#fff7dc', //사용자 말풍선 배경색
        userFontColor: 'black', //사용자 말풍선 글 색
    }

    const [isOpenChatbot, setIsOpenChatbot] = useState(false);
    const [chatbotPosition, setChatbotPosition] = useState(-520);

    const accessToken = sessionStorage.getItem("accessToken");

    const openBtnClick = () => {
        if (accessToken === null || accessToken === undefined) {
            alert("로그인 후 이용하실 수 있습니다.");
        } else {
            if (isOpenChatbot === false) {
                setIsOpenChatbot(true);
                setChatbotPosition(0);
            } else {
                setIsOpenChatbot(false);
                setChatbotPosition(-520);
            }
        }
    }

    return (

        <div>
            <div className={styles.openBtn}>
                {isOpenChatbot === false
                    ? <button
                        onClick={openBtnClick}>
                        <img src={botIcon} alt="chatbot_icon" />
                    </button>
                    : <button style={{boxShadow:'1px 2px 4px 1px rgba(0, 0, 0, 0.2), 3px 5px 15px 1px rgba(0, 0, 0, 0.2) inset'}}
                              onClick={openBtnClick}>
                        <img src={botIcon} alt="chatbot_icon" />
                    </button>
                }
            </div>

            <div className={styles.bot} style={{bottom:`${chatbotPosition}px`}}>
                <ThemeProvider theme={theme} >
                    <ChatBot steps={steps}
                             headerTitle="&nbsp;LOOKLOOK 챗봇"
                             placeholder={"문의사항을 입력해주세요."}
                             botAvatar={botIcon}
                             bubbleStyle={{lineHeight:'18px'}}
                             hideUserAvatar={true}
                    />
                </ThemeProvider>
            </div>
        </div>
    );
}

export default ChatBotModule;