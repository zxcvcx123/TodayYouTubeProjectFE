import React, { useContext, useEffect } from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useOutletContext } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";
import axios from "axios";
import { SocketContext } from "../socket/Socket";

// 게시물 조회시 좋아요 출력
function BoardLike({ id }) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const { stompClient, IsConnected, like, setLike, countLike, setCountLike } =
    useContext(SocketContext);

  const { test } = useOutletContext();

  useEffect(() => {
    if (loginInfo !== null) {
      axios
        .post("/api/like/board", {
          board_id: id,
          member_id: loginInfo.member_id,
        })
        .then((response) => {
          setCountLike(response.data.countlike);
          setLike(response.data.like);
        })
        .catch(() => console.log("bad"))
        .finally(() => console.log("완료"));
    }
  }, [like, countLike, loginInfo]);

  console.log(stompClient.current);

  // 좋아요 눌렀을때 본인 하트 현황 확인
  // 실시간으로 좋아요 갯수 최신화 하기
  function send() {
    stompClient.current.publish({
      destination: "/app/like/add/" + loginInfo.member_id,
      body: JSON.stringify({
        board_id: id,
        member_id: loginInfo.member_id,
      }),
    });

    stompClient.current.publish({
      destination: "/app/like/",
      body: JSON.stringify({
        board_id: id,
        member_id: loginInfo.member_id,
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
        {IsConnected && <Heading>{countLike}</Heading>}
      </Flex>
    </>
  );
}

export default BoardLike;
