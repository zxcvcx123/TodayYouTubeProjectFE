import React, { useEffect, useRef, useState } from "react";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";

function Chat(props) {
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기
  const [content, setContent] = useState("");
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState("");
  const [chat, setChat] = useState("");
  const [setIdAccess, setSetIdAccess] = useState(false);
  const [connection, setConnection] = useState(true);

  const [testVal, setTestVal] = useState(0);

  // http://localhost:3000/gs-guide-websocket 소켓 주소
  function connect() {
    let socket = new SockJS("http://localhost:3000/gs-guide-websocket");
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, function (frame) {
      console.log("소켓연결 성공: " + frame);
      console.log(stompClient.current);
      stompClient.current.subscribe("/topic/greetings", (res) => {
        JSON.parse(res.body);
        console.log(res);
        console.log(res._body);
        console.log(JSON.parse(res._body));
        setContent(JSON.parse(res._body));
      });
    });
  }

  // 채팅내용
  function sendMsg() {
    stompClient.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({ id: chatId, chat: text }),
    });
    //send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
  }

  // 아이디 등록하기
  function sendId() {
    stompClient.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({ id: chatId }),
    });
    //send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
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

  useEffect(() => {
    connect();
  }, [connection]);

  // 채팅내용
  function handleTextInput(e) {
    setText(e.target.value);
  }

  // 아이디 입력
  function handleChatId(e) {
    setChatId(e.target.value);
  }

  function testBtn() {
    stompClient.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({ id: chatId, chat: text }),
    });
    //send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
    if (chatId.length > 0) {
      setSetIdAccess(true);
    }
  }

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
        <>
          <Center>
            <Box>{content.id}님 반갑습니다.</Box>
          </Center>
          {chat.length >= 0 && (
            <Center>
              <Box id="chatArea">{content.chat}</Box>
            </Center>
          )}
          <Center>
            <Flex w={"50%"}>
              <Input value={text} onChange={handleTextInput} />
              <Button onClick={sendMsg}>입력</Button>
              <Button onClick={disconnectSocket}>종료</Button>
            </Flex>
          </Center>
        </>
      )}
    </>
  );
}

export default Chat;
