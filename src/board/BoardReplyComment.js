import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";

function ReplyCommentForm({ comment_id }) {
  const [reply_comment, setReply_comment] = useState("");

  function handleReplySubmit() {
    axios.post("/api/comment/reply/add", {
      comment_id: comment_id,
      reply_comment: reply_comment,
    });
  }

  return (
    <Box>
      <Textarea
        value={reply_comment}
        onChange={(e) => setReply_comment(e.target.value)}
      />
      <Button onClick={handleReplySubmit}>쓰기</Button>
    </Box>
  );
}

function ReplyCommentList() {
  return <Box>대댓리스트</Box>;
}

export function BoardReplyComment({ comment_id }) {
  return (
    <Box>
      <ReplyCommentForm comment_id={comment_id} />
      <ReplyCommentList />
    </Box>
  );
}
