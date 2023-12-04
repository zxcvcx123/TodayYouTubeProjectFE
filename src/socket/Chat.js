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
  //const [chat, setChat] = useState([]);
  const [setIdAccess, setSetIdAccess] = useState(false);
  const [connection, setConnection] = useState(true);

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

        // === 두번 눌러야 나온걸 선생님이 해결해준 코드 ===
        const newContent = JSON.parse(res._body);
        setContent(newContent);
        // const newChat = [...chat];
        // newChat.push(newContent.chat);
        // setChat(newChat);
        // =========================================
        if (newContent.chat !== null) {
          document
            .getElementById("chatArea")
            .insertAdjacentHTML("beforeend", "<p>" + newContent.chat + "</p>");
        }
      });
    });
  }

  // 채팅내용
  function sendMsg() {
    stompClient.current.publish({
      destination: "/topic/greetings",
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
    //setChat([]);
  }, [connection]);

  // 채팅내용
  function handleTextInput(e) {
    setText(e.target.value);
  }

  // 아이디 입력
  function handleChatId(e) {
    setChatId(e.target.value);
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
        <Center>
          <Box w={"50%"} h={"500px"}>
            <Center>
              <Box
                border={"1px solid black"}
                w={"100%"}
                textAlign={"center"}
                h={"50px"}
              >
                {content.id}님 반갑습니다.
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
