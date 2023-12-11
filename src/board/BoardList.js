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
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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

function BoardList() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  // state
  const [boardList, setBoardList] = useState(null);
  // 빈 배열로 받으면 null 값 오류 안나옴
  const [pageInfo, setPageInfo] = useState([]);
  const [currentView, setCurrentView] = useState("list");
  const [boardInfo, setBoardInfo] = useState("");

  const [params] = useSearchParams();

  // 현재 URL 파악하기
  const location = useLocation();

  // 현재 URL에서 category 명 추출
  const currentParams = new URLSearchParams(location.search).get("category");

  // modal
  const { isOpen, onClose, onOpen } = useDisclosure();

  // navigate
  const navigate = useNavigate();

  // 초기 이펙트
  useEffect(() => {
    axios.get("/api/board/list?" + params).then((response) => {
      setBoardList(response.data.boardList);
      setPageInfo(response.data.pageInfo);
      setBoardInfo(response.data.boardInfo);
    });
  }, [location, pageCount]);

  console.log(params);

  // 리스트 뷰 세팅 동작
  const switchToListView = () => {
    setCurrentView("list");
  };

  // 그리드 뷰 세팅 동작
  const switchToGridView = () => {
    setCurrentView("grid");
  };

  // 글쓰기 버튼 클릭
  function handleWriteClick() {
    console.log("token.detectLogin = " + token.detectLogin);
    // 글쓰기 버튼 클릭시 로그인 되어 있지 않다면 로그인 창으로 이동
    if (!token.detectLogin) {
      onOpen();
    } else {
      navigate("/write?category=" + currentParams, { state: boardInfo });
    }
  }

  // 리스트 형태 제목 렌더링
  function renderListTitle(board) {
    // 제목의 길이가 20자 이상일 경우 ...으로 자르고 툴팁으로 전체 제목을 표시
    if (board.title.length > 20) {
      return (
        <Tooltip label={board.title}>
          <Text>
            {`${board.title.slice(0, 20)}...`}
            <FontAwesomeIcon icon={faComment} /> {board.count_comment}
          </Text>
        </Tooltip>
      );
    }

    // 일반적인 제목 표시 (툴팁 없음)
    return (
      <Text>
        {board.title}
        <FontAwesomeIcon icon={faComment} /> {board.count_comment}
      </Text>
    );
  }

  // 그리드 형태 제목 렌더링
  function renderGreedTitle(board) {
    // 제목의 길이가 15자 이상일 경우 ...으로 자르고 툴팁으로 전체 제목을 표시
    if (board.title.length > 15) {
      return (
        <Tooltip label={board.title}>
          <Text fontWeight={"bold"}>{`${board.title.slice(0, 15)}...`}</Text>
        </Tooltip>
      );
    }

    // 일반적인 제목 표시 (툴팁 없음)
    return (
      <Flex>
        <Text fontWeight={"bold"}>{board.title}</Text>{" "}
      </Flex>
    );
  }

  // 게시물 클릭 (게시물 보기)
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
      <Box>
        {/* ------------------------- 게시글 목록 상단 바 ------------------------- */}
        <Box mb={5}>
          <Heading>{boardInfo} 게시판</Heading>
        </Box>
        <Flex justifyContent={"space-between"} mb={5}>
          <Box>
            <Button onClick={handleWriteClick} colorScheme="blue">
              글쓰기
            </Button>
          </Box>
          <Flex>
            {/* 한 페이지 출력 갯수 설정 (5, 10, 20) */}
            <PageCount />

            {/* ------------------------- 게시글 뷰 형태 선택 ------------------------- */}
            <Box ml={3}>
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
        </Flex>

        {/* ------------------------- 게시글 목록 본문 ------------------------- */}
        {/* currentView에 따라 게시판 목록 형태가 달라짐 */}
        {currentView === "list" ? (
          <>
            {/* ---------------------------------------- 리스트 형태 보기 ---------------------------------------------*/}
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
                        <Td textAlign={"center"}>{board.rownum}</Td>
                        {/* 썸네일, 제목 출력 */}
                        <Td>
                          <Flex align={"center"} gap={"10px"}>
                            {/* 썸네일 출력 */}
                            <YoutubeInfo
                              link={board.link}
                              extraThumbnail={true}
                              thumbnailWidth={120}
                              thumbnailHeight={70}
                              toolTip={true}
                            />

                            {/* 제목 출력 */}
                            {renderListTitle(board)}
                          </Flex>
                        </Td>
                        <Td textAlign={"center"}>{board.countlike}</Td>
                        <Td textAlign={"center"}>{board.board_member_id}</Td>
                        <Td textAlign={"center"}>{board.ago}</Td>
                        <Td textAlign={"center"}>{board.views}</Td>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
            {/* -------------------- 검색, 페이징 --------------------*/}
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
            <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={[4]}>
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
                      <CardHeader p={"10px"}>
                        {/* 썸네일 출력 */}
                        <YoutubeInfo
                          link={board.link}
                          extraThumbnail={true}
                          thumbnailWidth={250}
                          thumbnailHeight={150}
                        />
                      </CardHeader>

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
