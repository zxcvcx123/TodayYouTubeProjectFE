import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { Filednd } from "../file/Filednd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Editor from "../component/Editor";

function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const [editUploadFiles, setEditUploadFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [mode, setMode] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

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

  // 게시글을 로딩중이라면 스피너 돌리기
  if (board === null) {
    return <Spinner />;
  }

  // 게시글 수정 버튼 클릭 함수
  function handleSubmit() {
    let uuSrc = getSrc();

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
        uuSrc,
        uploadFiles,
      })
      .then(() => navigate("/board/list"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
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
    });
  }

  return (
    <Box border={"2px solid black"} m={5}>
      <Heading mb={5}>유튜브 추천 :: 게시글 수정하기</Heading>

      {/* 제목 */}
      <FormControl mb={2}>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) => handleBoardUpdate(e, "title")}
        />
      </FormControl>

      {/* 링크 */}
      <FormControl mb={2}>
        <FormLabel>링크</FormLabel>
        <Input
          value={board.link}
          onChange={(e) => handleBoardUpdate(e, "link")}
        />
      </FormControl>

      {/* 본문 */}
      <FormControl mb={2}>
        <FormLabel>본문</FormLabel>
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
      </FormControl>

      {/* 파일 */}
      <Filednd
        editUploadFiles={editUploadFiles}
        setEditUploadFiles={setEditUploadFiles}
        mode={mode}
        setUploadFiles={setUploadFiles}
        uploadFiles={uploadFiles}
      />

      {/* 저장 버튼 */}
      <Button onClick={handleSubmit} colorScheme="blue">
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
