import {
  Box,
  Button,
  Center,
  Flex,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MainBoardList } from "./MainBoardList";
import axios from "axios";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import YoutubeInfo from "../component/YoutubeInfo";

export function MainView() {
  const [category, setCategory] = useState("all");
  const [firstList, setFirstList] = useState(null);
  const [otherList, setOtherList] = useState(null);

  const params = new URLSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    params.set("c", category);
    axios.get("/api?" + params).then((response) => {
      setFirstList(response.data.firstBoardList);
      setOtherList(response.data.otherBoardList);
      navigate("?" + params);
    });
  }, [category]);

  function handleCategoryChange(e) {
    setCategory(e.target.value);
    console.log(category);
  }

  if (firstList == null) {
    return <Spinner />;
  }
  console.log(firstList);

  if (otherList == null) {
    return <Spinner />;
  }
  console.log(otherList);

  // 임시메인
  return (
    <Box bg="black" w="100%" h="700px" p={4}>
      {/* menulist 하던거 */}
      {/*<Menu>*/}
      {/*  <MenuButton*/}
      {/*    onChange={(e) => handleCategoryChange(e)}*/}
      {/*    as={IconButton}*/}
      {/*    aria-label="Options"*/}
      {/*    icon={<HamburgerIcon />}*/}
      {/*  />*/}
      {/*  <MenuList>*/}
      {/*    <MenuOptionGroup defaultValue="all" value={category} title="게시판">*/}
      {/*      <MenuItemOption value="all">전체</MenuItemOption>*/}
      {/*      <MenuItemOption value="mukbang">먹방</MenuItemOption>*/}
      {/*      <MenuItemOption value="game">겜</MenuItemOption>*/}
      {/*      <MenuItemOption value="4">4</MenuItemOption>*/}
      {/*      <MenuItemOption value="5">5</MenuItemOption>*/}
      {/*    </MenuOptionGroup>*/}
      {/*  </MenuList>*/}
      {/*</Menu>*/}

      <Select
        onChange={handleCategoryChange}
        pos="absolute"
        top="40"
        left="10"
        width="15%"
        border={"1px"}
        borderColor={"red"}
        backgroundColor="white"
      >
        <option value="all">전체게시판</option>
        <option value="C002">스포츠게시판</option>
        <option value="C003">먹방게시판</option>
        <option value="C004">일상게시판</option>
        <option value="C005">요리게시판</option>
        <option value="C006">영화/드라마 게시판</option>
        <option value="C007">게임게시판</option>
      </Select>
      <Center w="60%" h="70%" m="auto" border={"1px"} borderColor={"red"}>
        <Box width={"100%"} height="100%">
          {firstList &&
            firstList.map((first) => (
              <YoutubeInfo
                link={first.link}
                extraVideo={true}
                thumbnailWidth={320}
                thumbnailHeight={180}
              />
            ))}
        </Box>
      </Center>
      <Center mt={5}>
        <Flex w="70%" h="100%" m="auto" mt={2} justify="space-between">
          {otherList &&
            otherList.map((other) => (
              <Box w="22%" h={"50%"} border="1px" borderColor="blue">
                <YoutubeInfo
                  link={other.link}
                  extraVideo={true}
                  thumbnailWidth={50}
                  thumbnailHeight={30}
                />
              </Box>
            ))}
        </Flex>
      </Center>
      {/*<MainBoardList />*/}
    </Box>
  );
}
