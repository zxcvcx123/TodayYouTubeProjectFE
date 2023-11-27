import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios, { post } from "axios";
import { Footer } from "../layout/Footer";

function CommentFrom({ board_id, isSubmitting, onSubmit }) {
  const [comment, setComment] = useState("");

  function handleSubmit() {
    onSubmit({ board_id, comment });
  }

  return (
    <Flex>
      <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button isDisabled={isSubmitting} h="80px" onClick={handleSubmit}>
        쓰기
      </Button>
    </Flex>
  );
}

function CommentList({ commentList }) {
  return (
    <Card border="1px solid black" borderRadius="5" mt={3}>
      <CardHeader size="md">댓글 목록</CardHeader>
      <Divider colorScheme="whiteAlpha" />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="5">
          {commentList.map((comment) => (
            <Box>
              <Flex justifyContent="space-between">
                <Heading size="xs" bg="whitesmoke" borderRadius="5">
                  {comment.member_id}
                </Heading>
                <Text size="xs" as="sub">
                  {comment.created_at}
                </Text>
              </Flex>
              <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                {comment.comment}
              </Text>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function BoardComment({ board_id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [commentList, setCommentList] = useState([]);

  const params = new URLSearchParams();
  params.set("id", board_id);

  useEffect(() => {
    if (!isSubmitting) {
      axios
        .get("/api/comment/list?" + params)
        .then((response) => setCommentList(response.data));
    }
  }, [isSubmitting]);

  function handleSubmit(comment) {
    setIsSubmitting(true);

    axios
      .post("/api/comment/add", comment)
      .finally(() => setIsSubmitting(false));
  }

  return (
    <Box mt={5}>
      <CommentFrom
        board_id={board_id}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList board_id={board_id} commentList={commentList} />
    </Box>
  );
}
