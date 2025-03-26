import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import { chatbotAPI } from "../api/chatbotApi";
import { errMessage } from "../utils/errMessage";
import Loading from "../components/Loading";
import ReactMarkdown from "react-markdown";

function ChatBot() {
  const messageListRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [disable, setDisable] = useState(false);

  // 챗봇 메시지 전송 함수
  const handleSendChatbotMessage = async () => {
    setDisable(true);
    await chatbotAPI
      .post("", {
        question: newMessage,
      })
      .then((response) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: response.data.answer, sender: "chatbot" },
        ]);
      })
      .catch((error) => {
        // console.log(error);
        const errorMessage = errMessage(error);
        alert(errorMessage);
      })
      .finally(() => {
        setDisable(false);
      });
  };

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      setNewMessage(""); // 메시지 전송 전에 입력창을 먼저 비웁니다

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: trimmedMessage, sender: "user" },
      ]);
    }
    handleSendChatbotMessage();
  };

  // 메시지 입력 변경 함수
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Enter 키로 메시지 전송
  const handleKeyUp = async (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      await handleSendMessage();
    }
  };

  // 메시지 목록 컴포넌트
  const MessageList = () => {
    return (
      <div className="message-list flex flex-col space-y-2 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex w-full ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className="max-w-[50%] bg-white border-2 border-gray-300 rounded-md p-2 break-words"
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {disable ? <Loading text="맛P.T가 답변을 생성중이에요!" /> : null}
      </div>
    );
  };

  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]); // 메시지가 변경될 때마다

  return (
    <div className="chat-container flex justify-center items-center min-h-screen pt-20">
      <div className="flex flex-col w-full min-h-[75vh] max-h-[75vh] border-2 border-gray-300 bg-gray-100 rounded-md m-5 p-5">
        <div
          className="message-list flex-grow overflow-y-auto p-2 "
          ref={messageListRef}
        >
          {" "}
          {/* 메시지 리스트에 스크롤 추가 */}
          <MessageList />
        </div>
        <div className="input-container flex justify-center items-center">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            onKeyUp={disable ? null : handleKeyUp}
            placeholder={disable ? "챗봇 응답 중..." : "메시지를 입력하세요..."}
            className="w-full p-1 border border-gray-300 rounded-md"
            disabled={disable}
          />
          <Button
            buttonName="submit"
            onClick={handleSendMessage}
            disabled={disable}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
