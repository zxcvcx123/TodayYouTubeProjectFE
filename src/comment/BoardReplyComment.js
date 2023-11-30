import {
  Box,
  Button,
  Card,
  CardBody,
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
import YouTube from "react-youtube";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReplyCommentForm({
  comment_id,
  isSubmitting,
  onSubmit,
  isReplyFormOpen,
}) {
  const [reply_comment, setReply_comment] = useState("");

  function handleReplySubmit() {
    onSubmit({ comment_id, reply_comment });
  }

  return (
    <Box>
      <Flex>
        <Textarea
          value={reply_comment}
          onChange={(e) => setReply_comment(e.target.value)}
        />
        <Button
          size="sm"
          h="80px"
          isDisabled={isSubmitting}
          onClick={handleReplySubmit}
        >
          쓰기
        </Button>
      </Flex>
    </Box>
  );
}

function ReplyCommentItem({
  reply_comment,
  onDeleteModalOpen,
  setIsSubmitting,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const toast = useToast();
  const [replyEdited, setReplyEdited] = useState(reply_comment.reply_comment);

  function handleSubmit() {
    setIsSubmitting(true);
    axios
      .put("/api/comment/reply/edit", {
        id: reply_comment.id,
        reply_comment: replyEdited,
      })
      .then(() => {
        toast({
          description: "댓글이 수정되었습니다.",
          status: "success",
        });
      })
      .catch((error) => console.log("bad"))
      .finally(() => {
        setIsSubmitting(false);
        setIsEditing(false);
      });
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="xs" bg="whitesmoke" borderRadius="5">
          {reply_comment.nickname}({reply_comment.member_id})
        </Heading>
        <Flex gap={2} alignItems="center">
          <Text fontSize="xs">{reply_comment.created_at}</Text>
          <Box>
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
                  취소
                </Button>
              )}

              <Button
                onClick={() => onDeleteModalOpen(reply_comment.id)}
                size="xs"
                colorScheme="red"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Text sx={{ whiteSpace: "pre-wrap" }} pt={2} fontSize="sm">
            {reply_comment.reply_comment}
          </Text>
          {isEditing && (
            <Box>
              <Textarea
                value={replyEdited}
                onChange={(e) => setReplyEdited(e.target.value)}
              />
              <Button size="xs" colorScheme="telegram" onClick={handleSubmit}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

function ReplyCommentList({
  reply_commentList,
  onDeleteModalOpen,
  setIsSubmitting,
}) {
  return (
    <Card ml={5}>
      <CardBody>
        <Stack divider={<StackDivider />} spacing={4}>
          {reply_commentList.map((reply_comment) => (
            <ReplyCommentItem
              key={reply_comment.id}
              reply_comment={reply_comment}
              setIsSubmitting={setIsSubmitting}
              onDeleteModalOpen={onDeleteModalOpen}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function BoardReplyComment({
  comment_id,
  isReplyFormOpen,
  isReplyListOpen,
  setIsReplyFormOpen,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const replyIdRef = useRef(0);

  const toast = useToast();
  const [reply_commentList, setReply_commentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

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
    setIsReplyFormOpen(true);

    axios
      .post("/api/comment/reply/add", reply_comment)
      .then(() => {
        toast({
          description: "댓글이 등록되었습니다.",
          status: "success",
        });
      })
      .catch((error) => console.log("bad"))
      .finally(() => {
        setIsSubmitting(false);
        setIsReplyFormOpen(false);
      });
  }

  function handleReplyDelete() {
    setIsSubmitting(true);

    axios
      .delete("/api/comment/reply/" + replyIdRef.current)
      .then(() => {
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "success",
        });
      })
      .catch((error) => console.log("bad"))
      .finally(() => {
        onClose();
        setIsSubmitting(false);
      });
  }

  function handleReplyDeleteModalOpen(reply_id) {
    replyIdRef.current = reply_id;
    onOpen();
  }

  return (
    <Box>
      {isReplyFormOpen && (
        <ReplyCommentForm
          comment_id={comment_id}
          isSubmitting={isSubmitting}
          onSubmit={handleReplySubmit}
          isReplyFormOpen={isReplyFormOpen}
        />
      )}
      {isReplyListOpen && (
        <ReplyCommentList
          comment_id={comment_id}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          reply_commentList={reply_commentList}
          isReplyListOpen={isReplyListOpen}
          onDeleteModalOpen={handleReplyDeleteModalOpen}
        />
      )}

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
              onClick={handleReplyDelete}
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
