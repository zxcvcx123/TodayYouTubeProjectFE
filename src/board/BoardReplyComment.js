import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";

function ReplyCommentForm({ comment_id, isSubmitting, onSubmit }) {
  const [reply_comment, setReply_comment] = useState("");

  function handleReplySubmit() {
    onSubmit({ comment_id, reply_comment });
  }

  return (
    <Box>
      <Textarea
        value={reply_comment}
        onChange={(e) => setReply_comment(e.target.value)}
      />
      <Button isDisabled={isSubmitting} onClick={handleReplySubmit}>
        쓰기
      </Button>
    </Box>
  );
}

function ReplyCommentList({ reply_commentList }) {
  return (
    <Card>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {reply_commentList.map((reply_comment) => (
            <Box key={reply_comment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs" bg="whitesmoke" borderRadius="5">
                  {reply_comment.nickname}({reply_comment.member_id})
                </Heading>
                <Text fontSize="xs">{reply_comment.created_at}</Text>
              </Flex>
              <Text sx={{ whiteSpace: "pre-wrap" }} pt={2} fontSize="sm">
                {reply_comment.reply_comment}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function BoardReplyComment({ comment_id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reply_commentList, setReply_commentList] = useState([]);

  useEffect(() => {
    if (!isSubmitting) {
      const params = new URLSearchParams();
      params.set("reply_id", comment_id);

      axios
        .get("/api/comment/reply/list?" + params)
        .then((response) => setReply_commentList(response.data));
    }
  }, [isSubmitting]);

  function handleReplySubmit(reply_comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/reply/add", reply_comment)
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Box>
      <ReplyCommentForm
        comment_id={comment_id}
        isSubmitting={isSubmitting}
        onSubmit={handleReplySubmit}
      />
      <ReplyCommentList
        comment_id={comment_id}
        reply_commentList={reply_commentList}
      />
    </Box>
  );
}
