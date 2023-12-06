import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  FormHelperText,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Spinner,
  StatHelpText,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MainBoardList } from "./MainBoardList";
import axios from "axios";
import { AddIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import YoutubeInfo from "../component/YoutubeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

export function MainView() {
  const [category, setCategory] = useState("all");
  const [firstList, setFirstList] = useState(null);
  const [otherList, setOtherList] = useState(null);
  const [dateSort, setDateSort] = useState("weekly");
  const [isDay, setIsDay] = useState(false);
  const [isWeek, setIsWeek] = useState(false);
  const [isMonth, setIsMonth] = useState(false);
  const [mainShowLink, setMainShowLink] = useState(null);

  const [showSpinner, setShowSpinner] = useState(true);

  const params = new URLSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 5000);
    params.set("c", category);
    params.set("sort", dateSort);
    axios.get("/api?" + params).then((response) => {
      setFirstList(response.data.firstBoardList);
      setOtherList(response.data.otherBoardList);
      navigate("?" + params);
      return () => clearTimeout(timer);
    });
  }, [category, dateSort, mainShowLink]);

  function handleCategoryChange(e) {
    setMainShowLink(null);
    setCategory(e.target.value);
  }

  //
  // if (firstList == null) {
  //   return <Spinner />
  // }
  // console.log(firstList);
  //
  // if (otherList == null) {
  //   return <Spinner />;
  // }
  // console.log(otherList);

  function handleHomeClick() {
    setCategory("all");
    setDateSort("monthly");
    setIsMonth(true);
    setIsDay(false);
    setIsWeek(false);
    navigate("/");
  }

  if (firstList == null || otherList == null) {
    return (
      <>
        {showSpinner && <Spinner />}
        {showSpinner || (
          <Card align="center" w={"60%"} m={"auto"} mt={100} variant={"filled"}>
            <CardHeader>
              <Heading size="md">
                {dateSort} --> [ 아직 작성된 게시물이 없습니다. ]
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>게시글을 올려서 추천을 받아보세요!</Text>
            </CardBody>
            <CardFooter>
              <Button
                mr={10}
                color="black"
                colorScheme="red"
                variant={"outline"}
                onClick={handleHomeClick}
              >
                홈으로 가기
              </Button>
              <Button
                color="blueviolet"
                colorScheme="red"
                variant={"outline"}
                onClick={() => navigate("/board/list")}
              >
                글 작성하러 가기!
              </Button>
            </CardFooter>
          </Card>
        )}
      </>
    );
  }

  function handleDateClick(e) {
    setDateSort(e.target.value);
  }

  console.log("출력될 링크:" + mainShowLink);
  // 임시메인
  return (
    <Box bg="black" w="100%" h="900px" p={4}>
      <Flex w="100%">
        <Box w="18%">
          <Box>
            <Flex ml={10} mb={1} mt={3}>
              <Button
                colorScheme={isDay ? "red" : "gray"}
                mr={2}
                value="daily"
                onClick={(e) => {
                  setIsDay(true);
                  setIsWeek(false);
                  setIsMonth(false);
                  handleDateClick(e);
                }}
              >
                하루
              </Button>
              <Button
                colorScheme={isWeek ? "red" : "gray"}
                mr={2}
                value="weekly"
                onClick={(e) => {
                  setIsDay(false);
                  setIsWeek(true);
                  setIsMonth(false);
                  handleDateClick(e);
                }}
              >
                이번주
              </Button>
              <Button
                colorScheme={isMonth ? "red" : "gray"}
                value="monthly"
                onClick={(e) => {
                  setIsDay(false);
                  setIsWeek(false);
                  setIsMonth(true);
                  handleDateClick(e);
                }}
              >
                이번달
              </Button>
            </Flex>
          </Box>
          <Box color="white" ml={10}>
            <FontAwesomeIcon icon={faRankingStar} /> {dateSort} 베스트 영상
            <Text fontSize="0.8rem" color="gray.400">
              - {dateSort} 가장 추천을 많이 받은 영상들입니다.
            </Text>
          </Box>
          <Select
            onChange={handleCategoryChange}
            width="60%"
            backgroundColor="white"
            mt={10}
            ml={10}
            size="sm"
            alignItems="center"
          >
            <option value="all">전체게시판</option>
            <option value="C002">스포츠게시판</option>
            <option value="C003">먹방게시판</option>
            <option value="C004">일상게시판</option>
            <option value="C005">요리게시판</option>
            <option value="C006">영화/드라마 게시판</option>
            <option value="C007">게임게시판</option>
          </Select>
          {/*<Box mt={50} ml={10}>*/}
          {/*  <Text color={"red.300"}>**둘 중에 하나만 사용할 예정**</Text>*/}
          {/*  <Button mb={1} onClick={() => setBaseOnCurrent(true)}>*/}
          {/*    현재날짜 기준으로 -7*/}
          {/*  </Button>*/}
          {/*  <Button onClick={() => setBaseOnCurrent(false)}>*/}
          {/*    현재날짜가 속한 요일,달 기준으로*/}
          {/*  </Button>*/}
          {/*</Box>*/}
        </Box>

        <Box w={"85%"}>
          <Flex
            w="86%"
            h="67%"
            m="auto"
            ml={10}
            border={"1px"}
            borderColor={"red"}
          >
            <Box width={"80%"} height="100%" key={mainShowLink}>
              <YoutubeInfo
                link={mainShowLink}
                extraVideo={true}
                opts={{ height: 550, width: 1100 }}
              />
            </Box>
            <Button w={"1%"} color="white" mt={300} ml={100} variant={"link"}>
              {firstList.categoryName}게시판으로 이동하기 >
            </Button>
          </Flex>
          <Box
            ml={"-15%"}
            w={"100%"}
            mt={10}
            h={"30%"}
            border={"1px"}
            borderColor={"blue"}
          >
            <Flex w="100%" h="100%">
              <Box
                key={firstList.link}
                _hover={{ cursor: "pointer" }}
                w={"30%"}
                border={"1px"}
                borderColor={"orange"}
                onClick={() => setMainShowLink(firstList.link)}
              >
                <YoutubeInfo
                  link={firstList.link}
                  extraThumbnail={true}
                  thumbnailWidth={400}
                  thumbnailHeight={250}
                />
              </Box>
              <Flex w={"80%"} ml={5}>
                {otherList &&
                  otherList.map((other) => (
                    <Box
                      w="25%"
                      h="70%"
                      key={other.id}
                      mt={12}
                      ml={5}
                      border={"1px"}
                      borderColor={"white"}
                      onClick={() => setMainShowLink(other.link)}
                    >
                      <YoutubeInfo
                        link={other.link}
                        extraThumbnail={true}
                        thumbnailWidth={250}
                        thumbnailHeight={180}
                      />
                    </Box>
                  ))}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      {/*<MainBoardList />*/}
    </Box>
  );
}
