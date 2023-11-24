import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
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
    axios
      .get("/api/board/id/" + id)
      .then((response) => setBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Heading>{board.id} 번 게시글 보기</Heading>

      {/* 제목 */}
      <FormControl mt={10} mb={2}>
        <Text fontSize={"large"} as={"strong"}>
          {board.title}
        </Text>
        <Flex justifyContent={"space-between"}>
          <Text>
            {board.board_member_id} | {board.updated_at}
          </Text>
          <Text>좋아요 | 조회수</Text>
        </Flex>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 링크 */}
      <FormControl mb={2}>
        <FormLabel>유튜브 링크</FormLabel>
        <Text>{board.link}</Text>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 본문 */}
      <FormControl mb={2}>
        <FormLabel>본문</FormLabel>
        <Textarea value={board.content} readOnly resize={"none"} />
      </FormControl>
    </Box>
  );
}

export default BoardView;
