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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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

function VoteView() {
  const connectUser = localStorage.getItem("memberInfo");

  // state
  const [board, setBoard] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [vote, setVote] = useState(null);

  // progressBar
  const [optionOneVotes, setOptionOneVotes] = useState(0);
  const [optionTwoVotes, setOptionTwoVotes] = useState(0);

  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = (optionOneVotes / totalVotes) * 100;
  const optionTwoPercentage = (optionTwoVotes / totalVotes) * 100;

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
    });
  }, []);

  if (board === null) {
    return <Spinner />;
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

  function handleVoteA() {
    axios.put("/api/votea", {
      vote_board_id: id,
      vote_member_id: connectUser,
    });
  }

  function handleVoteB() {
    axios.put("/api/voteb", {
      vote_id: id,
      vote_member_id: connectUser,
    });
  }

  return (
    <Box m={"50px 20% 20px 50px"}>
      <Box mb={5}>
        <Heading>{boardInfo} 게시판</Heading>
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
            <Text> | 투표 수 : </Text>
          </Flex>
        </Flex>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* -------------------- 유튜브 섹션 -------------------- */}
      {/*{renderYoutubeSection()}*/}
      <Box>
        <Heading textAlign={"center"}>{board.title}</Heading>
      </Box>
      <Box>
        <Flex mb={2} alignItems={"center"}>
          <Box>
            <YoutubeInfo link={board.link_a} extraVideo={true} />
            <Button
              colorScheme="blue"
              w="100%"
              h={20}
              onClick={() => {
                handleVoteA();
              }}
            >
              <CheckIcon />
            </Button>
          </Box>
          <Heading>VS</Heading>
          <Box>
            <YoutubeInfo link={board.link_b} extraVideo={true} />
            <Button
              colorScheme="red"
              w="100%"
              h={20}
              onClick={() => {
                handleVoteB();
              }}
            >
              <CheckIcon />
            </Button>
          </Box>
        </Flex>
      </Box>
      {/* -------------------- 본문 -------------------- */}
      <Box mb={2} textAlign={"center"}>
        {board.content}
      </Box>

      <ProgressBar
        optionOnePercentage={optionOnePercentage}
        optionTwoPercentage={optionTwoPercentage}
      />

      <Divider my={5} borderColor="grey" />

      {/* -------------------- 버튼 섹션 -------------------- */}
      <Flex justifyContent={"space-between"}>
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
