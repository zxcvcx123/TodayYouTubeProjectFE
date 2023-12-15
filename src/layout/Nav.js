import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { SearchMain } from "./SearchMain";
import { faBell, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";
import MemberProfile from "../member/MemberProfile";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { SocketContext } from "../socket/Socket";
import axios from "axios";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

Stack.propTypes = {
  p: PropTypes.number,
  h: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.node,
};

export function Nav({ setSocket, setBoardCategory }) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  let navigate = useNavigate();
  let location = useLocation();

  const {
    stompClient,
    IsConnected,
    alarmList,
    setAlarmList,
    alarmCount,
    setAlarmCount,
  } = useContext(SocketContext);

  useEffect(() => {
    if (loginInfo !== null) {
      axios
        .post("http://localhost:3000/api/websocket/alarmlist", {
          userId: loginInfo.member_id,
        })
        .then((res) => {
          setAlarmList(res.data);
          console.log(res.data);
        })
        .catch()
        .finally();

      axios
        .post("http://localhost:3000/api/websocket/alarmcount", {
          userId: loginInfo.member_id,
        })
        .then((res) => {
          setAlarmCount(res.data);
          console.log(res.data);
        })
        .catch()
        .finally();
    }
  }, [location, loginInfo]);

  function handleRandomView() {
    axios
      .get("http://localhost:3000/api/board/random")
      .then((res) => {
        navigate("board/" + res.data.id + "?category=" + res.data.name_eng);
      })
      .catch()
      .finally();
  }

  // 알람 개별 읽기
  function handleRead(id, boardid, category, inquiryid) {
    if (category === "ac002") {
      navigate("/board/" + boardid);
    }
    if (category === "ac003") {
      navigate("/inquiry/" + inquiryid);
    }
    if (category === "ac004") {
      navigate("/inquiry/list/");
    }

    axios
      .post("http://localhost:3000/api/alarmread", { id: id })
      .then()
      .catch()
      .finally();
  }

  // 알람 모두 읽기
  function handleAllRead() {
    stompClient.current.publish({
      destination: "/app/comment/alarm/allread/" + loginInfo.member_id,
    });
  }

  // 알람 개별 제거
  function handleDeleteAlarm(id) {
    // mode 통해서 전부 제거(ALL), 일부 제거
    stompClient.current.publish({
      destination: "/app/comment/alarm/delete",
      body: JSON.stringify({
        id: id,
        userId: loginInfo.member_id,
        mode: "ONE",
      }),
    });
  }

  // 알람 전부 제거
  function handleDeletAllAlarm() {
    // mode 통해서 전부 제거(ALL), 일부 제거
    stompClient.current.publish({
      destination: "/app/comment/alarm/delete",
      body: JSON.stringify({
        userId: loginInfo.member_id,
        mode: "ALL",
      }),
    });
  }

  return (
    <>
      <Flex
        // ml="100px"
        mt={2}
        h="100px"
        w="100%"
        alignItems="center"
        justifyContent={"space-around"}
        // bg="blackAlpha.100"
        bg="white"
      >
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          <Image src="img/logo1_withText.png" w={"200px"} />
        </button>
        <Flex>
          <Menu>
            <MenuButton as={Button} w={120} size="md" variant="ghost">
              게시판
              <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=notice");
                  setBoardCategory("공지");
                }}
              >
                공지
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=sports");
                  setBoardCategory("스포츠");
                }}
              >
                스포츠
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=mukbang");
                  setBoardCategory("먹방");
                }}
              >
                먹방
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=daily");
                  setBoardCategory("일상");
                }}
              >
                일상
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=cooking");
                  setBoardCategory("요리");
                }}
              >
                요리
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=movie");
                  setBoardCategory("영화/드라마");
                }}
              >
                영화/드라마
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  navigate("board/list?category=game");
                  setBoardCategory("게임");
                }}
              >
                게임
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("board/vote/list?p=1");
                  setBoardCategory("투표");
                }}
              >
                투표
              </MenuItem>
              <MenuItem onClick={() => navigate("/chat")}>채팅</MenuItem>
              <Divider />
              <MenuItem
                onClick={(e) => {
                  navigate("/inquiry/list");
                  setBoardCategory("문의게시판");
                }}
              >
                문의게시판
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/admin")}>
                관리자(임시)
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            onClick={handleRandomView}
            w={120}
            borderStyle={"solid"}
            size="md"
            variant="ghost"
          >
            오늘 뭐 볼까?
          </Button>
        </Flex>
        {/* ---------- 통합검색 ---------- */}
        <Box>
          <SearchMain />
        </Box>

        <Flex gap={10} ml={2}>
          <Flex gap={6} justifyContent={"center"} alignItems={"center"}>
            {token.detectLogin ? (
              <>
                <Popover gutter={10}>
                  <PopoverTrigger>
                    <Button variant={"ghost"}>
                      {alarmCount > 0 ? (
                        <FontAwesomeIcon
                          fontSize={"20px"}
                          icon={faBell}
                          color="gold"
                        />
                      ) : (
                        <FontAwesomeIcon fontSize={"20px"} icon={faBell} />
                      )}
                      {alarmCount > 99 && <Text>"99..."</Text>}
                      {alarmCount === 0 || alarmCount === null ? (
                        <Text></Text>
                      ) : (
                        <Text>{alarmCount}</Text>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent w={"350px"} h={"300px"} overflowY={"scroll"}>
                    <PopoverArrow />
                    <PopoverCloseButton size={5} />
                    <PopoverHeader>
                      <Flex justifyContent={"space-between"} w={"88%"}>
                        <Text>최근 알람</Text>
                        <Flex alignItems={"flex-end"} gap={3}>
                          <Text
                            _hover={{ cursor: "pointer" }}
                            onClick={handleAllRead}
                            style={{ fontSize: "small", color: "blue" }}
                          >
                            전부읽음
                          </Text>
                          <Text
                            _hover={{ cursor: "pointer" }}
                            onClick={handleDeletAllAlarm}
                            style={{
                              fontSize: "small",
                              color: "blue",
                            }}
                          >
                            전부삭제
                          </Text>
                        </Flex>
                      </Flex>
                    </PopoverHeader>

                    {IsConnected === true ? (
                      alarmList.map((list) => (
                        <PopoverBody borderBottomWidth={2} key={list.id}>
                          <Flex alignItems={"center"}>
                            <Text
                              _hover={{ cursor: "pointer" }}
                              onClick={() => {
                                handleRead(
                                  list.id,
                                  list.board_id,
                                  list.alarm_category,
                                  list.inquiry_id,
                                );
                              }}
                              style={{
                                color: list._alarm === false ? "blue" : "gray",
                              }}
                            >
                              {list.alarm_category === "ac002" ? (
                                <>
                                  {list.board_title}에 {list.nickname}
                                  님이 댓글을 남겼습니다.
                                </>
                              ) : list.alarm_category === "ac003" ? (
                                <>
                                  {list.inquiry_title}에 운영자가 답변을
                                  남겼습니다.
                                </>
                              ) : list.alarm_category === "ac004" ? (
                                <>문의 게시판에 문의가 작성되었습니다.</>
                              ) : null}

                              <Text color={"black"}>{list.ago}</Text>
                            </Text>

                            <Box _hover={{ cursor: "pointer" }}>
                              <FontAwesomeIcon
                                icon={faXmark}
                                onClick={() => handleDeleteAlarm(list.id)}
                              />
                            </Box>
                          </Flex>
                        </PopoverBody>
                      ))
                    ) : (
                      <Text>알람을 불러오는 중입니다...</Text>
                    )}
                  </PopoverContent>
                </Popover>

                <Menu w={200} size="md" variant="ghost">
                  <MenuButton>
                    <MemberProfile />
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                    >
                      로그아웃
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        navigate("/member/info");
                      }}
                    >
                      마이페이지
                    </MenuItem>
                    <MenuItem>준비중</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  onClick={() => {
                    navigate("member/login");
                  }}
                  w={90}
                  size="md"
                  variant="ghost"
                >
                  로그인
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
