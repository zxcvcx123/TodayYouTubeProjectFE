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

  const params = new URLSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    params.set("c", category);
    params.set("sort", dateSort);
    axios.get("/api?" + params).then((response) => {
      setFirstList(response.data.firstBoardList);
      setOtherList(response.data.otherBoardList);
      navigate("?" + params);
    });
  }, [category, dateSort]);

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  if (firstList == null) {
    return <Spinner />;
  }
  console.log(firstList);

  if (otherList == null) {
    return <Spinner />;
  }
  console.log(otherList);

  function handleDateClick(e) {
    setDateSort(e.target.value);
  }

  // 임시메인
  return (
    <Box bg="black" w="100%" h="700px" p={4}>
      {/*menulist 하던거*/}
      {/*<Menu>*/}
      {/*  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>*/}
      {/*    게시판 선택*/}
      {/*  </MenuButton>*/}
      {/*  <MenuList value={category} onChange={(e) => handleCategoryChange(e)}>*/}
      {/*    <MenuOptionGroup title="게시판">*/}
      {/*      <MenuItemOption value="all">전체</MenuItemOption>*/}
      {/*      <MenuItemOption value="C003">먹방</MenuItemOption>*/}
      {/*      <MenuItemOption value="C007">겜</MenuItemOption>*/}
      {/*      <MenuItemOption value="C004">일상</MenuItemOption>*/}
      {/*      <MenuItemOption value="C002">스포츠</MenuItemOption>*/}
      {/*    </MenuOptionGroup>*/}
      {/*  </MenuList>*/}
      {/*</Menu>*/}
      <Select
        onChange={handleCategoryChange}
        pos="absolute"
        top="60"
        left="10"
        width="15%"
        backgroundColor="white"
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
      <Flex ml={10} mb={3}>
        <Button mr={2} value="daily" onClick={(e) => handleDateClick(e)}>
          일간
        </Button>
        <Button mr={2} value="weekly" onClick={(e) => handleDateClick(e)}>
          주간
        </Button>
        <Button value="monthly" onClick={(e) => handleDateClick(e)}>
          월간
        </Button>
      </Flex>
      <Box color="white" ml={10}>
        <FontAwesomeIcon icon={faRankingStar} /> 주간 베스트 영상
        <Text fontSize="0.8rem" color="gray.400">
          - 한 주간 가장 추천을 많이 받은 영상들입니다.
        </Text>
      </Box>
      <Center w="60%" h="70%" m="auto" mt={"-95px"}>
        {firstList &&
          firstList.map((first) => (
            <Box width={"100%"} height="100%" key={first.id}>
              <YoutubeInfo
                link={first.link}
                extraVideo={true}
                opts={{ height: "470", width: "1050" }}
              />
            </Box>
          ))}
      </Center>
      <Center mt={5}>
        <Flex w="70%" h="100%" m="auto" mt={2} justify="space-between">
          {otherList &&
            otherList.map((other) => (
              <Box w="22%" h={"50%"} key={other.id}>
                <YoutubeInfo
                  link={other.link}
                  extraVideo={true}
                  opts={{ height: 180, width: 250 }}
                />
              </Box>
            ))}
        </Flex>
      </Center>
      {/*<MainBoardList />*/}
    </Box>
  );
}
