import React, { createContext, useEffect, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

function Socket({ children }) {
  // 소켓 연결
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기

  function connect() {
    console.log(stompClient.current);

    // 이미 연결되어 있으면 한번 더 연결시키는거 방지
    // 추천 연결방식
    stompClient.current = Stomp.over(function () {
      return new SockJS("http://localhost:3000/ws", "ws", {
        transports: ["websocket", "xhr-streaming", "xhr-polling"],
      });
    });

    stompClient.current.connect(
      {},







  useEffect(() => {
    connect();
  }, []);

  return (
    <SocketContext.Provider value={stompClient}>
      {children}
    </SocketContext.Provider>
  );
}

export const SocketContext = createContext(null);
export default Socket;
