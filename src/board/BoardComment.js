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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BoardReplyComment } from "./BoardReplyComment";
import { SmallAddIcon } from "@chakra-ui/icons";
import YouTube from "react-youtube";

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

function CommentItem({
  comment,
  onDeleteModalOpen,
  setIsSubmitting,
  isSubmitting,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(comment.comment);

  const toast = useToast();

  function handleSubmit() {
    setIsSubmitting(true);

    axios
      .put("/api/comment/edit", { id: comment.id, comment: commentEdited })
      .then(() => {
        toast({
          description: "댓글이 수정되었습니다.",
          status: "success",
        });
      })
      .catch(console.log("bad"))
      .finally(() => {
        setIsSubmitting(false);
        setIsEditing(false);
      });
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="xs" bg="whitesmoke" borderRadius="5">
          {comment.nickname}({comment.member_id})
        </Heading>
        <Text size="xs" as="sub">
          {comment.created_at}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Text
            sx={{ whiteSpace: "pre-wrap" }}
            pt="2"
            fontSize="sm"
            alignItems="center"
            justifyContent="center"
          >
            {comment.comment}
            <Button size="xs">
              <SmallAddIcon />
            </Button>
            <BoardReplyComment comment_id={comment.id} />
          </Text>

          {isEditing && (
            <Box>
              <Textarea
                value={commentEdited}
                onChange={(e) => setCommentEdited(e.target.value)}
              />
              <Button
                isDisabled={isSubmitting}
                size="xs"
                colorScheme="telegram"
                onClick={handleSubmit}
              >
                저장
              </Button>
            </Box>
          )}
        </Box>
        <Box>
          {isEditing || (
            <Button
              size="xs"
              colorScheme="purple"
              onClick={() => setIsEditing(true)}
            >
              수정
            </Button>
          )}
          {isEditing && (
            <Button
              size="xs"
              colorScheme="gray"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          )}
          <Button
            onClick={() => onDeleteModalOpen(comment.id)}
            colorScheme="red"
            size="xs"
          >
            삭제
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

function CommentList({
  commentList,
  onDeleteModalOpen,
  isSubmitting,
  setIsSubmitting,
}) {
  return (
    <Card border="1px solid black" borderRadius="5" mt={3}>
      <CardHeader size="md">댓글 목록</CardHeader>
      <Divider colorScheme="whiteAlpha" />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="5">
          {commentList.map((comment) => (
            <CommentItem
              key={comment.id}
              isSubmitting={isSubmitting}
              comment={comment}
              setIsSubmitting={setIsSubmitting}
              onDeleteModalOpen={onDeleteModalOpen}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function BoardComment({ board_id }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentIdRef = useRef(0);

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

    axios
      .delete("/api/comment/" + commentIdRef.current)
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  }

  function handleDeleteModalOpen(id) {
    commentIdRef.current = id;

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
        setIsSubmitting={setIsSubmitting}
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
