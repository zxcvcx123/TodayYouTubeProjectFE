import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { BoardComment } from "../comment/BoardComment";
import BoardLike from "../like/BoardLike";
import YoutubeInfo from "../component/YoutubeInfo";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DetectLoginContext } from "../component/LoginProvider";
import MemberProfile from "../member/MemberProfile";
import ScrollToTop from "../util/ScrollToTop";
import ProgressBar from "./ProgressBar";
import { CheckIcon } from "@chakra-ui/icons";
import { SocketContext } from "../socket/Socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faCheck,
  faCheckDouble,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../component/LoadingPage";
import BoardProfile from "../board/BoardProfile";

function VoteView() {
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const {
    stompClient,
    IsConnected,
    voteResult,
    setVoteResult,
    optionOneVotes,
    setOptionOneVotes,
    optionTwoVotes,
    setOptionTwoVotes,
    voteChecked,
    setVoteChecked,
    voteNot,
    setVoteNot,
  } = useContext(SocketContext);

  // state
  const [board, setBoard] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const totalVotes = (optionOneVotes || 0) + (optionTwoVotes || 0);

  // 투표 마감기한 (현재 7일)
  const [voteEndTime, setVoteEndTime] = useState(0);

  //URL 매개변수 추출
  const { id } = useParams();

  // 현재 URL 파악하기
  const location = useLocation();
  const boardInfo = location.state;

  // 현재 URL에서 category 명 추출
  const currentParams = new URLSearchParams(location.search).get("category");

  // navigate
  const navigate = useNavigate();

  // toast
  const toast = useToast();

  const delModal = useDisclosure();
  const loginModal = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingVote, setIsSubmittingVote] = useState(false);

  // 초기 렌더링
  useEffect(() => {
    axios.get("/api/vote/id/" + id).then((res) => {
      setBoard(res.data);

      // count된 숫자 넣고 숫자에 따라서 set 해서 처음 % 반영
      setOptionOneVotes(res.data.voted_a);
      setOptionTwoVotes(res.data.voted_b);

      // 마감기한 설정
      setVoteEndTime(8);
    });

    // axios.get 해서 버튼을 눌렀는지 안눌렀는지 게시판번호/아이디 기준으로 조회
    if (loginInfo !== null) {
      axios
        .post("/api/vote/history", {
          vote_board_id: id,
          vote_member_id: loginInfo.member_id,
        })
        .then((res) => {
          if (res.data.checked_vote_not !== null) {
            setVoteNot(1);
            setVoteChecked(2);
          } else {
            setVoteNot(0);
            setVoteChecked(res.data.checked_vote_a);
          }
        });
    }
  }, [loginInfo]);

  if (board === null) {
    return <LoadingPage />;
  }

  // 링크 복사 버튼 클릭
  function handleCopyClick() {
    navigator.clipboard
      .writeText(board.link)
      .then(() => {
        toast({
          description: "링크가 복사되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "링크가 복사에 실패하였습니다 ㅠㅠ",
          status: "error",
        });
      });
  }

  // 투표 A
  function handleVoteA() {
    if (isSubmittingVote) {
      //투표 중이라면 처리하지 않음
      return;
    }

    setIsSubmittingVote(true);

    stompClient.current.publish({
      destination: "/app/votea",
      body: JSON.stringify({
        vote_board_id: id,
        vote_member_id: loginInfo.member_id,
      }),
    });

    // 투표 후 2초 이후에 isSubmitting을 false로 설정
    setTimeout(() => {
      setIsSubmittingVote(false);
    }, 2000);
  }

  // 투표 B
  function handleVoteB() {
    if (isSubmittingVote) {
      // 투표 중이라면 처리하지 않음
      return;
    }

    setIsSubmittingVote(true);

    stompClient.current.publish({
      destination: "/app/voteb",
      body: JSON.stringify({
        vote_board_id: id,
        vote_member_id: loginInfo.member_id,
      }),
    });

    // 투표 후 2초 이후에 isSubmitting을 false로 설정
    setTimeout(() => {
      setIsSubmittingVote(false);
    }, 2000);
  }

  // 삭제 버튼
  function handleDelete() {
    setIsSubmitting(true);
    axios
      .delete("/api/vote/delete", {
        data: {
          id: id,
          vote_member_id: board.vote_member_id,
          login_memeber_id: loginInfo.member_id,
        },
      })
      .then(() => {
        toast({
          description: "정상적으로 삭제 되었습니다.",
          status: "success",
        });
        navigate("/board/vote/list");
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast({
            description: "게시글 삭제는 작성자만 가능합니다.",
            status: "error",
          });
          return;
        }

        if (error.response.status === 401) {
          toast({
            description: "권한 정보가 없습니다.",
            status: "error",
          });
          return;
        }

        if (error.response) {
          toast({
            description: "게시글 삭제에 실패했습니다.",
            status: "error",
          });
          return;
        }
      })
      .finally(() => {
        delModal.onClose();
        setIsSubmitting(false);
      });
  }

  return (
    <Center>
      <Box w={"1500px"} my={"20px"}>
        <Box mb={5}>
          <Heading>투표 게시판</Heading>
        </Box>

        {/* -------------------- 상단 영역 -------------------- */}
        <FormControl mt={10} mb={2}>
          {/* 제목 */}
          <Text fontSize={"xx-large"} as={"strong"}>
            {board.title}
          </Text>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"}>
              {/*프로필*/}
              <HStack>
                <Flex width={"300px"}>
                  <Box
                    ml="3"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <BoardProfile
                      board_id={board.id}
                      board_member_id={board.vote_member_id}
                    />
                    <Text>| {board.ago}</Text>
                  </Box>
                </Flex>
              </HStack>
              {/* 일자 */}
            </Flex>
            {/* 좋아요, 조회수, 투표수 */}
            <Flex alignItems={"center"} gap={"5"}>
              <Text> | 투표 수 : {board.voted_all}</Text>
              {board.voteAgo < voteEndTime && (
                <Text> | 마감기한 : D-{voteEndTime - board.voteAgo}</Text>
              )}
              {board.voteAgo >= voteEndTime && <Text> | 마감된 투표</Text>}
            </Flex>
          </Flex>
        </FormControl>

        <Divider my={5} borderColor="grey" />

        {/* -------------------- 유튜브 섹션 -------------------- */}
        {/*{renderYoutubeSection()}*/}
        <Box position={"relative"} w={"100%"}>
          {/* 투표 마감시 나오는 화면 시작 */}
          {board.voteAgo >= voteEndTime && (
            <>
              {/* 배경처리 회색으로 처리 */}
              {/*<Box*/}
              {/*  position={"absolute"}*/}
              {/*  w={"100%"}*/}
              {/*  h={"100%"}*/}
              {/*  opacity={"0.3"}*/}
              {/*  bgColor={"gray"}*/}
              {/*  zIndex={"900"}*/}
              {/*></Box>*/}
              <Box
                opacity={"1"}
                position={"absolute"}
                top={"50%"}
                left={"50%"}
                transform={"translate(-50%, -50%)"}
                bg={"gray"}
                zIndex={"901"}
              >
                <Heading fontSize={"5rem"}>투표 마감</Heading>
              </Box>
            </>
          )}
          {/* 투표 마감시 나오는 화면 끝*/}
          <Box mb={5}>
            <Heading textAlign={"center"}>{board.title}</Heading>
          </Box>
          <Box>
            <Flex
              mb={2}
              alignItems={"center"}
              w={"100%"}
              justifyContent={"space-between"}
            >
              <Box position={"relative"}>
                {/* 투표 마감시 나오는 메달 시작 */}
                {board.voteAgo >= voteEndTime &&
                  optionOneVotes > optionTwoVotes && (
                    <Box position={"absolute"}>
                      <FontAwesomeIcon
                        icon={faAward}
                        fontSize={"150px"}
                        color="blue"
                        zIndex={"902"}
                      />
                    </Box>
                  )}
                {board.voteAgo >= voteEndTime &&
                  optionOneVotes === optionTwoVotes && (
                    <Box position={"absolute"}>
                      <FontAwesomeIcon
                        icon={faAward}
                        fontSize={"150px"}
                        color="blue"
                        zIndex={"902"}
                      />
                    </Box>
                  )}
                {/* 투표 마감시 나오는 메달 끝 */}
                <YoutubeInfo link={board.link_a} extraVideo={true} />
                {loginInfo === null ? (
                  <Button
                    mt={2}
                    colorScheme="blue"
                    w="100%"
                    h={20}
                    onClick={loginModal.onOpen}
                    isDisabled={
                      IsConnected === false || board.voteAgo >= voteEndTime
                        ? true
                        : false
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                ) : (
                  <Button
                    mt={2}
                    colorScheme="blue"
                    w="100%"
                    h={20}
                    onClick={() => {
                      handleVoteA();
                    }}
                    isDisabled={
                      (voteChecked !== 0 && voteNot === 0) ||
                      IsConnected === false ||
                      board.voteAgo >= voteEndTime
                        ? true
                        : false
                    }
                  >
                    {IsConnected === false ? (
                      <Text>연결 중...</Text>
                    ) : voteChecked === 1 && voteNot === 0 ? (
                      <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </Button>
                )}
              </Box>
              <Box w={"20%"}>
                <Heading textAlign={"center"}>VS</Heading>
              </Box>
              <Box>
                {/* 투표 마감시 나오는 메달 시작 */}
                {board.voteAgo >= voteEndTime &&
                  optionOneVotes < optionTwoVotes && (
                    <Box position={"absolute"}>
                      <FontAwesomeIcon
                        icon={faAward}
                        fontSize={"150px"}
                        color="red"
                        zIndex={"902"}
                      />
                    </Box>
                  )}
                {board.voteAgo >= voteEndTime &&
                  optionOneVotes === optionTwoVotes && (
                    <Box position={"absolute"}>
                      <FontAwesomeIcon
                        icon={faAward}
                        fontSize={"150px"}
                        color="red"
                        zIndex={"902"}
                      />
                    </Box>
                  )}
                {/* 투표 마감시 나오는 메달 끝 */}
                <YoutubeInfo link={board.link_b} extraVideo={true} />
                {loginInfo === null ? (
                  <Button
                    mt={2}
                    colorScheme="red"
                    w="100%"
                    h={20}
                    onClick={loginModal.onOpen}
                    isDisabled={
                      IsConnected === false || board.voteAgo >= voteEndTime
                        ? true
                        : false
                    }
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                ) : (
                  <Button
                    mt={2}
                    colorScheme="red"
                    w="100%"
                    h={20}
                    onClick={() => {
                      handleVoteB();
                    }}
                    isDisabled={
                      (voteChecked !== 1 && voteNot === 0) ||
                      IsConnected === false ||
                      board.voteAgo >= voteEndTime
                        ? true
                        : false
                    }
                  >
                    {IsConnected === false ? (
                      <Text>연결 중...</Text>
                    ) : voteChecked !== 1 && voteNot === 0 ? (
                      <FontAwesomeIcon icon={faCircleCheck} size="xl" />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} />
                    )}
                  </Button>
                )}
              </Box>
            </Flex>
          </Box>
          {/* -------------------- 본문 -------------------- */}

          <ProgressBar
            optionOneVotes={optionOneVotes}
            optionTwoVotes={optionTwoVotes}
          />
          <Box mt={5} textAlign={"center"}>
            <Text fontSize={"1.5rem"}>{board.content}</Text>
          </Box>
        </Box>
        <Divider my={5} borderColor="grey" />

        {/* -------------------- 버튼 섹션 -------------------- */}
        <Flex justifyContent={"flex-end"}>
          {/* 삭제 버튼 */}
          {loginInfo && loginInfo.member_id === board.vote_member_id && (
            <Button colorScheme="red" onClick={delModal.onOpen} mr={3}>
              삭제
            </Button>
          )}
          {/* 목록 버튼 */}
          <Button
            colorScheme="blue"
            onClick={() => navigate("/board/vote/list")}
          >
            목록
          </Button>
        </Flex>
        {/* -------------------- 댓글 영역 -------------------- */}

        <BoardComment board_id={id} boardData={board} />
        <ScrollToTop />
        {/* 삭제 모달 */}
        <>
          <Modal isOpen={delModal.isOpen} onClose={delModal.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>삭제 확인</ModalHeader>
              <ModalCloseButton />
              <ModalBody>삭제 하시겠습니까?</ModalBody>

              <ModalFooter>
                <Button onClick={() => delModal.onClose()}>닫기</Button>
                <Button
                  isDisabled={isSubmitting}
                  onClick={handleDelete}
                  colorScheme="red"
                >
                  삭제
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* ------------------------- 모달 (비로그인 사용자 글쓰기 버튼 클릭) ------------------------- */}
          <Modal isOpen={loginModal.isOpen} onClose={loginModal.onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>로그인 필요</ModalHeader>
              <ModalCloseButton />
              <ModalBody>투표를 하기 위해서 로그인이 필요합니다.</ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={loginModal.onClose}>
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
        </>
      </Box>
    </Center>
  );
}

export default VoteView;
