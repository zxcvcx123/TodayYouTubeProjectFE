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
function BoardLike({ id }) {
  const { loginInfo } = useContext(DetectLoginContext);

  // 소켓
  let stompClient;
  const { socket } = useOutletContext();
  stompClient = useRef();
  const subscription = useRef(null);

  const [countLike, setCountLike] = useState(null);
  const [like, setLike] = useState(null);

  useEffect(() => {
    axios
      .post("/api/like/board", {
        board_id: id,
        member_id: localStorage.getItem("memberInfo"),
      })
      .then((response) => {
        setCountLike(response.data.countlike);
        setLike(response.data.like);
      })
      .catch(() => console.log("bad"))
      .finally(() => console.log("완료"));

    // if (socket !== null) {
    //   getSocket();
    // }
  }, []);

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
        console.log(res.body);
        const data = JSON.parse(res.body);
        setCountLike(data.countlike);

        // return setArr((arr) => [...arr, data.checkId]);
      },
    );

    subscription.current = stompClient.current.subscribe(
      "/queue/like/" + localStorage.getItem("memberInfo"),
      (res1) => {
        console.log(res1.body);
        const data1 = JSON.parse(res1.body);
        setLike(data1.like);
      },
    );
  }

  function send() {
    stompClient.current.publish({
      destination: "/app/like/add/" + localStorage.getItem("memberInfo"),
      body: JSON.stringify({
        board_id: id,
        member_id: localStorage.getItem("memberInfo"),
      }),
    });

    stompClient.current.publish({
      destination: "/app/like/",
      body: JSON.stringify({
        board_id: id,
        member_id: localStorage.getItem("memberInfo"),
      }),
    });
  }

  return (
    <>
      <Flex>
        <Button
          onClick={() => {
            send();
          }}
        >
          {like === 1 ? (
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
