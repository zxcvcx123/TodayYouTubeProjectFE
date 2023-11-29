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

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  // 게시글을 로딩중이라면 스피너 돌리기
  if (board === null) {
    return <Spinner />;
  }

  // 게시글 수정 버튼 클릭 함수
  function handleSubmit() {
    axios
      .put("/api/board/edit", board)
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

      {/*/!* 파일 *!/*/}
      {/*<Filednd uploadFiles={uploadFiles} setUploadFiles={setUploadFiles} />*/}

      {/* 저장 버튼 */}
      <Button onClick={handleSubmit} colorScheme="blue">
        수정 완료
      </Button>
    </Box>
  );
}

export default BoardEdit;
