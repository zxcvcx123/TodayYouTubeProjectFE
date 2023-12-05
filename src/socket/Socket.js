// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import * as SockJS from "sockjs-client";
// import * as StompJS from "@stomp/stompjs";
// import { useParams } from "react-router-dom";
// import { Stomp } from "@stomp/stompjs";
// import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
// import Chat from "./Chat";
// import { HomeLayout } from "../layout/Homelayout";
// import * as stompClient from "immer";
//
// function Socket({ children }) {
//   const stompClient = useRef(); // useRef로 connect()가 안끊기게하기
//
//   // http://localhost:3000/gs-guide-websocket 소켓 주소
//   const [text, setText] = useState("");
//   const [chatId, setChatId] = useState("");
//   const [chat, setChat] = useState([]);
//   const [setIdAccess, setSetIdAccess] = useState(false);
//   const [connection, setConnection] = useState(true);
//   const [like, setLike] = useState(0);
//
//   //localhost:3000/gs-guide-websocket 소켓 주소
// function connect() {
//   let socket = new SockJS("http://localhost:3000/gs-guide-websocket", null, {
//     transports: ["websocket", "xhr-streaming", "xhr-polling"],
//   });
//
//   stompClient.current = Stomp.over(socket);
//   stompClient.current.connect(
//     {
//       header: {
//         user: "홍길동",
//       },
//     },
//     function (frame) {
//       console.log("소켓연결 성공: " + frame);
//       console.log(stompClient.current);
//
//       stompClient.current.subscribe("/topic/greetings", (res) => {
//         JSON.parse(res.body);
//         console.log(JSON.parse(res._body));
//         const json = JSON.parse(res._body);
//         setLike(json.testlike);
//         if (json.chat !== null) {
//           document
//             .getElementById("chatArea")
//             .insertAdjacentHTML("beforeend", "<p>" + json.chat + "</p>");
//         }
//
//         // =========================================
//         // const newContent = JSON.parse(res._body);
//         // setContent(newContent);
//         // const newChat = [...chat];
//         // newChat.push(newContent.chat);
//         // setChat(newChat);
//         // =========================================
//
//         // return setChat((chatList) => [...chatList, json]);
//       });
//     },
//   );
// }
//
//   // 채팅내용
//   function sendMsg() {
//     stompClient.current.publish({
//       destination: "/topic/greetings",
//       body: JSON.stringify({ id: chatId, chat: text }),
//     });
//     //send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
//   }
//
//   // 아이디 등록하기
//   function sendId() {
//     // stompClient.current.publish({
//     //   destination: "/app/hello",
//     //   body: JSON.stringify({ id: chatId }),
//     // });
//     //send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
//     if (chatId.length > 0) {
//       setSetIdAccess(true);
//     }
//   }
//
//   function disconnectSocket() {
//     stompClient.current.disconnect();
//     console.log("소켓통신 종료");
//     console.log(stompClient.current);
//     setSetIdAccess(false);
//     setConnection(false);
//   }
//
//   function testBtn() {
//     stompClient.current.publish({
//       destination: "/app/like",
//       body: JSON.stringify({ addLike: true }),
//     });
//   }
//
//   useEffect(() => {
//     connect();
//   }, [connection]);
//
//   // 채팅내용
//   function handleTextInput(e) {
//     setText(e.target.value);
//   }
//
//   // 아이디 입력
//   function handleChatId(e) {
//     setChatId(e.target.value);
//   }
//
//   return (
//     <SocketContext.Provider
//       value={{
//         stompClient,
//         text,
//         setText,
//         chatId,
//         setChatId,
//         chat,
//         setChat,
//         setIdAccess,
//         setSetIdAccess,
//         like,
//         setLike,
//         sendId,
//         sendMsg,
//         handleChatId,
//         handleTextInput,
//         disconnectSocket,
//         testBtn,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// }
//
// export default Socket;
// export const SocketContext = createContext(null);
