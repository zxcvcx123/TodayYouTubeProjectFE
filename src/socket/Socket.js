import React, { createContext, useEffect, useRef, useState } from "react";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

function Socket({ children }) {
  // 소켓 연결
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기

  // 채팅
  const [chatId, setChatId] = useState("");
  const [chat, setChat] = useState([]);

  // 좋아요
  const [countLike, setCountLike] = useState(null);
  const [like, setLike] = useState(null);

  useEffect(() => {
    connect();
  }, []);

  function connect() {
    console.log(stompClient.current);

    // 추천 연결방식
    stompClient.current = Stomp.over(function () {
      return new SockJS("http://localhost:3000/ws", "ws", {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
      });
    });

    // 연결
    if (stompClient.current.connected === false) {
      stompClient.current.connect({}, () => {
        chatSocket(); // 채팅
        boardLikeSocket(); // 좋아요
      });
    }
  }

  // 채팅
  const chatSocket = () => {
    console.log("채팅연결 성공");
    stompClient.current.subscribe("/topic/greetings", (res) => {
      const json = JSON.parse(res.body);
      setChatId(json.id);
      const newChat = [...chat];
      newChat.push(json.chat);
      setChat(newChat);
    });
  };

  // 게시판 좋아요 실시간
  const boardLikeSocket = () => {
    console.log("BoardLike에서 소켓연결");
    stompClient.current.subscribe("/topic/like", (res) => {
      console.log(res.body);
      const data = JSON.parse(res.body);
      setCountLike(data.countlike);
    });

    stompClient.current.subscribe(
      "/queue/like/" + localStorage.getItem("memberInfo"),
      (res1) => {
        console.log(res1.body);
        const data1 = JSON.parse(res1.body);
        setLike(data1.like);
      },
    );
  };

  return (
    <SocketContext.Provider
      value={{
        stompClient,
        chat,
        chatId,
        countLike,
        setCountLike,
        like,
        setLike,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const SocketContext = createContext(null);
export default Socket;
