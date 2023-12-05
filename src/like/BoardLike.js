import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useOutletContext } from "react-router-dom";
import * as SockJS from "sockjs-client";
import * as StompJS from "@stomp/stompjs";
import { Stomp } from "@stomp/stompjs";

// 게시물 조회시 좋아요 출력
function BoardLike({ like, board, onClick }) {
  // 소켓
  let stompClient;
  const { socket } = useOutletContext();

  stompClient = useRef();
  const subscription = useRef(null);

  useEffect(() => {
    if (socket === null) {
      reconnect();
    } else {
      getSocket();
    }
  }, []);

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
          "/topic/like",
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

  // ===== 두번 연결 되니깐 한번은 끊어줌 =====
  function unSubscribe() {
    if (subscription.current !== null) {
      subscription.current.unsubscribe();
    }
  }
  // ========================================

  // 좋아요 가져오기
  function getSocket() {
    unSubscribe();
    subscription.current = stompClient.current.subscribe(
      "/topic/greetings",
      (res) => {
        JSON.parse(res.body);
        console.log(JSON.parse(res._body));

        // return setChat((chatList) => [...chatList, json]);
      },
    );
  }

  return (
    <>
      <Flex>
        <Button onClick={onClick}>
          {like.like === 1 ? (
            <FontAwesomeIcon icon={fullHeart} />
          ) : (
            <FontAwesomeIcon icon={emptyHeart} />
          )}
        </Button>
        <Heading>{board.countlike}</Heading>
      </Flex>
    </>
  );
}

export default BoardLike;
