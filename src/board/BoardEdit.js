import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { Filednd } from "../file/Filednd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "../component/Editor";
import { DetectLoginContext } from "../component/LoginProvider";
import LoadingPage from "../component/LoadingPage";

function BoardEdit() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  /* use state */
  const [editUploadFiles, setEditUploadFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [mode, setMode] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* use immer */
  const [board, updateBoard] = useImmer(null);

  /* use params */
  const { id } = useParams();

  /* use navigate */
  const navigate = useNavigate();

  /* use toast */
  const toast = useToast();

  // 초기 렌더링으로 게시물의 데이터를 가져와 상태를 업데이트 한다.
  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  // 파일 목록 가져오기
  useEffect(() => {
    axios
      .get("/api/file/list/" + id)
      .then((response) => {
        setEditUploadFiles(response.data);
        setMode("Update");
      })
      .catch()
      .finally();
  }, []);

  // useEffect를 사용하여 titleError가 변경(에러발생)될 때마다 스크롤이 제목 라벨으로 이동
  useEffect(() => {
    // 동시에 발생했을 경우에는 title로 먼저 스크롤
    if (titleError && contentError) {
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

      if (contentError) {
        const errorElement = document.getElementById("content");
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [titleError, contentError]);

  // 게시글을 로딩중이라면 스피너 돌리기
  if (board === null) {
    return <LoadingPage />;
  }

  // 게시글 수정 버튼 클릭 함수
  function handleSubmit() {
    setIsSubmitting(true);
    let uuSrc = getSrc();

    // 로그인 여부 검증
    if (!token.detectLogin) {
      window.alert("비로그인 사용자입니다.");
      navigate("/member/login");
      return;
    }

    // 작성자 본인 여부 검증
    if (loginInfo.member_id === board.board_member_id) {
      navigate("/board/edit/" + id);
    } else {
      window.alert("작성자 본인만 수정이 가능합니다.");
    }

    if (!board.title || board.title.trim() === "") {
      console.log("제목을 입력해주세요. title은 null이거나 공백이면 안 됨.");
      setTitleError("제목을 입력해주세요. title은 null이거나 공백이면 안 됨.");
      return;
    }

    if (!board.content || board.content.trim() === "") {
      console.log("본문을 입력해주세요. 본문은 null이거나 공백이면 안 됨.");
      setContentError("본문을 입력해주세요. 본문은 null이거나 공백이면 안 됨.");
      return;
    }

    // 수정 버튼 클릭시 loginInfo.member_id 같이 넘겨줌 => 로그인 상태 확인용.
    axios
      .putForm("/api/board/edit", {
        id: board.id,
        title: board.title,
        content: board.content,
        link: board.link,
        board_category_code: board.board_category_code,
        board_member_id: board.board_member_id,
        created_at: board.created_at,
        updated_at: board.updated_at,
        is_show: board.is_show,
        countlike: board.countlike,
        views: board.views,
        login_member_id: loginInfo.member_id,
        uuSrc,
        uploadFiles,
      })
      .then(() => {
        toast({
          description: "게시글 수정에 성공했습니다.",
          status: "success",
        });
        navigate("/board/" + board.id);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast({
            description: "권한정보가 없습니다.",
            status: "error",
          });
        } else if (error.response.status === 403) {
          toast({
            description: "접근 불가한 경로입니다.",
            status: "error",
          });
        } else {
          toast({
            description: "게시글 수정에 실패하였습니다.",
            status: "error",
          });
        }
        console.log("bad");
      })
      .finally(() => setIsSubmitting(false));
  }

  // 본문 영역 이미지 소스 코드 얻어오기
  function getSrc() {
    let imgSrc = document.getElementsByTagName("img");
    let arrSrc = [];

    for (let i = 0; i < imgSrc.length; i++) {
      if (
        imgSrc[i].src.length > 0 &&
        imgSrc[i].src.startsWith(
          "https://mybucketcontainer1133557799.s3.ap-northeast-2.amazonaws.com/fileserver/",
        )
      ) {
        arrSrc.push(imgSrc[i].src.substring(79, 115));
      }
    }

    return arrSrc;
  }

  // 게시글 수정 시 상태 업데이트
  function handleBoardUpdate(e, updateField) {
    updateBoard((draft) => {
      draft[updateField] = e.target.value;

      // title이 0 이상일 경우 titleError를 초기화
      if (updateField === "title" && updateField.trim().length > 0) {
        setTitleError("");
      }

      // content가 0 이상일 경우 contentError를 초기화
      if (updateField === "content" && updateField.trim().length > 0) {
        setContentError("");
      }
    });
  }

  return (
    <Box border={"2px solid black"} m={5}>
      <Heading mb={5}>유튜브 추천 :: 게시글 수정하기</Heading>

      {/* -------------------- 제목 -------------------- */}
      <FormControl mb={2} isInvalid={titleError}>
        <FormLabel id="title">제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) => handleBoardUpdate(e, "title")}
        />
        <FormErrorMessage>{titleError}</FormErrorMessage>
      </FormControl>

      {/* -------------------- 링크 -------------------- */}
      <FormControl mb={2}>
        <FormLabel>링크</FormLabel>
        <Input
          value={board.link}
          onChange={(e) => handleBoardUpdate(e, "link")}
        />
      </FormControl>

      {/* -------------------- 본문 -------------------- */}
      <FormControl mb={2} isInvalid={contentError}>
        <FormLabel id="content">본문</FormLabel>
        <Box border={"1px solid red"}>
          {/* data={board.content} : 페이지 초기값을 설정한다. */}
          {/* setContent1 : 사용자가 수정한 내용을 받아와 content 필드를 업데이트 한다. */}
          <Editor
            data={board.content}
            setContent1={(content) =>
              handleBoardUpdate({ target: { value: content } }, "content")
            }
          />
        </Box>
        <FormErrorMessage>{contentError}</FormErrorMessage>
      </FormControl>

      {/* -------------------- 파일 -------------------- */}
      <Filednd
        editUploadFiles={editUploadFiles}
        setEditUploadFiles={setEditUploadFiles}
        mode={mode}
        setUploadFiles={setUploadFiles}
        uploadFiles={uploadFiles}
      />

      {/* -------------------- 버튼 섹션 --------------------*/}
      {/* 저장 버튼 */}
      <Button
        onClick={handleSubmit}
        colorScheme="blue"
        isDisabled={isSubmitting}
      >
        수정 완료
      </Button>

      {/* 취소 버튼 */}
      <Button onClick={() => navigate("/board/" + board.id)} colorScheme="red">
        취소
      </Button>
    </Box>
  );
}

export default BoardEdit;
