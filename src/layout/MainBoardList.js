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
          <CardHeader width="100%" bg={"rgb(218,181,181)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>통합 최다 추천글</Text>
                <Tooltip label="사이트 내 통합 최다 추천 게시물입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="40%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(216,218,181)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>통합 최다 조회 글</Text>
                <Tooltip label="사이트 내 통합 최다 조회 게시물입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>

      <Flex width="80%" m="auto" mt={"50px"} justifyContent={"space-evenly"}>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(186,218,181)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>스포츠 게시판 최신글</Text>
                <Tooltip label="스포츠 게시판의 최신 5개 글입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(181,218,209)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>먹방 게시판 최신글</Text>
                <Tooltip label="먹방 게시판의 최신 5개 글입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(181,196,218)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>게임 게시판 최신글</Text>
                <Tooltip label="게임 게시판의 최신 5개 글입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>

      <Flex width="80%" m="auto" mt={"50px"} justifyContent={"space-evenly"}>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(201,181,218)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>일상 게시판 최신글</Text>
                <Tooltip label="일상 게시판의 최신 5개 글입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(218,181,192)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>영화/드라마 게시판 최신글</Text>
                <Tooltip label="영화/드라마 게시판의 최신 5개 글입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
        <Card width="27%" borderTopRadius={10}>
          <CardHeader width="100%" bg={"rgb(218,196,181)"} borderTopRadius={10}>
            <Heading width="100%" fontWeight="bold" fontSize="1.2rem">
              <Flex justifyContent="space-between" alignItems="center">
                <Text>요리 게시판 최신글</Text>
                <Tooltip label="요리 게시판의 최신 5개 글입니다.">
                  <InfoOutlineIcon boxSize={4} />
                </Tooltip>
              </Flex>
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
                <Box key={board.uuid}>
                  {index > 0 && <Divider />}
                  {renderListItem(board, index)}
                </Box>
              ))}
            </List>
          </CardBody>
        </Card>
      </Flex>
    </Box>
  );
}
