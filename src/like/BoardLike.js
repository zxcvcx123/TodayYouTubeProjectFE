import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useOutletContext } from "react-router-dom";
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

  /* modal */
  const { isOpen, onClose, onOpen } = useDisclosure();

  const navigate = useNavigate();

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
        .catch()
        .finally();
    } else {
      axios
        .post("/api/like/board/notlogin", {
          board_id: id,
        })
        .then((response) => {
          setCountLike(response.data.countlike);
        })
        .catch()
        .finally();
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

  function handleToLogin() {}

  return (
    <>
      <Flex>
        {loginInfo === null ? (
          <Button onClick={onOpen}>
            <FontAwesomeIcon icon={emptyHeart} />
          </Button>
        ) : (
          <Button
            onClick={() => {
              send();
            }}
            isDisabled={IsConnected === false}
          >
            {IsConnected === false ? (
              <Spinner />
            ) : like === 1 ? (
              <FontAwesomeIcon icon={fullHeart} />
            ) : (
              <FontAwesomeIcon icon={emptyHeart} />
            )}
          </Button>
        )}
        <Heading>{countLike}</Heading>
      </Flex>
      {/* ------------------------- 모달 (비로그인 사용자 글쓰기 버튼 클릭) ------------------------- */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인 필요</ModalHeader>
          <ModalCloseButton />
          <ModalBody>좋아요 하기 위해 로그인이 필요합니다.</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => navigate("/member/login")}
            >
              로그인하러 가기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BoardLike;
