import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  ListIcon,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  OrderedList,
  Stack,
} from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { SearchMain } from "./SearchMain";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainView } from "./MainView";
import { MainBoardList } from "./MainBoardList";

Stack.propTypes = {
  p: PropTypes.number,
  h: PropTypes.string,
  direction: PropTypes.string,
  children: PropTypes.node,
};

export function Nav() {
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
        <Button w={150} borderStyle={"solid"} size="md" variant="ghost">
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
              <MenuItem>스포츠</MenuItem>
              <MenuItem>먹방</MenuItem>
              <MenuItem>일상</MenuItem>
              <MenuItem>요리</MenuItem>
              <MenuItem>영화/드라마</MenuItem>
              <MenuItem>게임</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Box>
          <SearchMain />
        </Box>

        <Flex gap={10}>
          <Flex>
            <Button
              w={70}
              size="md"
              variant="ghost"
              leftIcon={<FontAwesomeIcon icon={faBell} />}
            ></Button>
            <Button w={90} size="md" variant="ghost">
              로그인
            </Button>
            <Button w={90} size="md" variant="ghost">
              회원가입
            </Button>
          </Flex>
          <Menu w={200} size="md" variant="ghost">
            <MenuButton>
              <HStack>
                <Avatar
                  size="sm"
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>로그아웃</MenuItem>
              <Divider />
              <MenuItem>정보수정</MenuItem>
              <MenuItem>고객센터</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}
