import {
  Box,
  Card,
  CardBody,
  CardHeader,
  ChakraProvider,
  Divider,
  extendTheme,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { InfoOutlineIcon } from "@chakra-ui/icons";


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
        // d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  const navigate = useNavigate();

  const handleBoardPost = (postId) => {
    navigate(`/board/${postId}`);
  };

  const renderListItem = (board, index) => (
    <ListItem
      _hover={{ cursor: "pointer" }}
      key={index}
      onClick={() => handleBoardPost(board.id)}
      alignItems="center"
    >
      <ListIcon as={CircleIcon} color={"whitesmoke"} mb={"3px"} />
      <Tooltip label={board.title}>
        <Text
          _hover={{ textDecoration: "underline" }}
          display="inline"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {`${board.title.slice(0, 20)}`}
        </Text>
      </Tooltip>
    </ListItem>
  );

  return (
    <Box>
      <Flex width="80%" m="auto" mt={"100px"} justifyContent={"space-around"}>
        <Card width="40%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              통합 최다 추천글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            spacing={2}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List width={"100%"} spacing={2}>
              {mainRecommendBoardList.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="40%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              통합 최다 조회수 글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            spacing={2}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List width={"100%"} spacing={2}>
              {mainHitsBoardList.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>

      <Flex width="80%" m="auto" mt={"50px"} justifyContent={"space-evenly"}>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              스포츠 게시판 최신글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List mt={"10px"} spacing={2}>
              {mainBoardList2.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              먹방 게시판 최신글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List mt={"10px"} spacing={2}>
              {mainBoardList3.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              게임 게시판 최신글
              <InfoOutlineIcon />
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List mt={"10px"} spacing={2}>
              {mainBoardList7.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>

      <Flex width="80%" m="auto" mt={"50px"} justifyContent={"space-evenly"}>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              일상 게시판 최신글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List mt={"10px"} spacing={2}>
              {mainBoardList4.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              영화/드라마 게시판 최신글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List mt={"10px"} spacing={2}>
              {mainBoardList6.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg="blackAlpha.50" borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              요리 게시판 최신글
            </Heading>
          </CardHeader>
          <CardBody
            mt={"-10px"}
            bg={"white"}
            borderBottomRadius={10}
            boxShadow="lg"
          >
            <List mt={"10px"} spacing={2}>
              {mainBoardList5.map((board, index) => (
                <>
                  {index > 0 && <Divider key={`divider-${index}`} />}
                  {renderListItem(board, index)}
                </>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}
