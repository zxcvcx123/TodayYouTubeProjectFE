import { useEffect, useRef, useState } from "react";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

function SocketExample() {
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기

  // http://localhost:3000/gs-guide-websocket 소켓 주소
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState("");
  const [chat, setChat] = useState([]);
  const [setIdAccess, setSetIdAccess] = useState(false);
  const [connection, setConnection] = useState(true);
  const [like, setLike] = useState(0);

  //localhost:3000/gs-guide-websocket 소켓 주소

  // 소켓 연결하기
  function connect() {
    let socket = new SockJS("http://localhost:3000/gs-guide-websocket", null, {
      transports: ["websocket", "xhr-streaming", "xhr-polling"],
    });
    stompClient.current = Stomp.over(socket);

    // 헤더안에 정보 넣을 수 있음 보통 사용자 정보 넣어 보냄
    stompClient.current.connect(
      {
        header: {
          user: "홍길동",
        },
      },
      function (frame) {
        console.log("소켓연결 성공: " + frame);
        console.log(stompClient.current);

        // 다른 클라이언트 들에게 값 보여주기
        // 해당 주소로 데이터 넘어오고 Spirng 안걸치면 상대방이 보낸 값이 바로 해당 주소로 데이터 넘어감
        stompClient.current.subscribe("/topic/greetings", (res) => {
          JSON.parse(res.body);
          console.log(JSON.parse(res._body));
          const json = JSON.parse(res._body);
          setLike(json.testlike);
          if (json.chat !== null) {
            document
              .getElementById("chatArea")
              .insertAdjacentHTML("beforeend", "<p>" + json.chat + "</p>");
          }

          // 값 계속 넣어주기
          // return setChat((chatList) => [...chatList, json]);
        });
      },
    );
  }

  // 전송하기
  function send() {
    // destination: 소켓 통신할 주소
    // body: JSON.stringify 안에 데이터 넣어주기
    stompClient.current.publish({
      destination: "/topic/greetings",
      body: JSON.stringify({ id: chatId, chat: text }),
    });
  }

  // 소켓 통신 종료
  function disconnectSocket() {
    stompClient.current.disconnect();
    console.log("소켓통신 종료");
    console.log(stompClient.current);

    // 통신상태 관리
    setConnection(false);
  }

  function testBtn() {
    stompClient.current.publish({
      destination: "/app/like",
      body: JSON.stringify({ addLike: true }),
    });
  }

  useEffect(() => {
    connect();
  }, [connection]);

  return;
}

export default SocketExample;
