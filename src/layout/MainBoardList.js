import {
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Icon, createIcon } from "@chakra-ui/react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import BoardList from "../board/BoardList";

export function MainBoardList({
  mainBoardList2,
  mainBoardList3,
  mainBoardList4,
  mainBoardList5,
  mainBoardList6,
  mainBoardList7,
  mainRecommendBoardList,
  mainHitsBoardList,
}) {
  // chakra ui 버튼 커스텀
  const CircleIcon = ({ color, ...props }) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill={color}
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  const navigate = useNavigate();

  const handleBoardPost = (postId) => {
    navigate(`/board/${postId}`);
  };



  const renderListItem = (board, index) => (
    <ListItem
      _hover={{ bg: "gray.100", cursor: "pointer" }}
      key={index}
      onClick={() => handleBoardPost(board.id)}
      alignItems="center"
    >
      <ListIcon as={CircleIcon} color={`blue.${index * 100}`} mb={"3px"} />
      <Tooltip label={board.title}>{`${board.title.slice(0, 20)}`}</Tooltip>
    </ListItem>
  );

  return (
    <Box>
      <Flex
        width="70%"
        m="auto"
        mt={"50px"}
        border="1px"
        height={"300"}
        justifyContent={"space-around"}
      >
        <Box width="40%" border="1px" borderColor={"blue"} padding={6}>
          <Heading fontWeight="bold" fontSize="1.2rem" mt={"-10px"} mb={"10px"}>
            통합 최다 추천글
          </Heading>
          <List mt={"20px"} spacing={3}>
            {mainRecommendBoardList.map((board, index) => (
              <>
                {index > 0 && <Divider key={`divider-${index}`} />}
                {renderListItem(board, index)}
              </>
            ))}
          </List>
        </Box>
        <Box width="40%" border="1px" borderColor={"blue"} padding={6}>
          <Heading fontWeight="bold" fontSize="1.2rem" mt={"-10px"} mb={"10px"}>
            통합 최다 조회수 글
          </Heading>
          <List mt={"20px"} spacing={3}>
            {mainHitsBoardList.map((board, index) => (
              <>
                {index > 0 && <Divider key={`divider-${index}`} />}
                {renderListItem(board, index)}
              </>
            ))}
          </List>
        </Box>
      </Flex>
      <Box>
        <Flex
          width="80%"
          m="auto"
          mt={"50px"}
          border="1px"
          height={"300"}
          justifyContent={"space-evenly"}
        >
          <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
            <Heading
              fontWeight="bold"
              fontSize="1.2rem"
              mt={"-10px"}
              mb={"10px"}
            >
              스포츠 게시판 최신글
            </Heading>
            <List mt={"20px"} spacing={3}>
              {mainBoardList2.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </Box>
          <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
            <Heading
              fontWeight="bold"
              fontSize="1.2rem"
              mt={"-10px"}
              mb={"10px"}
            >
              먹방 게시판 최신글
            </Heading>
            <List mt={"20px"} spacing={3}>
              {mainBoardList3.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </Box>
          <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
            <Heading
              fontWeight="bold"
              fontSize="1.2rem"
              mt={"-10px"}
              mb={"10px"}
            >
              게임 게시판 최신글
            </Heading>
            <List mt={"20px"} spacing={3}>
              {mainBoardList7.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </Box>
        </Flex>
      </Box>
      <Flex
        width="80%"
        m="auto"
        mt={"50px"}
        border="1px"
        height={"300"}
        justifyContent={"space-evenly"}
      >
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Heading fontWeight="bold" fontSize="1.2rem" mt={"-10px"} mb={"10px"}>
            일상 게시판 최신글
          </Heading>
          <List mt={"20px"} spacing={3}>
            {mainBoardList4.map((board, index) => (
              <>
                {index > 0 && <Divider key={`divider-${index}`} />}
                {renderListItem(board, index)}
              </>
            ))}
          </List>
        </Box>
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Heading fontWeight="bold" fontSize="1.2rem" mt={"-10px"} mb={"10px"}>
            영화/드라마 게시판 최신글
          </Heading>
          <List mt={"20px"} spacing={3}>
            {mainBoardList6.map((board, index) => (
              <>
                {index > 0 && <Divider key={`divider-${index}`} />}
                {renderListItem(board, index)}
              </>
            ))}
          </List>
        </Box>
        <Box width="27%" border="1px" borderColor={"blue"} padding={6}>
          <Heading fontWeight="bold" fontSize="1.2rem" mt={"-10px"} mb={"10px"}>
            요리 게시판 최신글
          </Heading>
          <List mt={"20px"} spacing={3}>
            {mainBoardList5.map((board, index) => (
              <>
                {index > 0 && <Divider key={`divider-${index}`} />}
                {renderListItem(board, index)}
              </>
            ))}
          </List>
        </Box>
      </Flex>
    </Box>
  );
}
