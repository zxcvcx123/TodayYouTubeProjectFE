import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import YoutubeInfo from "../component/YoutubeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faList } from "@fortawesome/free-solid-svg-icons";

function BoardList() {
  // state
  const [boardList, setBoardList] = useState(null);
  const [currentView, setCurrentView] = useState("list");

  // navigate
  const navigate = useNavigate();

  // 초기 이펙트
  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((response) => setBoardList(response.data));
  }, []);

  // 리스트 뷰 세팅 동작
  const switchToListView = () => {
    setCurrentView("list");
  };

  // 그리드 뷰 세팅 동작
  const switchToGridView = () => {
    setCurrentView("grid");
  };

  return (
    <Flex justifyContent={"center"}>
      <Box w={"90%"}>
        {/* 게시글 목록 상단 바 */}
        <Flex justifyContent={"space-between"}>
          <Box>
            <Button onClick={() => navigate("/write")} colorScheme="blue">
              글쓰기
            </Button>
          </Box>
          <Box>
            <Tooltip label={"리스트 형태 보기"}>
              <Button onClick={switchToListView}>
                <FontAwesomeIcon icon={faList} />
              </Button>
            </Tooltip>
            <Tooltip label={"격자 형태 보기 "}>
              <Button onClick={switchToGridView}>
                <FontAwesomeIcon icon={faBorderAll} />
              </Button>
            </Tooltip>
          </Box>
        </Flex>

        {/* currentView에 따라 게시판 목록 형태가 달라짐 */}
        {currentView === "list" ? (
          <>
            {/* -------------------- 리스트 형태 보기 -------------------------*/}
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th textAlign={"center"}>번호</Th>
                  <Th textAlign={"center"}>제목</Th>
                  <Th textAlign={"center"}>좋아요</Th>
                  <Th textAlign={"center"}>작성자</Th>
                  <Th textAlign={"center"}>작성일시</Th>
                  <Th textAlign={"center"}>조회수</Th>
                </Tr>
              </Thead>

              <Tbody>
                {boardList &&
                  boardList.map((board) => (
                    <Tr
                      key={board.id}
                      onClick={() => navigate("/board/" + board.id)}
                      _hover={{
                        backgroundColor: "lightcyan",
                        cursor: "pointer",
                      }}
                    >
                      {/* is_show = true 인 경우 */}
                      {board.is_show ? (
                        <>
                          <Td textAlign={"center"}>{board.id}</Td>
                          <Td>
                            <Flex align={"center"} gap={"10px"}>
                              <YoutubeInfo
                                link={board.link}
                                extraThumbnail={true}
                                thumbnailWidth={120}
                                thumbnailHeight={70}
                                toolTip={true}
                              />

                              {/* 길이가 길 경우 20자로 제한하고 나머지는 ...으로 표시 */}
                              {/* 짤린 제목에 커서를 올릴 시 제목이 툴팁으로 나타남 */}
                              {board.title.length > 20 ? (
                                <Tooltip label={board.title}>
                                  <Text>{`${board.title.slice(
                                    0,
                                    20,
                                  )}...`}</Text>
                                </Tooltip>
                              ) : (
                                <Text>{board.title}</Text>
                              )}
                            </Flex>
                          </Td>
                          <Td textAlign={"center"}>좋아요</Td>
                          <Td textAlign={"center"}>{board.board_member_id}</Td>
                          <Td textAlign={"center"}>{board.created_at}</Td>
                          <Td textAlign={"center"}>조회수</Td>
                        </>
                      ) : (
                        <>
                          {/* is_show = false 인 경우 */}
                          <Td textAlign={"center"}>{board.id}</Td>
                          <Td colSpan={5}>
                            <Text textAlign={"center"}>
                              삭제된 게시물입니다.
                            </Text>
                          </Td>
                        </>
                      )}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </>
        ) : (
          <>
            {/* -------------------- 그리드 형태 보기 -------------------------*/}
            <SimpleGrid columns={[2, 3, 4, 5, 6, 7]} spacing={4}>
              {boardList &&
                boardList.map((board) => (
                  <Card
                    key={board.id}
                    w={"200px"}
                    h={"200px"}
                    border={"1px solid black"}
                  >
                    {/* is_show = true 인 경우 */}
                    {board.is_show ? (
                      <>
                        <CardHeader p={"10px"}>
                          <YoutubeInfo
                            link={board.link}
                            extraThumbnail={true}
                            thumbnailWidth={120}
                            thumbnailHeight={70}
                            toolTip={true}
                          />
                        </CardHeader>
                        <CardBody p={"10px"}>
                          {board.title.length > 10 ? (
                            <Tooltip label={board.title}>
                              <Text>{`${board.title.slice(0, 10)}...`}</Text>
                            </Tooltip>
                          ) : (
                            <Text>{board.title}</Text>
                          )}
                        </CardBody>
                        <CardFooter p={"10px"}>
                          {board.board_member_id}
                        </CardFooter>
                      </>
                    ) : (
                      <>
                        {/* is_show = false 인 경우 */}
                        <CardHeader p={"10px"}>
                          <YoutubeInfo
                            link={board.link}
                            extraThumbnail={true}
                            thumbnailWidth={120}
                            thumbnailHeight={70}
                            toolTip={true}
                          />
                        </CardHeader>
                        <CardBody p={"10px"}>
                          <Text color={"red"}>삭제됨</Text>
                        </CardBody>
                        <CardFooter p={"10px"}>
                          <Text color={"red"}>삭제됨</Text>
                        </CardFooter>
                      </>
                    )}
                  </Card>
                ))}
            </SimpleGrid>
          </>
        )}
      </Box>
    </Flex>
  );
}

export default BoardList;
