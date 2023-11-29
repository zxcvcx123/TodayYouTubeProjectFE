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

function BoardEdit() {
  const [board, updateBoard] = useImmer(null);
  const [editUploadFiles, setEditUploadFiles] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [mode, setMode] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

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

        uploadFiles,
      })
      .then(() => navigate("/board/list"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  // 게시글 수정시 상태 업데이트
  function handleBoardUpdate(e, field) {
    updateBoard((draft) => {
      draft[field] = e.target.value;
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
        <Textarea
          value={board.content}
          onChange={(e) => handleBoardUpdate(e, "content")}
          h={"sm"}
          resize={"none"}
        />
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
    </Box>
  );
}

export default BoardEdit;
