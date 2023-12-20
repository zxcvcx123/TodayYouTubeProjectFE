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
  Badge,
  ButtonGroup,
  Img,
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
import ReactPlayer from "react-player";
import LoadingPage from "../component/LoadingPage";
import { medal, medal1, medal2, medal3 } from "../assets/Image";

export function MainView() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [category, setCategory] = useState("all");
  const [firstList, setFirstList] = useState(null);
  const [otherList, setOtherList] = useState(null);
  const [dateSort, setDateSort] = useState("monthly");
  const [isDay, setIsDay] = useState(false);
  const [isWeek, setIsWeek] = useState(false);
  const [isMonth, setIsMonth] = useState(true);

  const [mainShowLink, setMainShowLink] = useState(null);
  const [mainShowTitle, setMainShowTitle] = useState(null);
  const [mainShowId, setMainShowId] = useState(null);
  const [linkCategory, setLinkCategory] = useState(null);
  const [linkNameEng, setLinkNameEng] = useState(null);

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
        if (response.data.firstBoardList !== null) {
          setMainShowLink(response.data.firstBoardList.link);
          setMainShowTitle(response.data.firstBoardList.title);
          setMainShowId(response.data.firstBoardList.id);
          setLinkCategory(response.data.firstBoardList.categoryName);
          setLinkNameEng(response.data.firstBoardList.name_eng);
        }
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
      .catch();
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
      .catch();
  }, [category, dateSort, mainShowLink]);

  // 메인페이지 접속시 방문자 증가
  useEffect(() => {
    if (loginInfo !== null) {
      const memberInfo = loginInfo.member_id;
      axios.get("/api/visitor", { params: { member_id: memberInfo } });
    } else {
    }
  }, [loginInfo]);

  // 사이드바 카테고리 변경
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

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

  function handleHomeClick(handleHomeClickSet) {
    navigate("/");
    setCategory("all");
    setDateSort("monthly");
    setIsMonth(true);
    setIsDay(false);
    setIsWeek(false);
  }

  if (firstList == null || otherList == null) {
    return (
      <>
        {showSpinner && <LoadingPage />}
        {showSpinner || (
          <Box h={"700px"}>
            <Card
              align="center"
              w={"60%"}
              m={"auto"}
              mt={100}
              variant={"filled"}
            >
              <CardHeader>
                <Heading size="md">[아직 작성된 게시물이 없어요! ]</Heading>
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
                  onClick={() => handleHomeClick()}
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
          </Box>
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
    <Center>
      <Box w="1400px" h="2180px" pt={"50px"}>
        <Flex mb={"30px"}>
          {/* --------------- 사이드 베스트 영상 선택 창 --------------- */}
          <Box
            w="300px"
            bg={"white"}
            boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.3)"}
          >
            <Box>
              <Flex my={"10px"} justifyContent={"space-around"}>
                <Button
                  backgroundColor={
                    isDay ? "rgb(94,72,147)" : "rgb(184,235,246)"
                  }
                  color={isDay ? "rgb(255,255,255)" : "rgb(0,0,0)"}
                  _hover={{
                    backgroundColor: "rgb(94,72,147)",
                    color: "rgb(255,255,255)",
                  }}
                  value="daily"
                  onClick={(e) => {
                    setIsDay(true);
                    setIsWeek(false);
                    setIsMonth(false);
                    handleDateClick(e);
                  }}
                  w={"80px"}
                >
                  하루
                </Button>
                <Button
                  backgroundColor={
                    isWeek ? "rgb(94,72,147)" : "rgb(184,235,246)"
                  }
                  color={isWeek ? "rgb(255,255,255)" : "rgb(0,0,0)"}
                  _hover={{
                    backgroundColor: "rgb(94,72,147)",
                    color: "rgb(255,255,255)",
                  }}
                  value="weekly"
                  onClick={(e) => {
                    setIsDay(false);
                    setIsWeek(true);
                    setIsMonth(false);
                    handleDateClick(e);
                  }}
                  w={"80px"}
                >
                  이번주
                </Button>
                <Button
                  backgroundColor={
                    isMonth ? "rgb(94,72,147)" : "rgb(184,235,246)"
                  }
                  color={isMonth ? "rgb(255,255,255)" : "rgb(0,0,0)"}
                  _hover={{
                    backgroundColor: "rgb(94,72,147)",
                    color: "rgb(255,255,255)",
                  }}
                  value="monthly"
                  onClick={(e) => {
                    setIsDay(false);
                    setIsWeek(false);
                    setIsMonth(true);
                    handleDateClick(e);
                  }}
                  w={"80px"}
                >
                  이번달
                </Button>
              </Flex>
            </Box>
            <Box ml={2}>
              <FontAwesomeIcon icon={faRankingStar} /> {dateSort} 베스트 영상
              <Text fontSize="0.8rem" color={"rgb(50,50,50)"}>
                - {dateSort} 가장 추천을 많이 받은 영상들입니다.
              </Text>
            </Box>

            <Box>
              <Flex mt={10} flexDirection="column">
                <Button
                  onClick={() => handleCategoryChange("all")}
                  backgroundColor={category === "all" ? "black" : "white"}
                  color={category === "all" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  전체게시판
                </Button>
                <Button
                  onClick={() => handleCategoryChange("C002")}
                  backgroundColor={category === "C002" ? "black" : "white"}
                  color={category === "C002" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  스포츠
                </Button>
                <Button
                  onClick={() => handleCategoryChange("C003")}
                  backgroundColor={category === "C003" ? "black" : "white"}
                  color={category === "C003" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  먹방
                </Button>
                <Button
                  onClick={() => handleCategoryChange("C004")}
                  backgroundColor={category === "C004" ? "black" : "white"}
                  color={category === "C004" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  일상
                </Button>
                <Button
                  onClick={() => handleCategoryChange("C005")}
                  backgroundColor={category === "C005" ? "black" : "white"}
                  color={category === "C005" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  요리
                </Button>
                <Button
                  onClick={() => handleCategoryChange("C006")}
                  backgroundColor={category === "C006" ? "black" : "white"}
                  color={category === "C006" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  영화/드라마
                </Button>
                <Button
                  onClick={() => handleCategoryChange("C007")}
                  backgroundColor={category === "C007" ? "black" : "white"}
                  color={category === "C007" ? "white" : "black"}
                  _hover={{ backgroundColor: "black", color: "white" }}
                  borderRadius={"0px"}
                >
                  게임
                </Button>
              </Flex>
            </Box>

            {/*<Select
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
            </Select>*/}

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

          {/* --------------- 메인 유튜브 영상 출력 --------------- */}
          <Center w={"1100px"}>
            <Flex
              flexDirection="column"
              alignItems="flex-end"
              boxShadow={"0px 4px 10px rgba(0, 0, 0, 0.3)"}
              h={"600px"}
              w={"1000px"}
              bg={"rgb(0,0,0)"}
              p={"20px 50px"}
            >
              <Box>
                {mainShowLink && (
                  /*<YoutubeInfo
                    link={mainShowLink}
                    extraVideo={true}
                    opts={{ height: "500px", width: "900px" }}
                  />*/
                  <>
                    <Text
                      w={"900px"}
                      fontSize={"xx-large"}
                      fontFamily={"Nanum Gothic"}
                      fontWeight={"bold"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      color={"rgb(255,255,255)"}
                      onClick={() => navigate("board/" + mainShowId)}
                      _hover={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        color: "rgb(200, 200, 200)",
                      }}
                    >
                      추천글 : {mainShowTitle} >>
                    </Text>
                    <ReactPlayer
                      className="video-container"
                      url={mainShowLink}
                      width={"900px"}
                      height={"500px"}
                      config={{
                        youtube: {
                          playerVars: {
                            autoplay: 0,
                          },
                        },
                      }}
                    />
                  </>
                )}
              </Box>

              <Box>
                <Button
                  color={"rgb(102,206,252)"}
                  variant={"link"}
                  onClick={() => navigate("board/list?category=" + linkNameEng)}
                >
                  {linkCategory}게시판으로 이동하기 >
                </Button>
              </Box>
            </Flex>
          </Center>
        </Flex>

        {/* ------------------------------ 1 ~ 5위 썸네일 ------------------------------ */}
        <Flex w={"1500px"}>
          <Box
            w={"250px"}
            // border={"1px solid black"}
            p={"10px"}
            bg={"rgb(255,255,255)"}
            borderRadius={"20px"}
            mx={"10px"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            boxShadow={"0 4px 8px rgba(0, 0, 0, 0.3)"}
            transition={"transform 0.1s ease-in-out"}
            _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
            style={{
              border:
                firstList.link === mainShowLink
                  ? "1px solid rgb(181,233,245)"
                  : "none",
              transform:
                firstList.link === mainShowLink ? "scale(1.1)" : undefined,
            }}
            onClick={() => {
              setLinkCategory(firstList.categoryName);
              setMainShowLink(firstList.link);
              setLinkNameEng(firstList.name_eng);
              setMainShowTitle(firstList.title);
              setMainShowId(firstList.id);
            }}
          >
            <Flex h={"20%"} position={"relative"}>
              <Badge
                fontSize="20px"
                colorScheme="yellow"
                h={"90%"}
                mr={"5px"}
                variant={"subtle"}
              >
                1위
              </Badge>
              <Text
                w={"90%"}
                lineHeight={"30px"}
                fontFamily={"Nanum Gothic"}
                fontWeight={"bold"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {firstList.title}
              </Text>
              <Box
                position={"absolute"}
                w={"50px"}
                h={"50px"}
                top={"-20px"}
                right={"-80px"}
              >
                <Img src={medal1} />
              </Box>
            </Flex>
            <Box key={firstList.link} w={"230px"} h={"130px"}>
              <YoutubeInfo link={firstList.link} extraThumbnail={true} />
            </Box>
          </Box>
          {/*<Flex w={"80%"} ml={5}>*/}
          {otherList &&
            otherList.map((other) => (
              <Box
                w={"250px"}
                // border={"1px solid black"}
                p={"10px"}
                bg={"rgb(255,255,255)"}
                borderRadius={"20px"}
                mx={"10px"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                boxShadow={"0 4px 8px rgba(0, 0, 0, 0.3)"}
                transition={"transform 0.1s ease-in-out"}
                onClick={() => {
                  setLinkCategory(other.categoryName);
                  setMainShowLink(other.link);
                  setMainShowTitle(other.title);
                  setMainShowId(other.id);
                  setLinkNameEng(other.name_eng);
                }}
                _hover={{ transform: "scale(1.1)", cursor: "pointer" }}
                style={{
                  border:
                    other.link === mainShowLink
                      ? "1px solid rgb(181,233,245)"
                      : "none",
                  transform:
                    other.link === mainShowLink ? "scale(1.1)" : undefined,
                }}
                key={other.id}
              >
                <Flex key={other.link} position={"relative"}>
                  <Badge
                    fontSize="20px"
                    colorScheme={
                      otherList.indexOf(other) + 2 === 2
                        ? "blue"
                        : otherList.indexOf(other) + 2 === 3
                          ? "orange"
                          : "purple"
                    }
                    h={"90%"}
                    mr={"5px"}
                    variant={
                      otherList.indexOf(other) + 2 === 2 ||
                      otherList.indexOf(other) + 2 === 3
                        ? "subtle"
                        : "outline"
                    }
                  >
                    {otherList.indexOf(other) + 2}위
                  </Badge>
                  <Text
                    w={"190px"}
                    lineHeight={"30px"}
                    fontFamily={"Nanum Gothic"}
                    fontWeight={"bold"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                  >
                    {other.title}
                  </Text>
                  <Box
                    position={"absolute"}
                    w={"50px"}
                    h={"50px"}
                    top={"-20px"}
                    right={"-20px"}
                  >
                    <Img
                      src={
                        otherList.indexOf(other) + 2 === 2
                          ? medal2
                          : otherList.indexOf(other) + 2 === 3
                            ? medal3
                            : ""
                      }
                    />
                  </Box>
                </Flex>
                <Box w={"230px"} h={"130px"} key={other.id}>
                  <YoutubeInfo link={other.link} extraThumbnail={true} />
                </Box>
              </Box>
            ))}
          {/*</Flex>*/}
        </Flex>

        {/* --------------- 최신 게시글 리스트 --------------- */}
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
    </Center>
  );
}
