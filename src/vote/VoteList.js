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
  Img,
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
import VotePage from "./VotePage";
import VoteSearch from "./VoteSearch";
import ProgressBar from "./ProgressBar";
import { voteEndImg } from "../assets/Image";

function VoteList() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  // state
  const [boardList, setBoardList] = useState(null);
  const [page, setPage] = useState([]);
  const [listProgressBar, setListProgressBar] = useState();
  //투표 마감기한 (기본 7일)
  const [voteEndTime, setVoteEndTime] = useState(0);

  // 현재 URL 파악하기
  const location = useLocation();
  const [params] = useSearchParams();
  // modal
  const { isOpen, onClose, onOpen } = useDisclosure();

  // navigate
  const navigate = useNavigate();

  // 초기 이펙트
  useEffect(() => {
    axios.get("/api/vote/list?" + params).then((res) => {
      setBoardList(res.data.vote);
      setPage(res.data.page);
      // 투표 마감기한 초기 설정
      setVoteEndTime(8);
    });
  }, [location]);

  function handleWriteBtn() {
    // 글쓰기 버튼 클릭시 로그인 되어 있지 않다면 로그인 창으로 이동
    if (!token.detectLogin) {
      onOpen();
    } else {
      navigate("/board/vote/write");
    }
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

  // -------------------------------------------------- 화면 렌더링 --------------------------------------------------
  return (
    <Box w={"60%"} m={"20px auto"}>
      <Box>
        {/* ------------------------- 게시글 목록 상단 바 ------------------------- */}
        <Box mb={5}>
          <Heading>투표 게시판</Heading>
        </Box>
        {/* ------------------------- 게시글 목록 본문 ------------------------- */}
        <>
          {/* ---------------------------------------- 그리드 형태 보기 ---------------------------------------------*/}
          <Box>
            {boardList &&
              boardList.map((board) => (
                <Card
                  key={board.id}
                  position={"relative"}
                  w={"100%"}
                  border={"1px solid lightgray"}
                  onClick={() => navigate("/board/vote/" + board.id)}
                  _hover={{
                    backgroundColor: "lightcyan",
                    cursor: "pointer",
                  }}
                  my={"10px"}
                >
                  {board.voteAgo >= voteEndTime && (
                    <>
                      <Box
                        position={"absolute"}
                        w={"100%"}
                        h={"100%"}
                        opacity={"0.3"}
                        bgColor={"gray"}
                      ></Box>
                      <Box
                        opacity={"1"}
                        position={"absolute"}
                        top={"50%"}
                        left={"50%"}
                        transform={"translate(-50%, -50%)"}
                        bg={"gray"}
                      >
                        <Heading fontSize={"3rem"}>투표 마감</Heading>
                      </Box>
                    </>
                  )}
                  <CardHeader p={"1%"}>
                    {/* 제목 출력 */}
                    <Flex justifyContent={"space-between"}>
                      <Box>
                        <Heading fontSize={"2rem"}>
                          {renderGreedTitle(board)}
                        </Heading>
                      </Box>
                      <Flex
                        alignItems={"end"}
                        w={"25%"}
                        justifyContent={"space-between"}
                      >
                        <Flex gap={5} mr={"40px"}>
                          <Box>
                            <Heading fontSize={"1.25rem"}>투표 현황 </Heading>
                          </Box>
                          <Box>
                            <Heading fontSize={"1.25rem"}>
                              {board.voted_all}
                            </Heading>
                          </Box>
                        </Flex>
                        <Flex mr={"5px"}>
                          <Box>
                            <Heading fontSize={"1.25rem"}>
                              {board.voteAgo >= voteEndTime
                                ? "투표 종료"
                                : `D-${voteEndTime - board.voteAgo}`}
                            </Heading>
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </CardHeader>

                  <CardBody w={"100%"} p={"15px"} textAlign={"center"}>
                    {/* 썸네일 출력 */}
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <YoutubeInfo link={board.link_a} extraThumbnail={true} />

                      <Box w={"15%"}>
                        <Heading p={"5px"} textAlign={"center"}>
                          VS
                        </Heading>
                      </Box>

                      <YoutubeInfo link={board.link_b} extraThumbnail={true} />
                    </Flex>
                  </CardBody>
                  <CardFooter w={"100%"}>
                    <ProgressBar
                      optionOneVotes={board.voted_a}
                      optionTwoVotes={board.voted_b}
                    />
                  </CardFooter>
                </Card>
              ))}
          </Box>
          {/* ------------------------- 검색, 페이징 섹션 ------------------------- */}
          <Box>
            <Flex mt={5} justifyContent={"space-between"}>
              <Box>
                <Button onClick={handleWriteBtn} colorScheme="blue">
                  주제 생성
                </Button>
              </Box>

              <Box w={"30%"}>
                <VoteSearch params={params} />
              </Box>
            </Flex>
            <Flex justifyContent={"center"}>
              <Box>
                <VotePage page={page} />
              </Box>
            </Flex>
          </Box>
        </>
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
    </Box>
  );
}

export default VoteList;
