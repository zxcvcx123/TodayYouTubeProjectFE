import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useImmer } from "use-immer";

function BoardEdit() {
  const [board, updateBoard] = useImmer(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  function handleSubmit() {}

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

      {/* 저장 버튼 */}
      <Button onClick={handleSubmit} colorScheme="blue">
        수정 완료
      </Button>
    </Box>
  );
}

export default BoardEdit;
