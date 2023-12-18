import { Box, Flex, Text } from "@chakra-ui/react";
import YoutubeInfo from "../../component/YoutubeInfo";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MiniHomepyHome({
  topRankBoardList,
  newBoardList,
  favoriteBoardList,
}) {
  let navigate = useNavigate();

  // 순위 매기기
  const getRankSuffix = (index) => {
    const number = index + 1;
    switch (number) {
      case 1:
        return "1st";
      case 2:
        return "2nd";
      case 3:
        return "3rd";
      default:
        return `${number}th`;
    }
  };

  // 순위 색표시
  const getRankColor = (index) => {
    switch (index) {
      case 0:
        return "#FFB914";
      case 1:
        return "#a0a0a0";
      case 2:
        return "#8B5927";
      default:
        return "#282828";
    }
  };
  return (
    <>
      <Box
        pt={10}
        w={"100%"}
        h={"100%"}
        bg="transparent"
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
            fontSize={"30px"}
            sx={{
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage:
                "linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%);",

              border: "none",
            }}
            fontFamily={"'Ultra', serif"}
          >
            TOP{" "}
            <Text display="inline" fontSize={"40px"}>
              10
            </Text>
          </Text>

          <Box
            w={"100%"}
            display={"flex"}
            justifyContent="flex-start"
            bg=" rgba( 255, 255, 255, 0.2 )"
            alignItems={"center"}
            borderRadius={"10px"}
            color={"#dcdcdc"}
            mb={10}
            fontFamily={"'Jua', sans-serif"}
            // border={"1px solid white"}
            sx={{
              overflowX: "scroll",
              "::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
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
            {topRankBoardList !== null &&
              topRankBoardList.map((boardList, index) => (
                <Box
                  p={"15px"}
                  bgGradient="linear(to right, black,transparent)"
                  borderRadius={"20px"}
                  key={boardList.id}
                  mt={5}
                  mr={3}
                  mb={5}
                  minWidth={"300px"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/board/" + boardList.id);
                  }}
                >
                  <Flex>
                    <Box>
                      <Box borderRadius={"20px"} mb={3} position={"relative"}>
                        <Box
                          color={"#FFD732"}
                          w={"60px"}
                          h={"60px"}
                          borderRadius={"30px"}
                          display={"flex"}
                          flexDirection={"column"}
                          justifyContent={"center"}
                          bg={"#dcdcdc"}
                          alignItems={"center"}
                          border={`6px  double ${getRankColor(index)}`}
                          style={{
                            position: "absolute",
                            top: "5px",
                            left: "5px",
                          }}
                        >
                          <Text
                            color={getRankColor(index)}
                            fontFamily={"'Gasoek One', sans-serif"}
                          >
                            {getRankSuffix(index)}
                          </Text>
                        </Box>
                        <YoutubeInfo
                          link={boardList.link}
                          extraThumbnail={true}
                          thumbnailWidth={300}
                          thumbnailHeight={200}
                        />
                      </Box>
                      <Flex
                        flexDirection={"column"}
                        alignItem={"center"}
                        justifyContent={"center"}
                        pl={"15px"}
                      >
                        <Box color={"#dcdcdc"} fontSize={"20px"} mb={2}>
                          {boardList.title.length > 15
                            ? `${boardList.title.slice(0, 20)}..`
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
          <Text
            fontSize={"30px"}
            borderTop={"1px solid #dcdcdc"}
            pt={5}
            sx={{
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage: "linear-gradient(#B621FE,#1FD1F9)",

              border: "none",
            }}
          >
            What's New?
          </Text>
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent="flex-start"
            alignItems={"center"}
            color={"#dcdcdc"}
            bg=" rgba( 255, 255, 255, 0.2 )"
            mb={10}
            borderRadius={"10px"}
            fontFamily={"'Jua', sans-serif"}
            sx={{
              overflowX: "scroll",
              "::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
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
            {newBoardList !== null &&
              newBoardList.map((boardList) => (
                <Box
                  p={"15px"}
                  w="fit-content"
                  bgGradient="linear(to right, black,transparent)"
                  borderRadius={"20px"}
                  minWidth={"300px"}
                  key={boardList.id}
                  mt={5}
                  mb={5}
                  mr={3}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/board/" + boardList.id);
                  }}
                >
                  <Flex w="100%" flexDirection={"column"} alignItems={"center"}>
                    <Box>
                      <Box borderRadius={"20px"} mb={3}>
                        <YoutubeInfo
                          link={boardList.link}
                          extraThumbnail={true}
                          thumbnailWidth={300}
                          thumbnailHeight={200}
                        />
                      </Box>
                      <Flex
                        flexDirection={"column"}
                        alignItem={"center"}
                        justifyContent={"center"}
                        pl={"15px"}
                      >
                        <Box color={"#dcdcdc"} fontSize={"20px"} mb={2}>
                          {boardList.title.length > 15
                            ? `${boardList.title.slice(0, 20)}..`
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
          <Text
            fontSize={"30px"}
            borderTop={"1px solid #dcdcdc"}
            pt={5}
            sx={{
              color: "transparent",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundImage: "linear-gradient(#FF1053, #F7ACCF)",

              border: "none",
            }}
          >
            My Favorite Video
          </Text>
          <Box
            w={"100%"}
            display={"flex"}
            justifyContent="flex-start"
            alignItems={"center"}
            color={"#dcdcdc"}
            bg=" rgba( 255, 255, 255, 0.2 )"
            mb={10}
            borderRadius={"10px"}
            fontFamily={"'Jua', sans-serif"}
            sx={{
              overflowX: "scroll",
              "::-webkit-scrollbar": {
                width: "10px",
                height: "10px",
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
            {favoriteBoardList !== null &&
              favoriteBoardList.map((boardList) => (
                <Box
                  p={"15px"}
                  w="fit-content"
                  bgGradient="linear(to right, black,black,transparent)"
                  borderRadius={"20px"}
                  w="fit-content"
                  key={boardList.id}
                  mt={5}
                  mb={5}
                  mr={3}
                  minWidth={"300px"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/board/" + boardList.id);
                  }}
                >
                  <Flex w="100%" flexDirection={"column"} alignItems={"center"}>
                    <Box>
                      <Box borderRadius={"20px"} mb={3}>
                        <YoutubeInfo
                          link={boardList.link}
                          extraThumbnail={true}
                          thumbnailWidth={300}
                          thumbnailHeight={200}
                        />
                      </Box>
                      <Flex
                        flexDirection={"column"}
                        alignItem={"center"}
                        justifyContent={"center"}
                        pl={"15px"}
                      >
                        <Box color={"#dcdcdc"} fontSize={"20px"} mb={2}>
                          {boardList.title.length > 15
                            ? `${boardList.title.slice(0, 20)}..`
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
