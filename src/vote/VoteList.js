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
import VotePage from "./VotePage";
import VoteSearch from "./VoteSearch";

function VoteList() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  // state
  const [boardList, setBoardList] = useState(null);
  const [page, setPage] = useState([]);

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
    });
  }, [location]);

  function handleWriteBtn() {
    console.log("token.detectLogin = " + token.detectLogin);
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
    <Box w={"60%"} m={"0 auto"}>
      <Box>
        {/* ------------------------- 게시글 목록 상단 바 ------------------------- */}
        <Box mb={5}>
          <Heading>투표 게시판</Heading>
        </Box>
        <Flex justifyContent={"space-between"} mb={5}>
          <Box>
            <Button onClick={handleWriteBtn} colorScheme="blue">
              글쓰기
            </Button>
          </Box>
          <Flex></Flex>
        </Flex>
        {/* ------------------------- 게시글 목록 본문 ------------------------- */}
        <>
          {/* ---------------------------------------- 그리드 형태 보기 ---------------------------------------------*/}
          <Box>
            {boardList &&
              boardList.map((board) => (
                <Card
                  key={board.id}
                  w={"100%"}
                  h={"300px"}
                  border={"1px solid lightgray"}
                  onClick={() => navigate("/board/vote/" + board.id)}
                  _hover={{
                    backgroundColor: "lightcyan",
                    cursor: "pointer",
                  }}
                >
                  <CardHeader p={"10px"}>
                    {/* 썸네일 출력 */}
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <YoutubeInfo
                        link={board.link_a}
                        extraThumbnail={true}
                        thumbnailWidth={250}
                        thumbnailHeight={150}
                      />
                      <Heading p={"20px"}>VS</Heading>
                      <YoutubeInfo
                        link={board.link_b}
                        extraThumbnail={true}
                        thumbnailWidth={250}
                        thumbnailHeight={150}
                      />
                    </Flex>
                  </CardHeader>

                  <CardBody w={"100%"} p={"15px"} textAlign={"center"}>
                    {/* 제목 출력 */}
                    번호: {board.id} |{renderGreedTitle(board)}
                  </CardBody>

                  <CardFooter p={"10px"}></CardFooter>
                </Card>
              ))}
          </Box>
          {/* ------------------------- 검색, 페이징 섹션 ------------------------- */}
          <Box>
            <VoteSearch params={params} />
            <VotePage page={page} />
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
