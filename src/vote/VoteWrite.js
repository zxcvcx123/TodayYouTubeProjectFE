import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Filednd } from "../file/Filednd";
import Editor from "../component/Editor";
import { DetectLoginContext } from "../component/LoginProvider";
import YoutubeInfo from "../component/YoutubeInfo";

function VoteWrite() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  /* use state */
  const [title, setTitle] = useState("");
  const [link_a, setlink_a] = useState("");
  const [link_b, setlink_b] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [link_aError, setlink_aError] = useState("");
  const [link_bError, setlink_bError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isYouTubeLink1, setIsYouTubeLink1] = useState(false);
  const [isYouTubeLink2, setIsYouTubeLink2] = useState(false);

  /* useLocation */
  const location = useLocation();
  const boardInfo = location.state;

  /* 현재 쿼리스트링의 category 명 가져오기 */
  const currentParams = new URLSearchParams(location.search).get("category");

  /* use navigate */
  let navigate = useNavigate();

  /* use toast */
  const toast = useToast();

  // 비로그인 상태로 글쓰기 경로 직접 접근시 경고 발생 후 로그인페이지로 이동
  useEffect(() => {
    if (loginInfo == null) {
      if (!token.detectLogin) {
        window.alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
        navigate("/member/login");
      }
    }
  }, [loginInfo]);

  // useEffect를 사용하여 titleError가 변경(에러발생)될 때마다 스크롤이 제목 라벨으로 이동
  useEffect(() => {
    // 동시에 발생했을 경우에는 title로 먼저 스크롤 된다.
    if (titleError && link_aError && link_bError && contentError) {
      const errorElement = document.getElementById("title");
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      if (titleError) {
        // 오류 메시지가 있을 때 해당 영역으로 스크롤 이동
        const errorElement = document.getElementById("title");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (link_aError) {
        // 오류 메시지가 있을 때 해당 영역으로 스크롤 이동
        const errorElement = document.getElementById("link_a");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (link_bError) {
        // 오류 메시지가 있을 때 해당 영역으로 스크롤 이동
        const errorElement = document.getElementById("link_b");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      }
      if (contentError) {
        const errorElement = document.getElementById("content");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [titleError, link_aError, link_bError, contentError]);

  // title, content 의 문자열 길이가 0 이상일 경우 titleError 초기화 (타이핑 하는 순간 즉시)
  useEffect(() => {
    if (title.trim().length > 0) {
      setTitleError("");
    }

    if (link_a.trim().length > 0) {
      setlink_aError("");
    }

    if (link_b.trim().length > 0) {
      setlink_bError("");
    }

    if (content.trim().length > 0) {
      setContentError("");
    }
  }, [title, link_a, link_b, content]);

  // 작성 완료 버튼 클릭 ---------------------------------------------------
  function handleSubmit() {
    setIsSubmitting(true);

    // 제목이 null이거나 공백일 경우 에러메시지 세팅 후 반환
    if (!title || title.trim() === "") {
      setTitleError("주제를 입력해주세요. 공백 x");
      return;
    }

    if (isYouTubeLink1) {
      if (!link_a || link_a.trim() === "") {
        setlink_aError("1번 링크를 입력해주세요. 공백 x");
        return;
      }
    } else {
      setlink_aError("올바른 유튜브 링크가 아닙니다.");
      setIsSubmitting(false);
      return;
    }

    if (isYouTubeLink2) {
      if (!link_b || link_b.trim() === "") {
        setlink_bError("2번 링크를 입력해주세요. 공백 x");
        return;
      }
    } else {
      setlink_bError("올바른 유튜브 링크가 아닙니다.");
      setIsSubmitting(false);
      return;
    }

    // 본문이 null이거나 공백일 경우 에러메시지 세팅 후 반환
    if (!content || content.trim() === "") {
      setContentError("설명을 입력해주세요. 공백 x");
      return;
    }

    axios
      .postForm("/api/vote/add", {
        title,
        link_a,
        link_b,
        content,
        vote_member_id: loginInfo.member_id,
        name_eng: boardInfo,
      })
      .then(() => {
        toast({
          description: "게시글 저장에 성공했습니다.",
          status: "success",
        });
        navigate("/board/vote/list?p=1");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description:
              "게시글 유효성 검증에 실패했습니다. 양식에 맞게 작성해주세요.",
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
            description: "게시글 저장에 실패했습니다.",
            status: "error",
          });
          return;
        }
      })
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Box border={"2px solid black"} m={5}>
      <Heading textAlign={"center"} mb={5}>
        투표 생성
      </Heading>

      {/* -------------------- 제목 -------------------- */}
      <FormControl mb={2} isInvalid={titleError}>
        <FormLabel id="title" textAlign={"center"}>
          주제
        </FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="투표 주제를 입력해주세요. (필수)"
          textAlign={"center"}
        />
        {/* isInvalid로 타이틀이 공백이거나 null일 경우 에러메시지 출력 */}
        <FormErrorMessage justifyContent={"center"}>
          {titleError}
        </FormErrorMessage>
      </FormControl>

      {/* -------------------- 링크 -------------------- */}
      <Flex alignItems={"center"}>
        <FormControl mb={2} w={"50%"} isInvalid={link_aError}>
          <FormLabel id="link_a" textAlign={"center"}>
            1번 링크
          </FormLabel>

          <Input
            textAlign={"center"}
            value={link_a}
            onChange={(e) => setlink_a(e.target.value)}
            placeholder="주제에 어울리는 유트브 영상 링크를 입력해주세요. (필수)"
            required
          />
          <FormErrorMessage justifyContent={"center"}>
            {link_aError}
          </FormErrorMessage>
          <YoutubeInfo
            link={link_a}
            extraThumbnail={true}
            thumbnailWidth={"100%"}
            mode={"voteLink1"}
            setIsYouTubeLink1={setIsYouTubeLink1}
          />
        </FormControl>

        <Box>
          <Heading>VS</Heading>
        </Box>

        <FormControl mb={2} w={"50%"} isInvalid={link_bError}>
          <FormLabel id="link_b" textAlign={"center"}>
            2번 링크
          </FormLabel>

          <Input
            textAlign={"center"}
            value={link_b}
            onChange={(e) => setlink_b(e.target.value)}
            placeholder="주제에 어울리는 링크를 입력해주세요. (필수)"
            required
          />
          <FormErrorMessage justifyContent={"center"}>
            {link_bError}
          </FormErrorMessage>
          <YoutubeInfo
            link={link_b}
            extraThumbnail={true}
            mode={"voteLink2"}
            setIsYouTubeLink2={setIsYouTubeLink2}
          />
        </FormControl>
      </Flex>

      {/* -------------------- 본문 -------------------- */}
      <FormControl mb={2} isInvalid={contentError}>
        <FormLabel id="content" textAlign={"center"}></FormLabel>
        <Input
          textAlign={"center"}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="한 줄 설명을 입력해주세요"
        />
        <FormErrorMessage justifyContent={"center"}>
          {contentError}
        </FormErrorMessage>
      </FormControl>

      {/* -------------------- 버튼 섹션 -------------------- */}
      {/* 저장 버튼 */}
      <Flex>
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          isDisabled={isSubmitting}
        >
          작성 완료
        </Button>

        {/* 취소 버튼 */}
        <Button onClick={() => navigate("/board/vote/list")} colorScheme="red">
          취소
        </Button>
      </Flex>
    </Box>
  );
}

export default VoteWrite;
