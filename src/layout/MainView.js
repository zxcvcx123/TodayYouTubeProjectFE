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
import React, { useContext, useEffect, useState } from "react";
import { MainBoardList } from "./MainBoardList";
import axios from "axios";
import { AddIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import YoutubeInfo from "../component/YoutubeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { DetectLoginContext } from "../component/LoginProvider";

export function MainView() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [category, setCategory] = useState("all");
  const [firstList, setFirstList] = useState(null);
  const [otherList, setOtherList] = useState(null);
  const [dateSort, setDateSort] = useState("weekly");
  const [isDay, setIsDay] = useState(false);
  const [isWeek, setIsWeek] = useState(true);
  const [isMonth, setIsMonth] = useState(false);

  const [mainShowLink, setMainShowLink] = useState(null);
  const [linkCategory, setLinkCategory] = useState(null);

  const [mainBoardList2, setMainBoardList2] = useState(null);
  const [mainBoardList3, setMainBoardList3] = useState(null);
  const [mainBoardList4, setMainBoardList4] = useState(null);
  const [mainBoardList5, setMainBoardList5] = useState(null);
  const [mainBoardList6, setMainBoardList6] = useState(null);
  const [mainBoardList7, setMainBoardList7] = useState(null);
  const [mainRecommendBoardList, setMainRecommendBoardList] = useState(null);
  const [mainHitsBoardList, setMainHitsBoardList] = useState(null);

  const [showSpinner, setShowSpinner] = useState(true);

  const [visitorCountAll, setVisitorCountAll] = useState(0);

  const params = new URLSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // 첫번째 영상이 메인에 나오도록 --> category랑 dateSort값이 변경될때만 1위영상으로 출력
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 7000);
    params.set("c", category);
    params.set("sort", dateSort);

    axios
      .get("/api?" + params)
      .then((response) => {
        setFirstList(response.data.firstBoardList);
        setOtherList(response.data.otherBoardList);
        setMainShowLink(response.data.firstBoardList.link);
        setLinkCategory(response.data.firstBoardList.categoryName);
        setMainBoardList2(response.data.mainBoardList2);
        setMainBoardList3(response.data.mainBoardList3);
        setMainBoardList4(response.data.mainBoardList4);
        setMainBoardList5(response.data.mainBoardList5);
        setMainBoardList6(response.data.mainBoardList6);
        setMainBoardList7(response.data.mainBoardList7);
        setMainRecommendBoardList(response.data.mainRecommendBoardList);
        setMainHitsBoardList(response.data.mainHitsBoardList);
        // navigate("?" + params);
        return () => clearTimeout(timer);
      })
      .catch(() => console.log("글이 없습니다"));
  }, [category, dateSort]);

  // 나머지 영상 바뀔때 메인화면에 출력
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 7000);
    params.set("c", category);
    params.set("sort", dateSort);
    axios
      .get("/api?" + params)
      .then((response) => {
        setFirstList(response.data.firstBoardList);
        setOtherList(response.data.otherBoardList);
        // navigate("?" + params);
        return () => clearTimeout(timer);
      })
      .catch(() => console.log("글이 없습니다."));
  }, [category, dateSort, mainShowLink]);

  // 메인페이지 접속시 방문자 증가
  useEffect(() => {
    if (loginInfo !== null) {
      const memberInfo = loginInfo.member_id;

      axios.get("/api/visitor", { params: { member_id: memberInfo } });
    }
  }, []);

  function handleCategoryChange(e) {
    // setMainShowLink(null);
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
          <>
            <Card
              align="center"
              w={"60%"}
              m={"auto"}
              mt={100}
              variant={"filled"}
            >
              <CardHeader>
                <Heading size="md">
                  [ {dateSort == "daily" && "오늘은 "}
                  {dateSort == "weekly" && "이번주엔 "}
                  {dateSort == "monthly" && "이번달엔 "}
                  아직 작성된 게시물이 없어요! ]
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
          </>
        )}
      </>
    );
  }

  function handleDateClick(e) {
    setDateSort(e.target.value);
  }

  // console.log("출력될 링크:" + mainShowLink);
  // 임시메인
  return (
    <Box w="100%" h="2180px" p={4} border={"1px"} borderColor="pink">
      <Flex w="100%" mb="200px" bg="black">
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
              {mainShowLink && (
                <YoutubeInfo
                  link={mainShowLink}
                  extraVideo={true}
                  opts={{ height: 550, width: 1100 }}
                />
              )}
            </Box>

            <Button w={"1%"} color="white" mt={300} ml={100} variant={"link"}>
              {linkCategory}게시판으로 이동하기 >
            </Button>
          </Flex>
          <Box
            ml={"-10%"}
            w={"100%"}
            mt={6}
            h={"37%"}
            border={"1px"}
            borderColor={"blue"}
          >
            <Flex w="100%" h="100%">
              <Box>
                <Flex h={"15%"} color={"white"} fontSize={"1.5rem"}>
                  <Text variant={"outline"} color={"wthie"} ml={10}>
                    1위
                  </Text>
                </Flex>
                <Box
                  key={firstList.link}
                  _hover={{ cursor: "pointer" }}
                  w={"100%"}
                  h={"82%"}
                  border={"1px"}
                  borderColor={"orange"}
                  onClick={() => {
                    setLinkCategory(firstList.categoryName);
                    setMainShowLink(firstList.link);
                  }}
                >
                  <YoutubeInfo link={firstList.link} extraThumbnail={true} />
                </Box>
              </Box>
              <Flex w={"80%"} ml={5}>
                {otherList &&
                  otherList.map((other) => (
                    <Box
                      w={"25%"}
                      border={"1px"}
                      borderColor={"white"}
                      key={other.id}
                    >
                      <Box
                        h={"20%"}
                        color={"white"}
                        key={other.link}
                        ml={12}
                        fontSize={"1.2rem"}
                        mt={"20px"}
                        mb={"25px"}
                      >
                        <br />
                        {otherList.indexOf(other) + 2}위
                      </Box>
                      <Box
                        w="100%"
                        h="60%"
                        key={other.id}
                        border={"1px"}
                        borderColor={"orange"}
                        onClick={() => {
                          setLinkCategory(other.categoryName);
                          setMainShowLink(other.link);
                        }}
                        _hover={{ cursor: "pointer" }}
                      >
                        <YoutubeInfo link={other.link} extraThumbnail={true} />
                      </Box>
                    </Box>
                  ))}
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <MainBoardList
        mainBoardList2={mainBoardList2}
        mainBoardList3={mainBoardList3}
        mainBoardList4={mainBoardList4}
        mainBoardList5={mainBoardList5}
        mainBoardList6={mainBoardList6}
        mainBoardList7={mainBoardList7}
        mainHitsBoardList={mainHitsBoardList}
        mainRecommendBoardList={mainRecommendBoardList}
      />
    </Box>
  );
}
