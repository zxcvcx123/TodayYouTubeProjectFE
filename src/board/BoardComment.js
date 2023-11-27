import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
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

function CommentList({ commentList, onDeleteModalOpen, isSubmitting }) {
  return (
    <Card border="1px solid black" borderRadius="5" mt={3}>
      <CardHeader size="md">댓글 목록</CardHeader>
      <Divider colorScheme="whiteAlpha" />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="5">
          {commentList.map((comment) => (
            <Box key={comment.id}>
              <Flex justifyContent="space-between">
                <Heading size="xs" bg="whitesmoke" borderRadius="5">
                  {comment.member_id}
                </Heading>
                <Text size="xs" as="sub">
                  {comment.created_at}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" alignItems="center">
                <Text sx={{ whiteSpace: "pre-wrap" }} pt="2" fontSize="sm">
                  {comment.comment}
                </Text>
                <Button
                  isDisabled={isSubmitting}
                  onClick={() => onDeleteModalOpen(comment.id)}
                  colorScheme="red"
                  size="xs"
                >
                  삭제
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function BoardComment({ board_id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [id, setId] = useState(0);

  const [commentList, setCommentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

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

  function handleDelete() {
    setIsSubmitting(true);

    axios.delete("/api/comment/" + id).finally(() => {
      setIsSubmitting(false);
      onClose();
    });
  }

  function handleDeleteModalOpen(id) {
    setId(id);

    onOpen();
  }

  return (
    <Box mt={5}>
      <CommentFrom
        board_id={board_id}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList
        board_id={board_id}
        isSubmitting={isSubmitting}
        commentList={commentList}
        onDeleteModalOpen={handleDeleteModalOpen}
      />

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>삭제 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>삭제 하시겠습니까?</ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button
              isDisabled={isSubmitting}
              onClick={handleDelete}
              colorScheme="red"
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
