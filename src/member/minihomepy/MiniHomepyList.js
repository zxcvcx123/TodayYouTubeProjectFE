import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import YoutubeInfo from "../../component/YoutubeInfo";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function MiniHomepyList({
  loginMember,
  member_id,
  setCategoryOrdedBy,
  boardListAll,
}) {
  let navigate = useNavigate();

  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        bg="transparent"
        maxHeight={"100%"}
        fontFamily={"'Jua', sans-serif"}
        sx={{
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: "10px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: "transparent",
            borderRadius: "10px",
          },
          ":hover::-webkit-scrollbar-thumb": {
            background: "#dcdcdc",
          },
        }}
      >
        <div className="middleContentImage">
          <Text
            pb={1}
            mb={3}
            fontSize={"30px"}
            color={"#dcdcdc"}
            borderBottom={"1px solid #dcdcdc"}
          >
            {}님의 게시글
          </Text>
          <Flex justifyContent={"space-between"}>
            <Select
              w={"100px"}
              defaultValue={"latest"}
              color={"#dcdcdc"}
              bg="transparent"
              mr={5}
              onChange={(e) => {
                setCategoryOrdedBy(e.target.value);
              }}
            >
              <option style={{ background: "#0B2443" }} value="latest">
                최신순
              </option>
              <option style={{ background: "#0B2443" }} value="like">
                추천순
              </option>
              <option style={{ background: "#0B2443" }} value="views">
                조회수순
              </option>
            </Select>
            <Box mr={"5px"} mb={"10px"}>
              <FormControl>
                <Flex>
                  <Input
                    color={"#dcdcdc"}
                    placeholder="검색어를 입력해 주세요."
                    borderLeftRadius={"20px"}
                    w={"180px"}
                  />
                  <Button
                    pr={"5px"}
                    borderRightRadius={"20px"}
                    border={"1px solid #dcdcdc"}
                    bg={"transparent"}
                    color={"#dcdcdc"}
                    variant="link"
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Button>
                </Flex>
              </FormControl>
            </Box>
          </Flex>
          <Box
            w={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            color={"#dcdcdc"}
            mb={10}
            fontFamily={"'Jua', sans-serif"}
          >
            {boardListAll !== null &&
              boardListAll.map((boardList, index) => (
                <Box
                  p={"15px"}
                  w="100%"
                  bg=" rgba( 255, 255, 255, 0.1 )"
                  borderRadius={"20px"}
                  key={boardList.id}
                  mt={2}
                  mb={2}
                  onClick={() => {
                    navigate("/board/" + boardList.id);
                  }}
                >
                  <Flex w="100%" alignItems={"center"}>
                    <Box display={"flex"}>
                      <Box borderRadius={"20px"}>
                        <YoutubeInfo
                          link={boardList.link}
                          extraThumbnail={true}
                          thumbnailWidth={200}
                          thumbnailHeight={100}
                        />
                      </Box>
                      <Flex
                        flexDirection={"column"}
                        alignItem={"center"}
                        justifyContent={"center"}
                        pl={"15px"}
                      >
                        <Box color={"#dcdcdc"} fontSize={"20px"}>
                          {boardList.title.length > 30
                            ? `${boardList.title.slice(0, 30)}..`
                            : boardList.title}
                        </Box>
                        <Box color={"#a0a0a0"} fontSize={"15px"}>
                          {boardList.nickname}
                        </Box>
                        <Flex
                          color={"#a0a0a0"}
                          fontSize={"12px"}
                          alignItems={"center"}
                        >
                          <Box textAlign={"center"}>
                            좋아요 {boardList.countlike}개
                          </Box>
                          <Box
                            mr={1.5}
                            ml={1.5}
                            h={"4px"}
                            w={"4px"}
                            borderRadius={"2px"}
                            bg={"#dcdcdc"}
                            border={"1px solid #dcdcdc"}
                          ></Box>
                          <Box textAlign={"center"}>
                            조회수 {boardList.views}회
                          </Box>
                          <Box
                            mr={1.5}
                            ml={1.5}
                            h={"4px"}
                            w={"4px"}
                            borderRadius={"2px"}
                            bg={"#dcdcdc"}
                            border={"1px solid #dcdcdc"}
                          ></Box>
                          <Box>{boardList.ago}</Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              ))}
          </Box>
        </div>
      </Box>
    </>
  );
}
