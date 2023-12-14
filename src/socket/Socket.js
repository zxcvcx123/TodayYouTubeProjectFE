import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Stomp } from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Spinner } from "@chakra-ui/react";
import { DetectLoginContext } from "../component/LoginProvider";

function Socket({ children }) {
  // 로그인 유저 정보 받아오기
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);


  // Stomp JS: https://stomp-js.github.io/stomp-websocket/codo/extra/docs-src/Usage.md.html#toc_5
  // Stomp JS: https://stomp-js.github.io/api-docs/latest/index.html

  // 소켓 연결
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기

  // 소켓연결상태 관리
  const [IsConnected, setIsConnected] = useState(false);

  // 채팅
  const [chatId, setChatId] = useState("");
  const [chat, setChat] = useState([]);

  // 좋아요
  const [countLike, setCountLike] = useState(null);
  const [like, setLike] = useState(null);

  // 알람
  const [alarmList, setAlarmList] = useState([]);
  const [alarmCount, setAlarmCount] = useState(null);

  // 투표
  const [voteResult, setVoteResult] = useState(null);
  const [optionOneVotes, setOptionOneVotes] = useState(0);
  const [optionTwoVotes, setOptionTwoVotes] = useState(0);
  const [voteChecked, setVoteChecked] = useState(null);

  useEffect(() => {
    connect();
  }, []);

  // 유효성검사 보내는쪽에서 이거 넣으면 됨
  // IsConnected false = 미연결;
  // IsConnected true = 연결;

  function connect() {
    console.log(stompClient.current);

    if (
      stompClient.current === undefined ||
      stompClient.current.connected === false
    ) {
      // 추천 연결방식
      stompClient.current = Stomp.over(function () {
        return new SockJS("http://localhost:3000/ws", "ws", {
          transports: ["websocket", "xhr-streaming", "xhr-polling"],
        });
      });

      // 연결
      if (stompClient.current.connected === false) {
        // 서버가 재시작 되도 자동 재연결 시간 설정
        stompClient.current.configure({
          reconnectDelay: 2000, // 2초
        });

        stompClient.current.connect({}, () => {
          chatSocket(); // 채팅
          boardLikeSocket(); // 좋아요
          boardCommentAlramSocket(); // 댓글알람
          vote(); // 투표집계
          setIsConnected(true);
        });
      }
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

    // 좋아요 실시간 최신화
    stompClient.current.subscribe("/topic/like", (res) => {
      const data = JSON.parse(res.body);

      setCountLike(data.countlike);
    });

    // 개인이 좋아요 했는지 안했는지 검증

    stompClient.current.subscribe(
      "/queue/like/" + loginInfo.member_id,
      (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        setLike(data.like);
      },
    );
  };

  // 댓글 알람
  const boardCommentAlramSocket = () => {
    console.log("댓글 알람 소켓연결");

    //  알람목록
    stompClient.current.subscribe(

      "/queue/comment/alarm/" + loginInfo.member_id,

      (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        setAlarmList(data);
      },
    );

    // 알람 개수
    stompClient.current.subscribe(
      "/queue/comment/alarm/count/" + loginInfo.member_id,
      (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        setAlarmCount(data);
      },
    );

    // 답변 알람
    stompClient.current.subscribe(
      "/queue/inquiry/alarm/" + loginInfo.member_id,

      (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        setAlarmList(data);
      },
    );

    // 답변 개수
    stompClient.current.subscribe(
      "/queue/inquiry/alarm/count/" + loginInfo.member_id,
      (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        setAlarmCount(data);
      },
    );
  };

  // 투표 결과
  const vote = () => {
    console.log("투표 소켓 연결됨");
    stompClient.current.subscribe("/topic/voteresult", (res) => {
      const data = JSON.parse(res.body);
      console.log(data);
      setVoteResult(data);
      setOptionOneVotes(data.voted_a);
      setOptionTwoVotes(data.voted_b);
    });

    stompClient.current.subscribe("/queue/votecheck/" + connectUser, (res) => {
      const data = JSON.parse(res.body);
      console.log(data);
      setVoteChecked(data.checked_vote_a);
    });
  };

  return (
    <SocketContext.Provider
      value={{
        stompClient,
        IsConnected,
        chat,
        chatId,
        countLike,
        setCountLike,
        like,
        setLike,
        alarmList,
        setAlarmList,
        alarmCount,
        setAlarmCount,
        voteResult,
        setVoteResult,
        optionOneVotes,
        setOptionOneVotes,
        optionTwoVotes,
        setOptionTwoVotes,
        voteChecked,
        setVoteChecked,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const SocketContext = createContext(null);
export default Socket;
