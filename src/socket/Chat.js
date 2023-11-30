import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Input, Text } from "@chakra-ui/react";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();

  // webSockt을 담는 변수,
  // 컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
  const ws = useRef(null);

  const msgBox = chatt.map((item, idx) => (
    <Box key={idx}>
      <Text>{item.name}</Text>
      <Text>[{item.data}]</Text>
      <Text>{item.msg}</Text>
    </Box>
  ));

  useEffect(() => {
    if (socketData !== undefined) {
      const tempDate = chatt.concat(socketData);
      console.log(tempDate);
      setChatt(tempDate);
    }
  }, [socketData]);

  /* ===== webSocket 영역 시작 ===== */

  const onText = (event) => {
    console.log(event.target.value);
    setMsg(event.target.vlaue);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("ws://localhost:8080/socket/chatt");

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  });

  const send = useCallback(() => {
    if (!chkLog) {
      if (name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus();
        return;
      }
      webSocketLogin();
      setChkLog(true);
    }
    if (msg !== "") {
      const data = {
        name,
        msg,
        data: new Date().toLocaleDateString(),
      }; // 전송데이터 (JSON)

      const temp = JSON.stringify(data);

      if (ws.current.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
        };
      } else {
        ws.current.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("msg").focus();
      return;
    }
    setMsg("");
  });
  /* ===== webSocket 영역 끝 ===== */

  return (
    <>
      <Box id="chatt">
        <h1 id="title">WebSocket Chatting</h1>
        <br />
        <Box>{msgBox}</Box>
      </Box>
      <Input
        disabled={chkLog}
        placeholder="이름을 입력하세요."
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Box>
        <textarea
          id="msg"
          value={msg}
          onChange={onText}
          onKeyDown={(event) => {
            if (event.keycode === 13) {
              send();
            }
          }}
        ></textarea>
        <Input tpye={"button"} value={"전송"} id="btnSend" onClick={send} />
      </Box>
    </>
  );
};

export default Chat;
