import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import Pagination from "../page/Pagination";
import YoutubeInfo from "../component/YoutubeInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBorderAll,
  faComment,
  faList,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { SearchComponent } from "../page/SearchComponent";
import PageCount from "../page/PageCount";
import { DetectLoginContext } from "../component/LoginProvider";
import ScrollToTop from "../util/ScrollToTop";
import pageCount from "../page/PageCount";
import LoadingPage from "../component/LoadingPage";

function BoardList() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  // state
  const [boardList, setBoardList] = useState([]);
  // 빈 배열로 받으면 null 값 오류 안나옴
  const [pageInfo, setPageInfo] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [boardInfo, setBoardInfo] = useState("");
  const [listCount, setListCount] = useState(null);
  // Loading state
  const [loading, setLoading] = useState(true);

  const [params] = useSearchParams("");

  // 몇 개 씩 보여줄건지
  const [pageCount, setPageCount] = useState(10);

  // 현재 URL 파악하기
  const location = useLocation();

  // 현재 URL에서 category 명 추출
  let currentParams = new URLSearchParams(location.search).get("category");

  // modal
  const { isOpen, onClose, onOpen } = useDisclosure();

  // navigate
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // 'category' 쿼리스트링이 없다면 추가
    if (!searchParams.has("category")) {
      searchParams.set("category", "sports");
      navigate(`${location.pathname}?${searchParams.toString()}`);
    }
  }, [navigate, location]);

  // 게시물 목록 불러오기
  useEffect(() => {
    axios
      .get("/api/board/list?" + params)
      .then((response) => {
        setBoardList(response.data.boardList);
        setPageInfo(response.data.pageInfo);
        setBoardInfo(response.data.boardInfo);
        setListCount(response.data.listCount);
      })
      .catch((error) => {
        window.alert("게시글 목록을 가져오는 중에 오류가 발생했습니다.");
      })
      .finally(() => {
        setLoading(false);
      });

    if (params.get("s") === null) {
      setPageCount(10);
    }
  }, [location]);

  // 로딩중일 경우 페이지 표시
  if (loading) {
    return <LoadingPage />;
  }

  // 게시물 목록 한 페이지에 보여줄 게시글의 갯수 설정 버튼
  function handlePageCount(e) {
    const newPageCount = e.target.value;
    setPageCount(newPageCount);

    params.set("s", newPageCount); // 직접 이벤트 객체에서 값을 가져옴
    params.set("p", 1);
    navigate("?" + params, { state: { refresh: true } });
  }

  // 리스트 뷰 형태로 게시물 목록 보여주기
  const switchToListView = () => {
    setCurrentView("list");
  };

  // 그리드 뷰 형태로 게시물 목록 보여주기
  const switchToGridView = () => {
    setCurrentView("grid");
  };

  // 글쓰기 버튼 클릭
  function handleWriteClick() {
    // 글쓰기 버튼 클릭시 로그인 되어 있지 않다면 로그인 창으로 이동
    if (!token.detectLogin) {
      onOpen();
    } else {
      navigate("/board/write?category=" + currentParams, { state: boardInfo });
    }
  }

  // 리스트 형태 게시물 제목 렌더링
  function renderListTitle(board) {
    // 제목의 길이가 20자 이상일 경우 ...으로 자르고 툴팁으로 전체 제목을 표시
    if (board.title.length > 20) {
      return (
        <>
          <Tooltip label={board.title}>
            <Flex gap={2}>
              {`${board.title.slice(0, 35)}...`}
              <FontAwesomeIcon icon={faComment} /> {board.count_comment}
            </Flex>
          </Tooltip>
          {boardInfo === "통합" && (
            <Box ml={"auto"}>
              <Text>[{board.categoryName}]</Text>
            </Box>
          )}
        </>
      );
    }

    // 일반적인 게시물 제목 표시 (툴팁 없음)
    return (
      <>
        <Flex gap={2}>
          <Text>{board.title}</Text>
          <FontAwesomeIcon icon={faComment} />
          <Text>{board.count_comment}</Text>
        </Flex>
        {boardInfo === "통합" && (
          <Box ml={"auto"}>
            <Text>[{board.categoryName}] </Text>
          </Box>
        )}
      </>
    );
  }

  // 그리드 형태 게시물 제목 렌더링
  function renderGreedTitle(board) {
    // 제목의 길이가 15자 이상일 경우 ...으로 자르고 툴팁으로 전체 제목을 표시
    if (board.title.length > 15) {
      return (
        <Tooltip label={board.title}>
          <Flex>
            <Text fontWeight={"bold"}>{`${board.title.slice(0, 15)}...`}</Text>
            {boardInfo === "all" && (
              <Box ml={"auto"}>
                <Text>{board.categoryName} </Text>
              </Box>
            )}
          </Flex>
        </Tooltip>
      );
    }

    // 일반적인 게시물 제목 표시 (툴팁 없음)
    return (
      <Flex>
        <Text fontWeight={"bold"}>{board.title}</Text>
        {boardInfo === "all" && (
          <Box ml={"auto"}>
            <Text>{board.categoryName} </Text>
          </Box>
        )}
      </Flex>
    );
  }

  // 게시물 클릭 (게시물 보기 화면으로 이동)
  function handleBoardClick(boardId) {
    navigate("/board/" + boardId + "?category=" + currentParams, {
      state: boardInfo,
    });
    // 조회수 증가 요청
    axios.post("/api/board/" + boardId + "/increaseView");
  }

  // -------------------------------------------------- 화면 렌더링 --------------------------------------------------
  return (
    <Flex justifyContent={"center"}>
      <Box mb={"50px"}>
        {/* ------------------------- 게시글 목록 상단 바 ------------------------- */}
        <Box my={5}>
          <Box w={"500px"} borderBottom={"5px solid rgb(0,35,150,0.5)"}>
            {params.get("category") !== "all" ? (
              <Heading>{boardInfo} 게시판</Heading>
            ) : (
              <>
                <Heading>통합검색</Heading>
                <Text>
                  {params.get("k")}의 검색결과 ({listCount})건
                </Text>
              </>
            )}
          </Box>
        </Box>
        <Flex justify={"flex-end"} mb={5}>
          <Flex>
            {/* 한 페이지 출력 갯수 설정 (5, 10, 20) */}
            <Box>
              <Select
                value={pageCount}
                onChange={(e) => handlePageCount(e)}
                bg={"white"}
              >
                <option value={5}>5개씩 보기</option>
                <option value={10}>10개씩 보기</option>
                <option value={20}>20개씩 보기</option>
              </Select>
            </Box>

            {/* ------------------------- 게시글 뷰 형태 선택 ------------------------- */}
            <Box ml={3}>
              <Tooltip label={"리스트 형태 보기"}>
                <Button
                  onClick={switchToListView}
                  colorScheme="facebook"
                  mr={1}
                >
                  <FontAwesomeIcon icon={faList} />
                </Button>
              </Tooltip>
              <Tooltip label={"격자 형태 보기 "}>
                <Button onClick={switchToGridView} colorScheme="facebook">
                  <FontAwesomeIcon icon={faBorderAll} />
                </Button>
              </Tooltip>
            </Box>
          </Flex>
        </Flex>

        {/* ------------------------- 게시글 목록 본문 ------------------------- */}
        {/* currentView에 따라 게시판 목록 형태가 달라짐 */}
        {currentView === "list" ? (
          <>
            {/* ---------------------------------------- 리스트 형태 보기 ---------------------------------------------*/}
            <Table size={"sm"}>
              <Thead>
                <Tr>
                  <Th
                    borderTop={"1px solid rgb(0,35,150,0.5)"}
                    borderBottom={"1px solid rgb(0,35,150,0.5)"}
                    textAlign={"center"}
                    fontSize={"small"}
                  >
                    번호
                  </Th>
                  <Th
                    borderTop={"1px solid rgb(0,35,150,0.5)"}
                    borderBottom={"1px solid rgb(0,35,150,0.5)"}
                    textAlign={"center"}
                    fontSize={"small"}
                  >
                    제목
                  </Th>
                  <Th
                    borderTop={"1px solid rgb(0,35,150,0.5)"}
                    borderBottom={"1px solid rgb(0,35,150,0.5)"}
                    textAlign={"center"}
                    fontSize={"small"}
                  >
                    좋아요
                  </Th>
                  <Th
                    borderTop={"1px solid rgb(0,35,150,0.5)"}
                    borderBottom={"1px solid rgb(0,35,150,0.5)"}
                    textAlign={"center"}
                    fontSize={"small"}
                  >
                    작성자
                  </Th>
                  <Th
                    borderTop={"1px solid rgb(0,35,150,0.5)"}
                    borderBottom={"1px solid rgb(0,35,150,0.5)"}
                    textAlign={"center"}
                    fontSize={"small"}
                  >
                    작성일시
                  </Th>
                  <Th
                    borderTop={"1px solid rgb(0,35,150,0.5)"}
                    borderBottom={"1px solid rgb(0,35,150,0.5)"}
                    textAlign={"center"}
                    fontSize={"small"}
                  >
                    조회수
                  </Th>
                </Tr>
              </Thead>

              <Tbody>
                {boardList &&
                  boardList
                    /* board.is_show=true 만 필터 */
                    .filter((board) => board.is_show)
                    .map((board) => (
                      <Tr
                        key={board.id}
                        onClick={() => handleBoardClick(board.id)}
                        _hover={{
                          backgroundColor: "lightcyan",
                          cursor: "pointer",
                        }}
                      >
                        {/* 게시판 번호 출력 */}
                        <Td
                          textAlign={"center"}
                          verticalAlign="middle"
                          borderBottom={"1px solid white"}
                          w={"80px"}
                        >
                          {board.rownum}
                        </Td>
                        {/* 썸네일, 제목 출력 */}
                        <Td
                          verticalAlign="middle"
                          borderBottom={"1px solid white"}
                          w={"580px"}
                          whiteSpace={"nowrap"}
                        >
                          <Flex align={"center"} gap={"10px"}>
                            {/* 썸네일 출력 */}
                            <Box w={"120px"} h={"70px"}>
                              <YoutubeInfo
                                link={board.link}
                                extraThumbnail={true}
                                toolTip={true}
                              />
                            </Box>
                            {/* 제목 출력 */}
                            {renderListTitle(board)}
                          </Flex>
                        </Td>
                        <Td
                          textAlign={"center"}
                          verticalAlign="middle"
                          borderBottom={"1px solid white"}
                          w={"80px"}
                        >
                          {board.countlike}
                        </Td>
                        <Td
                          textAlign={"center"}
                          verticalAlign="middle"
                          borderBottom={"1px solid white"}
                          minW={"100px"}
                          maxW={"100px"}
                          overflow={"hidden"}
                          textOverflow={"ellipsis"}
                          whiteSpace={"nowrap"}
                        >
                          {board.board_member_id}
                        </Td>
                        <Td
                          textAlign={"center"}
                          verticalAlign="middle"
                          borderBottom={"1px solid white"}
                          w={"100px"}
                        >
                          {board.ago}
                        </Td>
                        <Td
                          textAlign={"center"}
                          verticalAlign="middle"
                          borderBottom={"1px solid white"}
                          w={"80px"}
                        >
                          {board.views}
                        </Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
            {/* -------------------- 검색, 페이징 --------------------*/}
            <Flex justify={"flex-end"} mt={2}>
              {currentParams !== "all" && (
                <Button onClick={handleWriteClick} colorScheme={"facebook"}>
                  글쓰기
                </Button>
              )}
            </Flex>
            <Center>
              <Box width={"70%"}>
                <SearchComponent />
                <Pagination pageInfo={pageInfo} />
              </Box>
            </Center>
          </>
        ) : (
          <>
            {/* ---------------------------------------- 그리드 형태 보기 ---------------------------------------------*/}
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={[4]}>
              {boardList &&
                boardList
                  /* board.is_show=true 만 필터 */
                  .filter((board) => board.is_show)
                  .map((board) => (
                    <Card
                      key={board.id}
                      w={"270px"}
                      h={"300px"}
                      border={"1px solid lightgray"}
                      onClick={() => navigate("/board/" + board.id)}
                      _hover={{
                        backgroundColor: "lightcyan",
                        cursor: "pointer",
                      }}
                    >
                      <Center>
                        <CardHeader p={"10px"} w={"250px"} h={"150px"}>
                          {/* 썸네일 출력 */}
                          <YoutubeInfo
                            link={board.link}
                            extraThumbnail={true}
                          />
                        </CardHeader>
                      </Center>
                      <CardBody p={"10px"}>
                        {/* 제목 출력 */}
                        {renderGreedTitle(board)}
                      </CardBody>

                      <CardFooter p={"10px"}>
                        <Box w={"100%"}>
                          {/* id, 작성일자 출력 */}
                          <Text>{board.board_member_id}</Text>
                          <Text>{board.ago}</Text>
                          {/* 좋아요, 댓글 갯수, 조회수 출력*/}
                          <Flex w={"100%"} justifyContent={"space-between"}>
                            <Flex>
                              <Box mr={3}>
                                <FontAwesomeIcon icon={faThumbsUp} />{" "}
                                {board.countlike}
                              </Box>
                              <Box>
                                <FontAwesomeIcon icon={faComment} />{" "}
                                {board.count_comment}
                              </Box>
                            </Flex>
                            <Box>
                              <Text>조회수 : {board.views}</Text>
                            </Box>
                          </Flex>
                        </Box>
                      </CardFooter>
                    </Card>
                  ))}
            </SimpleGrid>
            {/* ------------------------- 검색, 페이징 섹션 ------------------------- */}

            <Box>
              <SearchComponent />
              <Pagination pageInfo={pageInfo} />
            </Box>
          </>
        )}
      </Box>

      {/* ------------------------- 모달 (비로그인 사용자 글쓰기 버튼 클릭) ------------------------- */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>로그인 필요</ModalHeader>
          <ModalCloseButton />
          <ModalBody>게시글을 쓰기 위해 로그인이 필요합니다.</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => navigate("/member/login")}
            >
              로그인하러 가기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default BoardList;
