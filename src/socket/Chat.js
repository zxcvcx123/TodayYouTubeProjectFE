import React, { useContext, useEffect, useRef, useState } from "react";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";

function Chat() {
  let stompClient;

  const { token, loginInfo } = useContext(DetectLoginContext);
  const { socket } = useOutletContext();

  const [text, setText] = useState("");
  const [chatId, setChatId] = useState("");
  //const [chat, setChat] = useState([]);
  const [setIdAccess, setSetIdAccess] = useState(false);
  const [connection, setConnection] = useState(true);

  stompClient = useRef();
  const subscription = useRef(null);

  useEffect(() => {
    if (socket === null) {
      reconnect();
    } else {
      getSocket();
    }

    if (token.detectLogin) {
      setSetIdAccess(true);
      setChatId(loginInfo.member_id);
    }
  }, []);

  if (socket !== null) {
    stompClient = socket;
  }

  if (socket === null) {
    return <Spinner />;
  }

  // 만약 redirect가 아닌 url로 직접 이동한거면 다시 연결 시도
  function reconnect() {
    let socket = new SockJS("http://localhost:3000/gs-guide-websocket", null, {
      transports: ["websocket", "xhr-streaming", "xhr-polling"],
    });

    console.log(stompClient.current);

    if (!stompClient.current) {
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, function (frame) {
        console.log("소켓연결 성공: " + frame);
        console.log(stompClient.current);
        console.log(frame);
        unSubscribe();
        subscription.current = stompClient.current.subscribe(
          "/topic/greetings",
          (res) => {
            JSON.parse(res.body);
            console.log(JSON.parse(res._body));
            const json = JSON.parse(res._body);

            if (json.chat !== null) {
              document
                .getElementById("chatArea")
                .insertAdjacentHTML(
                  "beforeend",
                  "<p>" + json.id + ": " + json.chat + "</p>",
                );
            }
          },
        );
      });
    }
  }

  // 채팅내용
  function sendMsg() {
    stompClient.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({ id: chatId, chat: text }),
    });
  }

  // 아이디 등록하기
  function sendId() {
    if (chatId.length > 0) {
      setSetIdAccess(true);
    }
  }

  function disconnectSocket() {
    stompClient.current.disconnect();
    console.log("소켓통신 종료");
    console.log(stompClient.current);
    setSetIdAccess(false);
    setConnection(false);
  }

  // 채팅내용
  function handleTextInput(e) {
    setText(e.target.value);
  }

  // 아이디 입력
  function handleChatId(e) {
    setChatId(e.target.value);
  }

  // 채팅창 가져오기
  function getSocket() {
    unSubscribe();
    subscription.current = stompClient.current.subscribe(
      "/topic/greetings",
      (res) => {
        JSON.parse(res.body);
        console.log(JSON.parse(res._body));
        const json = JSON.parse(res._body);

        if (json.chat !== null) {
          document
            .getElementById("chatArea")
            .insertAdjacentHTML(
              "beforeend",
              "<p>" + json.id + ": " + json.chat + "</p>",
            );
        }

        // =========================================
        // const newContent = JSON.parse(res._body);
        // setContent(newContent);
        // const newChat = [...chat];
        // newChat.push(newContent.chat);
        // setChat(newChat);
        // =========================================

        // return setChat((chatList) => [...chatList, json]);
      },
    );
  }

  // ===== 두번 연결 되니깐 한번은 끊어줌 =====
  function unSubscribe() {
    if (subscription.current !== null) {
      subscription.current.unsubscribe();
    }
  }
  // ========================================

  return (
    <>
      {setIdAccess || (
        <Center>
          <Flex w={"50%"}>
            <Input
              value={chatId}
              onChange={handleChatId}
              placeholder="아이디를 입력해주세요"
            />
            <Button onClick={sendId}>입력</Button>
          </Flex>
        </Center>
      )}
      {setIdAccess && (
        <Center>
          <Box w={"50%"} h={"500px"}>
            <Center>
              <Box
                border={"1px solid black"}
                w={"100%"}
                textAlign={"center"}
                h={"50px"}
              >
                {chatId}님 반갑습니다.
              </Box>
            </Center>

            <Center>
              <Box
                id="chatArea"
                w={"100%"}
                border={"1px solid black"}
                textIndent={"15px"}
                h={"400px"}
                id="chatArea"
              ></Box>
            </Center>

            <Center>
              <Flex w={"100%"} h={"50px"}>
                <Input value={text} onChange={handleTextInput} />
                <Button onClick={sendMsg}>입력</Button>
                <Button onClick={disconnectSocket}>종료</Button>
              </Flex>
            </Center>
          </Box>
        </Center>
      )}
    </>
  );
}

export default Chat;
