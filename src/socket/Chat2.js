import React from "react";
import { useLocation } from "react-router-dom";
import send from "send";
import { Box, Button } from "@chakra-ui/react";

function Chat2(props) {
  // 채팅내용
  function sendMsg() {
    // send("/app/hello", {}, JSON.stringify({ name: "테스트" }));
  }
  return (
    <Box>
      <Button onClick={sendMsg}>테스트</Button>
    </Box>
  );
}

export default Chat2;
