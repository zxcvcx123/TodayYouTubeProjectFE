import { Box, Flex, Text } from "@chakra-ui/react";
import YoutubeInfo from "../../component/YoutubeInfo";
import React from "react";
import { useNavigate } from "react-router-dom";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function MiniHomepyHome({ topRankBoardList, newBoardList }) {
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
        w={"100%"}
        h={"100%"}
        bg="transparent"
        maxHeight={"100%"}
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
            color={"#FFD732"}
            fontFamily={"'Ultra', serif"}
          >
            TOP{" "}
            <Text display="inline" fontSize={"40px"}>
              5
            </Text>
          </Text>
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
            {topRankBoardList !== null &&
              topRankBoardList.map((boardList, index) => (
                <Box
                  p={"15px"}
                  w="fit-content"
                  bg=" rgba( 255, 255, 255, 0.1 )"
                  borderRadius={"20px"}
                  key={boardList.id}
                  mt={5}
                  mb={5}
                  _hover={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/board/" + boardList.id);
                  }}
                >
                  <Flex w="100%" flexDirection={"column"} alignItems={"center"}>
                    <Box>
                      <Box borderRadius={"20px"} mb={3} position={"relative"}>
                        <Box
                          color={"#FFD732"}
                          w={"50px"}
                          h={"50px"}
                          borderRadius={"25px"}
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
            color="#dcdcdc"
            borderTop={"1px solid #dcdcdc"}
            pt={5}
          >
            What's New?
          </Text>
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
            {newBoardList !== null &&
              newBoardList.map((boardList) => (
                <Box
                  p={"15px"}
                  w="fit-content"
                  bg=" rgba( 255, 255, 255, 0.1 )"
                  borderRadius={"20px"}
                  w="fit-content"
                  key={boardList.id}
                  mt={5}
                  mb={5}
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
