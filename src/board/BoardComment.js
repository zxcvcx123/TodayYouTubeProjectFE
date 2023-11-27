import { Box, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

function CommentFrom({ board_id }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    axios.post("/api/comment/add", {
      board_id: board_id,
      comment: comment,
    });
  }

  return (
    <Box>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleSubmit}>쓰기</Button>
    </Box>
  );
}

function CommentList() {
  return <Box>댓글 리스트</Box>;
}

export function BoardComment({ board_id }) {
  return (
    <Box>
      <CommentFrom board_id={board_id} />
      <CommentList />
    </Box>
  );
}
