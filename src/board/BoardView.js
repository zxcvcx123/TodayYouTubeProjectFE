import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BoardView() {
  // state
  const [board, setBoard] = useState(null);

  //URL 매개변수 추출
  const { id } = useParams();

  useEffect(() => {
    axios.get("api/board/id/" + id).then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>{board.id} 번 게시글 보기</Heading>

      {/* 제목 */}
      <FormControl mb={2}>
        <FormLabel>제목</FormLabel>
        <Input value={board.title} readOnly />
      </FormControl>

      {/* 링크 */}
      <FormControl mb={2}>
        <FormLabel>링크</FormLabel>
        <Input value={board.link} readOnly />
      </FormControl>

      {/* 본문 */}
      <FormControl mb={2}>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} readOnly resize={"none"} />
      </FormControl>
    </Box>
  );
}

export default BoardView;
