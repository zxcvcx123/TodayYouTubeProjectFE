import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Spinner,
  Text,
  Tooltip,
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
  faCheck,
  faCheckDouble,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import LoadingPage from "../component/LoadingPage";

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

  // 초기 렌더링
  useEffect(() => {
    axios.get("/api/vote/id/" + id).then((res) => {
      console.log(res.data);
      setBoard(res.data);

      // count된 숫자 넣고 숫자에 따라서 set 해서 처음 % 반영
      setOptionOneVotes(res.data.voted_a);
      setOptionTwoVotes(res.data.voted_b);
    });

    // axios.get 해서 버튼을 눌렀는지 안눌렀는지 게시판번호/아이디 기준으로 조회
    if (loginInfo !== null) {
      axios
        .post("/api/vote/history", {
          vote_board_id: id,
          vote_member_id: loginInfo.member_id,
        })
        .then((res) => {
          console.log(res.data);
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

  // 유튜브 섹션 렌더링 여부 결정 함수
  // function renderYoutubeSection() {
  //   return (
  //     <FormControl mb={2}>
  //       <FormLabel fontSize="xl" fontWeight="bold" color="purple.500">
  //         추천 유튜브 영상
  //       </FormLabel>
  //       {/* 유튜브 영상 출력 */}
  //       <YoutubeInfo link={board.link} extraVideo={true} />
  //       <Flex m={2} ml={0} gap={5}>
  //         <Button onClick={() => window.open(board.link)} colorScheme="red">
  //           유튜브 영상 페이지로 이동
  //         </Button>
  //         <Button onClick={handleCopyClick} colorScheme="blue">
  //           유튜브 링크 복사
  //         </Button>
  //       </Flex>
  //     </FormControl>
  //   );
  // }

  // 투표 A
  function handleVoteA() {
    stompClient.current.publish({
      destination: "/app/votea",
      body: JSON.stringify({
        vote_board_id: id,
        vote_member_id: loginInfo.member_id,
      }),
    });
  }

  // 투표 B
  function handleVoteB() {
    stompClient.current.publish({
      destination: "/app/voteb",
      body: JSON.stringify({
        vote_board_id: id,
        vote_member_id: loginInfo.member_id,
      }),
    });
  }

  // 삭제 버튼
  function handleDelete() {
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
      .finally();
  }

  return (
    <Box>
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
              <Flex width={"150px"}>
                <Avatar src="https://i.imgur.com/lmSDJtn.jpeg" />
                <Box ml="3">
                  <Tooltip label={board.nickname} placement="top-start">
                    <Text fontWeight="bold">
                      {board.nickname.slice(0, 8)}...
                    </Text>
                  </Tooltip>
                  <Text fontSize="sm">{board.rolename}</Text>
                </Box>
              </Flex>
            </HStack>
            {/* 일자 */}
            <Text>| {board.ago}</Text>
          </Flex>
          {/* 좋아요, 조회수, 투표수 */}
          <Flex alignItems={"center"} gap={"5"}>
            <Text> | 투표 수 : {board.voted_all}</Text>
          </Flex>
        </Flex>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* -------------------- 유튜브 섹션 -------------------- */}
      {/*{renderYoutubeSection()}*/}
      <Box w={"100%"} mb={5}>
        <Heading textAlign={"center"}>{board.title}</Heading>
      </Box>
      <Box>
        <Flex
          mb={2}
          alignItems={"center"}
          w={"100%"}
          justifyContent={"space-between"}
        >
          <Box>
            <YoutubeInfo link={board.link_a} extraVideo={true} />
            <Button
              colorScheme="blue"
              w="100%"
              h={20}
              onClick={() => {
                handleVoteA();
              }}
              isDisabled={
                (voteChecked === 1 && voteNot === 0) || IsConnected === false
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
          </Box>
          <Box w={"20%"}>
            <Heading textAlign={"center"}>VS</Heading>
          </Box>
          <Box>
            <YoutubeInfo link={board.link_b} extraVideo={true} />
            <Button
              colorScheme="red"
              w="100%"
              h={20}
              onClick={() => {
                handleVoteB();
              }}
              isDisabled={
                (voteChecked !== 1 && voteNot === 0) || IsConnected === false
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
      <Divider my={5} borderColor="grey" />

      {/* -------------------- 버튼 섹션 -------------------- */}
      <Flex justifyContent={"space-between"}>
        {/* 삭제 버튼 */}
        <Button colorScheme="red" onClick={handleDelete}>
          삭제
        </Button>

        {/* 목록 버튼 */}
        <Button
          colorScheme="blue"
          onClick={() => navigate("/board/list?category=" + currentParams)}
        >
          목록
        </Button>

        <Box>
          {/*/!* 삭제 버튼 *!/*/}
          {/*<Button colorScheme="red" onClick={handleDeleteClick}>*/}
          {/*  삭제*/}
          {/*</Button>*/}
        </Box>
      </Flex>
      {/* -------------------- 댓글 영역 -------------------- */}

      <BoardComment board_id={id} boardData={board} />
      <ScrollToTop />
    </Box>
  );
}

export default VoteView;
