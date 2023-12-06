import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useOutletContext } from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";
import { DetectLoginContext } from "../component/LoginProvider";
import axios from "axios";

// 게시물 조회시 좋아요 출력
function BoardLike({ like, board, onClick, id }) {
  const { loginInfo } = useContext(DetectLoginContext);

  // 소켓
  let stompClient;
  const { socket } = useOutletContext();
  stompClient = useRef();
  const subscription = useRef(null);

  const [countLike, setCountLike] = useState(null);
  const [checkId, setCheckId] = useState(null);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (loginInfo.member_id !== "") {
      axios
        .post("/api/like/board", {
          board_id: id,
          member_id: loginInfo.member_id,
        })
        .then((response) => {
          setCountLike(response.data.countlike);
          setCheckId(response.data.checkId);
          console.log("axios: " + response.data.checkId);
        })
        .catch(() => console.log("bad"))
        .finally(() => console.log("완료"));
    }

    // if (socket !== null) {
    //   getSocket();
    // }
  }, [loginInfo]);

  if (socket !== null) {
    stompClient = socket;
    getSocket();
  }

  if (socket === null) {
    return <Spinner />;
  }

  // ===== 두번 연결 되니깐 한번은 끊어줌 =====
  function unSubscribe() {
    if (subscription.current !== null) {
      subscription.current.unsubscribe();
    }
  }
  // ========================================

  // 좋아요 가져오기
  function getSocket() {
    console.log("BoardLike에서 소켓연결");
    unSubscribe();
    subscription.current = stompClient.current.subscribe(
      "/topic/like",
      (res) => {
        JSON.parse(res.body);
        console.log(JSON.parse(res._body));
        const data = JSON.parse(res._body);
        setCountLike(data.countlike);
        setCheckId(data.checkId);
        console.log(data);
        // return setArr((arr) => [...arr, data.checkId]);
      },
    );
  }

  // console.log("들어있는 값: " + checkId);
  // console.log("현재 로그인 계정: " + loginInfo.member_id);
  // console.log(arr);
  function sendLike() {
    stompClient.current.publish({
      destination: "/app/like/",
      body: JSON.stringify({ board_id: id, member_id: loginInfo.member_id }),
    });
  }

  return (
    <>
      <Flex>
        <Button onClick={sendLike}>
          {checkId !== null &&
          checkId.find((list) => list === loginInfo.member_id) ? (
            <FontAwesomeIcon icon={fullHeart} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} />
          )}
        </Button>

        <Heading>{countLike}</Heading>
      </Flex>
    </>
  );
}

export default BoardLike;
