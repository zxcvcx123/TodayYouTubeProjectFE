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
import React, { useContext, useEffect } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SearchMain } from "./SearchMain";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";

Stack.propTypes = {
  p: PropTypes.number,
  h: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.node,
};

export function Nav() {
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);
  let navigate = useNavigate();
  const location = useLocation();

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
              <MenuItem onClick={() => navigate("board/list")}>스포츠</MenuItem>
              <MenuItem>먹방</MenuItem>
              <MenuItem>일상</MenuItem>
              <MenuItem>요리</MenuItem>
              <MenuItem>영화/드라마</MenuItem>
              <MenuItem>게임</MenuItem>
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
                    <HStack>
                      <Flex width={"150px"}>
                        <Avatar src="https://bit.ly/sage-adebayo" />
                        <Box ml="3">
                          <Text fontWeight="bold">{loginInfo.nickname}</Text>
                          <Text fontSize="sm">{loginInfo.role_name}</Text>
                        </Box>
                      </Flex>
                    </HStack>
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
