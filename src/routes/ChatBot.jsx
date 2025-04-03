import React, { useState, useEffect, useRef } from "react";
import Button from "../components/Button";
import { chatbotAPI } from "../api/chatbotApi";
import { errMessage } from "../utils/errMessage";
import Loading from "../components/Loading";
import ReactMarkdown from "react-markdown";

function ChatBot() {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const host = VITE_BASE_URL.replace("http://", "").replace("http://", "");

  const messageListRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [disable, setDisable] = useState(false);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [chatRoomID, setChatRoomID] = useState(null);
  const [chatSocket, setChatSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatRoomName, setChatRoomName] = useState(null);

  // 챗봇 메시지 전송 함수
  const handleSendChatbotMessage = async () => {
    setDisable(true);
    // await chatbotAPI
    //   .post("", {
    //     question: newMessage,
    //   })
    //   .then((response) => {
    //     setMessages((prevMessages) => [
    //       ...prevMessages,
    //       { id: Date.now(), text: response.data.answer, sender: "chatbot" },
    //     ]);
    //   })
    //   .catch((error) => {
    //     // console.log(error);
    //     const errorMessage = errMessage(error);
    //     alert(errorMessage);
    //   })
    //   .finally(() => {
    //     setDisable(false);
    //   });
    if (chatSocket && newMessage.trim()) {
      chatSocket.send(JSON.stringify({ message: newMessage }));
      setMessages((prev) => [...prev, { sender: "user", message: newMessage }]);
      setNewMessage("");
    }
  };

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      setNewMessage(""); // 메시지 전송 전에 입력창을 먼저 비웁니다

      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { id: Date.now(), text: trimmedMessage, sender: "user" },
      // ]);
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
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex w-full ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className="max-w-[50%] bg-white border-2 border-gray-300 rounded-md p-2 break-words"
              style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
            >
              <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
          </div>
        ))}
        {disable ? <Loading text="맛P.T가 답변을 생성중이에요!" /> : null}
      </div>
    );
  };

  // 채팅방 목록 가져오기
  const getChatRoomList = () => {
    chatbotAPI
      .get("room/")
      .then((response) => {
        // console.log(response);
        setChatRoomList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 채팅방 생성
  const createChatRoom = () => {
    const chatRoomName = document.getElementById("chat-room-name").value.trim();
    console.log(chatRoomName);
    chatbotAPI
      .post("room/", { name: chatRoomName })
      .then((response) => {
        console.log(response);
        setChatRoomList((prev) => {
          return [response.data, ...prev];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectChatRoom = (roomID) => {
    setChatRoomID(roomID);
    const chatroom = chatRoomList.find((chatroom) => chatroom.id === roomID);
    setChatRoomName(chatroom.name);
    connectWebSocket(roomID);
  };

  // 웹소켓 연결
  const connectWebSocket = (roomID) => {
    // 기존 연결이 있으면 닫기
    setIsConnected(false);
    if (chatSocket && chatSocket.readyState == WebSocket.OPEN) {
      chatSocket.close();
    }

    // 프로토콜 설정
    const wsProtocol =
      window.location.protocol === "https" ? "wss://" : "ws://";

    // 웹소켓 연결
    const newSocket = new WebSocket(
      `${wsProtocol}localhost:8000/ws/chatbot/${roomID}/`
    );

    // 연결 열림
    newSocket.onopen = () => {
      setIsConnected(true);
      console.log("웹소켓 연결됨");
    };

    // 연결 닫힘
    newSocket.onclose = () => {
      setIsConnected(false);
      console.log("웹소켓 연결 끊김");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);

      // 채팅 기록 처리
      if (data.type === "chat_history") {
        setMessages(data.messages || []);
      } else if (data.message_type === "response") {
        setMessages((prev) => [...prev, data]);
        setDisable(false);
      }
    };

    newSocket.onerror = (error) => {
      console.log("웹소켓 오류 :", error);
    };

    setChatSocket(newSocket);
  };

  // // 메시지 추가
  // function addMessage(message, isUser) {
  //   const messagesDiv = document.getElementById("chatMessages");
  //   const messageDiv = document.createElement("div");
  //   messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;

  //   // 메시지 내용 설정
  //   messageDiv.textContent = isUser ? message : `🤖: ${message}`;

  //   messagesDiv.appendChild(messageDiv);
  //   messagesDiv.scrollTop = messagesDiv.scrollHeight;
  // }

  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
    getChatRoomList();
  }, [messages]); // 메시지가 변경될 때마다

  return (
    <div className="chat-container flex justify-center min-h-screen pt-20">
      {/* 채팅방 목록 */}
      <div className="border-2 border-gray-300 bg-gray-100 min-h-[85vh] max-h-[85vh] rounded-md m-5 p-5">
        <div className="flex justify-between pb-3 ">채팅방 목록</div>
        <div className="flex">
          <input
            id="chat-room-name"
            placeholder="새 채팅방 이름"
            className="border-2 border-gray-300 rounded-md p-1"
          />
          <Button buttonName="방 만들기" onClick={createChatRoom} />
        </div>
        <div>
          {chatRoomList.map((chatroom) => (
            <div
              key={chatroom.id}
              className="p-1 hover:scale-110 hover:shadow"
              onClick={() => {
                selectChatRoom(chatroom.id);
              }}
            >
              {chatroom.name}
            </div>
          ))}
        </div>
      </div>

      {/* 채팅 */}
      <div className="flex flex-col w-full min-h-[85vh] max-h-[85vh] border-2 border-gray-300 bg-gray-100 rounded-md m-5 p-5">
        <div className="flex justify-between pb-3 ">
          <div>
            {/* 채팅방 이름 */}
            {chatRoomID ? (
              <div>{chatRoomName}</div>
            ) : (
              <div>채팅방을 선택해주세요</div>
            )}
          </div>
          <div className="bg-white text-sm rounded-full text-gray-400 p-1">
            연결상태:{isConnected ? " ✅연결됨" : " ❌연결끊김"}
          </div>
        </div>
        <hr className="border-gray-400" />
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
