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

import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import {
  faPenToSquare,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DetectLoginContext } from "../component/LoginProvider";
import { useLocation } from "react-router-dom";

function ReplyCommentForm({
  comment_id,
  isSubmitting,
  onSubmit,
  isReplyFormOpen,
  setReply_commentList,
  reply_commentList,
}) {
  const [reply_comment, setReply_comment] = useState("");
  const { token, loginInfo } = useContext(DetectLoginContext);

  function handleReplySubmit() {
    onSubmit({
      comment_id,
      reply_comment,
    });
  }

  return (
    <Box mb={2}>
      <Flex gap={2}>
        <Textarea
          border="1px solid black"
          borderRadius="5"
          mt={2}
          ml={5}
          value={reply_comment}
          onChange={(e) => setReply_comment(e.target.value)}
          isDisabled={!loginInfo.member_id}
          placeholder={
            loginInfo.member_id ? "댓글을 입력하세요" : "로그인 해주세요"
          }
        />
        <Button
          colorScheme="telegram"
          mt={2}
          size="sm"
          h="80px"
          isDisabled={isSubmitting || !loginInfo.member_id}
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
  reply_commentList,
  setReply_commentList,
}) {
  const { token, loginInfo } = useContext(DetectLoginContext);

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
          <Text fontSize="xs">{reply_comment.ago}</Text>
          {/*{loginInfo.member_id === reply_comment.member_id && (*/}
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
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
              )}

              <Button
                onClick={() =>
                  onDeleteModalOpen(reply_comment.id, reply_comment.member_id)
                }
                size="xs"
                colorScheme="red"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Flex>
          </Box>
          {/*)}*/}
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
  setReply_commentList,
}) {
  return (
    <Card ml={5} border="1px solid black" borderRadius="5" mt={2}>
      <CardBody>
        {reply_commentList.length > 0 ? (
          <Stack
            divider={<StackDivider border={"1px solid lightgray"} />}
            spacing={4}
          >
            {reply_commentList.map((reply_comment) => (
              <ReplyCommentItem
                key={reply_comment.id}
                reply_comment={reply_comment}
                setIsSubmitting={setIsSubmitting}
                onDeleteModalOpen={onDeleteModalOpen}
                reply_commentList={reply_commentList}
                setReply_commentList={setReply_commentList}
              />
            ))}
          </Stack>
        ) : (
          <Text>답글이 없습니다.</Text>
        )}
      </CardBody>
    </Card>
  );
}

export function BoardReplyComment({
  comment_id,
  isReplyFormOpen,
  setIsReplyFormOpen,
  isReplyListOpen,
  setIsReplyListOpen,
  setNumberOfReply,
}) {
  const { token, loginInfo } = useContext(DetectLoginContext);
  const replyIdRef = useRef(0);
  const replyMemberId = useRef("");

  const toast = useToast();

  // const [isReplyListOpen, setIsReplyListOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reply_commentList, setReply_commentList] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const location = useLocation();

  useEffect(() => {
    if (loginInfo !== null) {
      if (!isSubmitting) {
        const params = new URLSearchParams();
        params.set("reply_id", comment_id);

        axios.get("/api/comment/reply/list?" + params).then((response) => {
          setReply_commentList(response.data);
          setNumberOfReply(response.data.length);
        });
      }
    } else {
      if (!isSubmitting) {
        const params = new URLSearchParams();
        params.set("reply_id", comment_id);

        axios.get("/api/comment/reply/list?" + params).then((response) => {
          setReply_commentList(response.data);
          setNumberOfReply(response.data.length);
        });
      }
    }
  }, [isSubmitting, loginInfo]);

  function handleReplySubmit(reply_comment) {
    setIsSubmitting(true);
    setIsReplyFormOpen(true);

    if (location.pathname.includes("vote")) {
      axios
        .post("/api/comment/reply/vote/add", {
          reply_comment: reply_comment.reply_comment,
          comment_id: reply_comment.comment_id,
          member_id: loginInfo.member_id,
        })
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
    } else {
      axios
        .post("/api/comment/reply/add", {
          reply_comment: reply_comment.reply_comment,
          comment_id: reply_comment.comment_id,
          member_id: loginInfo.member_id,
        })
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
  }

  function handleReplyDelete() {
    if (loginInfo.member_id === replyMemberId.current) {
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
  }

  function handleReplyDeleteModalOpen(reply_id, memberid) {
    replyIdRef.current = reply_id;
    replyMemberId.current = memberid;

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
          reply_commentList={reply_commentList}
          setReply_commentList={setReply_commentList}
        />
      )}

      {isReplyListOpen && (
        <ReplyCommentList
          comment_id={comment_id}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          reply_commentList={reply_commentList}
          isReplyListOpen={isReplyListOpen}
          setIsReplyListOpen={setIsReplyListOpen}
          onDeleteModalOpen={handleReplyDeleteModalOpen}
          reply_commentList={reply_commentList}
          setReply_commentList={setReply_commentList}
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
