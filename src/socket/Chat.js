import React, { useContext, useEffect, useRef, useState } from "react";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import { Box, Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import { useOutletContext } from "react-router-dom";

function Chat() {
  const { socket, test } = useOutletContext();
  let stompClient = socket;

  const [text, setText] = useState("");
  const [chatId, setChatId] = useState("");
  //const [chat, setChat] = useState([]);
  const [setIdAccess, setSetIdAccess] = useState(false);
  const [connection, setConnection] = useState(true);

  console.log(socket);
  console.log(test);

  // 채팅내용
  function sendMsg() {
    stompClient.current.publish({
      destination: "/app/hello",
      body: JSON.stringify({ id: chatId, chat: text }),
    });
  }

  // 아이디 등록하기
  function sendId() {
    // stompClient.current.publish({
    //   destination: "/app/hello",
    //   body: JSON.stringify({ id: chatId }),
    // });

    if (chatId.length > 0) {
      setSetIdAccess(true);
    }
  }

  function disconnectSocket() {
    // stompClient.current.disconnect();
    // console.log("소켓통신 종료");
    // console.log(stompClient.current);
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
