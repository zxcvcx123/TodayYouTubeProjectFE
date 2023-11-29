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
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BoardReplyComment } from "./BoardReplyComment";
import { SmallAddIcon } from "@chakra-ui/icons";
import YouTube from "react-youtube";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import {
  faCommentDots,
  faEnvelope,
  faPen,
  faPencil,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function CommentForm({ board_id, isSubmitting, onSubmit }) {
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
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);

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
        <Flex gap={2} alignItems="center">
          <Text size="xs" as="sub">
            {comment.created_at}
          </Text>
          <Flex gap={0.5}>
            {isEditing || (
              <Button
                size="xs"
                colorScheme="purple"
                onClick={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            )}
            {isEditing && (
              <Button
                size="xs"
                colorScheme="gray"
                onClick={() => setIsEditing(false)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            )}
            <Button
              onClick={() => onDeleteModalOpen(comment.id)}
              colorScheme="red"
              size="xs"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Flex alignItems="center" gap={2}>
            <Text
              sx={{ whiteSpace: "pre-wrap" }}
              pt="2"
              fontSize="sm"
              alignItems="center"
              justifyContent="center"
            >
              {comment.comment}
            </Text>
            <Flex gap={0.3} mt={2}>
              <Button
                size="xs"
                onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}
              >
                <FontAwesomeIcon icon={faPen} />
              </Button>
              <Button
                size="xs"
                onClick={() => setIsReplyListOpen(!isReplyListOpen)}
              >
                <FontAwesomeIcon icon={faCommentDots} />
              </Button>
            </Flex>
          </Flex>

          <BoardReplyComment
            setIsReplyFormOpen={setIsReplyFormOpen}
            isReplyFormOpen={isReplyFormOpen}
            isReplyListOpen={isReplyListOpen}
            comment_id={comment.id}
            onClick={() => {
              setIsReplyFormOpen(false);
            }}
            isReplyFormOpen={isReplyFormOpen}
          />
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
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Box>
          )}
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
  const toast = useToast();

  const [commentList, setCommentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const params = new URLSearchParams();
  params.set("board_id", board_id);

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
      .then(() => {
        toast({
          description: "댓글이 등록되었습니다.",
          status: "success",
        });
      })
      .catch((error) => console.log("bad"))
      .finally(() => setIsSubmitting(false));
  }

  function handleDelete() {
    setIsSubmitting(true);

    axios
      .delete("/api/comment/" + commentIdRef.current)
      .then(() => {
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "success",
        });
      })
      .catch(() => console.log("bad"))
      .finally(() => {
        setIsSubmitting(false);
        onClose();
      });
  }

  function handleCommentDeleteModalOpen(comment_id) {
    commentIdRef.current = comment_id;

    onOpen();
  }

  return (
    <Box mt={5}>
      <CommentForm
        board_id={board_id}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
      />
      <CommentList
        board_id={board_id}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        commentList={commentList}
        onDeleteModalOpen={handleCommentDeleteModalOpen}
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