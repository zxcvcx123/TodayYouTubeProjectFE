import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SearchMain } from "./SearchMain";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";
import MemberProfile from "../member/MemberProfile";
import * as SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

Stack.propTypes = {
  p: PropTypes.number,
  h: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.node,
};

export function Nav({ setSocket }) {
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);
  let navigate = useNavigate();

  // 소켓 연결
  const stompClient = useRef(); // useRef로 connect()가 안끊기게하기
  const subscription = useRef(null);

  function connect() {
    let socket = new SockJS("http://localhost:3000/gs-guide-websocket", null, {
      transports: ["websocket", "xhr-streaming", "xhr-polling"],
    });

    console.log(stompClient.current);

    // 이미 연결되어 있으면 한번 더 연결시키는거 방지
    if (!stompClient.current) {
      stompClient.current = Stomp.over(socket);
      stompClient.current.connect({}, function (frame) {
        unSubscribe();
        console.log("NAV에서 소켓연결 성공: " + frame);
        console.log(stompClient.current);
        console.log(frame);

        setSocket(stompClient);
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

  useEffect(() => {
    connect();
  }, []);

  return (
    <>
      <Flex
        ml="100px"
        mt={2}
        h="100px"
        w="80%"
        alignItems="center"
        justifyContent={"space-around"}
      >
        <Button
          borderStyle={"solid"}
          size="md"
          variant="ghost"
          onClick={() => {
            navigate("/");
          }}
        >
          로고
        </Button>
        <Flex>
          <Button w={120} borderStyle={"solid"} size="md" variant="ghost">
            TOP
          </Button>
          <Menu>
            <MenuButton as={Button} w={120} size="md" variant="ghost">
              게시판
              <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("board/list?category=sports")}>
                스포츠
              </MenuItem>
              <MenuItem onClick={() => navigate("board/list?category=mukbang")}>
                먹방
              </MenuItem>
              <MenuItem onClick={() => navigate("board/list?category=daily")}>
                일상
              </MenuItem>
              <MenuItem onClick={() => navigate("board/list?category=cooking")}>
                요리
              </MenuItem>
              <MenuItem onClick={() => navigate("board/list?category=movie")}>
                영화/드라마
              </MenuItem>
              <MenuItem onClick={() => navigate("board/list?category=game")}>
                게임
              </MenuItem>
              <MenuItem onClick={() => navigate("/chat")}>채팅</MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/inquiry/list")}>
                문의게시판
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box>
          <SearchMain />
        </Box>

        <Flex gap={10} mar>
          <Flex gap={6} justifyContent={"center"} alignItems={"center"}>
            {token.detectLogin ? (
              <>
                <Button w={70} size="md" variant="ghost">
                  <FontAwesomeIcon fontSize={"20px"} icon={faBell} />
                </Button>
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
