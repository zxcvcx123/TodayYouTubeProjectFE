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
  Spacer,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import commentLike from "../like/CommentLike";
import { DetectLoginContext } from "../component/LoginProvider";
import { SocketContext } from "../socket/Socket";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";

function CommentForm({
  board_id,
  isSubmitting,
  onSubmit,
  setCommentLike,
  boardData,
  reply_commentList,
  setReply_commentList,
}) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const { stompClient, setToId, IsConnected } = useContext(SocketContext);

  const [comment, setComment] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  function handleSubmit() {
    if (isButtonDisabled || !loginInfo) {
      return;
    }

    setIsButtonDisabled(true);

    onSubmit({ board_id, comment });

    setComment("");

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  }

  // 댓글작성시 알람기능
  function send(comment) {
    // 알림목록, 개수
    stompClient.current.publish({
      destination: "/app/comment/sendalarm/" + loginInfo.member_id,
      body: JSON.stringify({
        sender_member_id: loginInfo.member_id,
        receiver_member_id: boardData.board_member_id,
        board_id: board_id,
        board_title: boardData.board_title,
      }),
    });

    //   // 개수
    //   stompClient.current.publish({
    //     destination: "/app/comment/sendalarm/count/" + loginInfo.member_id,
    //     body: JSON.stringify({
    //       sender_member_id: loginInfo.member_id,
    //       receiver_member_id: boardData.board_member_id,
    //       board_id: board_id,
    //       board_title: boardData.board_title,
    //     }),
    //   });
  }

  return (
    <Flex gap={2}>
      <Textarea
        bg="white"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        isDisabled={!loginInfo}
        placeholder={
          loginInfo
            ? "댓글을 입력하세요."
            : "로그인한 사용자만 입력이 가능합니다."
        }
      />
      {IsConnected && (
        <Button
          colorScheme="telegram"
          isDisabled={isSubmitting || !loginInfo || isButtonDisabled}
          h="80px"
          onClick={() => {
            handleSubmit();
            send();
          }}
        >
          쓰기
        </Button>
      )}
      {IsConnected || (
        <Button colorScheme="telegram" isDisabled={true} h="80px">
          연결중
        </Button>
      )}
    </Flex>
  );
}

function CommentItem({
  comment,
  onDeleteModalOpen,
  setIsSubmitting,
  isSubmitting,
  setCommentLike,
  onCommentLikeClick,
  reply_commentList,
  setReply_commentList,
}) {
  const { token, loginInfo } = useContext(DetectLoginContext);

  const [isEditing, setIsEditing] = useState(false);
  const [commentEdited, setCommentEdited] = useState(comment.comment);
  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);

  const [numberOfReply, setNumberOfReply] = useState(comment.reply_count);

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
      .catch((error) => {
        if (error.response.status === 403) {
          toast({
            description: "댓글 수정은 작성자만 가능합니다.",
            status: "error",
          });
          return;
        }
        if (error.response.status === 401) {
          toast({
            description: "권한 정보가 없습니다.",
            status: "error",
          });
          return;
        }
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsEditing(false);
      });
  }

  function handleCommentLike() {
    axios
      .post("/api/comment/like", {
        member_id: loginInfo.member_id,
        board_id: comment.board_id,
        comment_id: comment.id,
      })
      .then((response) => {
        onCommentLikeClick({ ...response.data, comment_id: comment.id });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast({
            description: "권한 정보가 없습니다.",
            status: "error",
          });
          return;
        }
      })
      .finally();
  }

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Heading size="xs" bg="#f2f2f2" borderRadius="5">
          {comment.nickname}
        </Heading>
        <Flex gap={2} alignItems="center">
          <Text size="xs" as="sub">
            {comment.ago}
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <Flex alignItems="center" gap={2} justifyContent="space-between">
            <Flex>
              <Text
                sx={{ whiteSpace: "pre-wrap" }}
                pt="2"
                fontSize="sm"
                alignItems="center"
                justifyContent="center"
              >
                {comment.comment}
              </Text>

              <Flex gap={0.3} mt={1.5} ml={3}>
                <Tooltip
                  label={
                    loginInfo
                      ? "답글쓰기"
                      : "로그인한 사용자만 작성 가능합니다."
                  }
                >
                  <Button
                    size="xs"
                    colorScheme="blackAlpha"
                    onClick={() => setIsReplyFormOpen(!isReplyFormOpen)}
                    isDisabled={!loginInfo}
                    variant="ghost"
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </Button>
                </Tooltip>

                {numberOfReply > 0 && (
                  <Button
                    size="xs"
                    colorScheme="blackAlpha"
                    onClick={() => setIsReplyListOpen(!isReplyListOpen)}
                    variant="ghost"
                  >
                    답글보기
                  </Button>
                )}

                <Flex alignItems="center">
                  <Button
                    variant="ghost"
                    size="xs"
                    colorScheme="red"
                    onClick={handleCommentLike}
                    isDisabled={!loginInfo}
                  >
                    <Tooltip
                      label={
                        loginInfo ? (
                          <FontAwesomeIcon icon={faHeartRegular} />
                        ) : (
                          "로그인한 사용자만 가능합니다."
                        )
                      }
                    >
                      <FontAwesomeIcon
                        icon={comment.likeHeart ? faHeartSolid : faHeartRegular}
                      />
                    </Tooltip>
                  </Button>
                  <Text fontSize="x-small">{comment.count_comment_like}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex mt={3}>
              {loginInfo && loginInfo.member_id === comment.member_id && (
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
              )}
            </Flex>
          </Flex>

          <BoardReplyComment
            setIsReplyFormOpen={setIsReplyFormOpen}
            isReplyFormOpen={isReplyFormOpen}
            setIsReplyListOpen={setIsReplyListOpen}
            isReplyListOpen={isReplyListOpen}
            comment_id={comment.id}
            onClick={() => {
              setIsReplyFormOpen(false);
            }}
            isReplyFormOpen={isReplyFormOpen}
            reply_commentList={reply_commentList}
            setReply_commentList={setReply_commentList}
            setNumberOfReply={setNumberOfReply}
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
  setCommentLike,
  onCommentLikeClick,
  reply_commentList,
  setReply_commentList,
  isReplyListOpen,
  setIsReplyListOpen,
}) {
  return (
    <Card border="1px solid black" borderRadius="5" mt={2}>
      <CardBody>
        <Stack
          divider={<StackDivider border={"1px solid lightgray"} />}
          spacing="5"
        >
          {commentList.map((comment) => (
            <CommentItem
              key={comment.id}
              isSubmitting={isSubmitting}
              comment={comment}
              setIsSubmitting={setIsSubmitting}
              onDeleteModalOpen={onDeleteModalOpen}
              setCommentLike={setCommentLike}
              onCommentLikeClick={onCommentLikeClick}
              reply_commentList={reply_commentList}
              setReply_commentList={setReply_commentList}
              isReplyListOpen={isReplyListOpen}
              setIsReplyListOpen={setIsReplyListOpen}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}

export function BoardComment({ board_id, boardData }) {
  const { token, loginInfo } = useContext(DetectLoginContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentLike, setCommentLike] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [reply_commentList, setReply_commentList] = useState([]);
  const [isReplyListOpen, setIsReplyListOpen] = useState(false);

  const commentIdRef = useRef(0);
  const toast = useToast();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const params = new URLSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("vote")) {
      if (loginInfo !== null) {
        params.set("member_id", loginInfo.member_id);
        params.set("board_id", board_id);
        if (!isSubmitting) {
          axios.get("/api/comment/vote/list?" + params).then((response) => {
            setCommentList(response.data);
          });
        }

        // 로그인 하지 않은 사용자도 댓글이 보이게
      } else {
        params.set("board_id", board_id);
        if (!isSubmitting) {
          axios.get("/api/comment/vote/list?" + params).then((response) => {
            setCommentList(response.data);
          });
        }
      }
    } else {
      if (loginInfo !== null) {
        params.set("member_id", loginInfo.member_id);
        params.set("board_id", board_id);
        if (!isSubmitting) {
          axios.get("/api/comment/list?" + params).then((response) => {
            setCommentList(response.data);
          });
        }
      }
      // 로그인 하지 않은 사용자도 댓글이 보이게
      else {
        params.set("board_id", board_id);
        if (!isSubmitting) {
          axios.get("/api/comment/list?" + params).then((response) => {
            setCommentList(response.data);
          });
        }
      }
    }
  }, [isSubmitting, loginInfo]);

  function handleCommentLike(data) {
    setCommentList(
      commentList.map((c) => {
        if (c.id == data.comment_id) {
          return {
            ...c,
            likeHeart: data.commentLike,
            count_comment_like: data.countCommentLike,
          };
        } else {
          return c;
        }
      }),
    );
  }

  // 댓글 쓰기 버튼
  function handleSubmit(comment) {
    setIsSubmitting(true);
    if (location.pathname.includes("vote")) {
      axios
        .post("/api/comment/vote/add", {
          comment: comment.comment,
          board_id: comment.board_id,
          member_id: loginInfo.member_id,
        })
        .then(() => {
          toast({
            description: "댓글이 등록되었습니다.",
            status: "success",
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast({
              description: "권한 정보가 없습니다.",
              status: "error",
            });
            return;
          }
        })
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post("/api/comment/add", {
          comment: comment.comment,
          board_id: comment.board_id,
          member_id: loginInfo.member_id,
        })
        .then(() => {
          toast({
            description: "댓글이 등록되었습니다.",
            status: "success",
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast({
              description: "권한 정보가 없습니다.",
              status: "error",
            });
            return;
          }
        })
        .finally(() => setIsSubmitting(false));
    }
  }

  // 댓글 알람가게 하기

  function handleDelete(comment) {
    setIsSubmitting(true);

    axios
      .delete("/api/comment/" + commentIdRef.current)
      .then(() => {
        toast({
          description: "댓글이 삭제되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.status === 403) {
          toast({
            description: " 댓글 삭제는 작성자만 가능합니다.",
            status: "error",
          });
          return;
        }
        if (error.response.status === 401) {
          toast({
            description: "권한 정보가 없습니다.",
            status: "error",
          });
          return;
        }
      })
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
        setCommentLike={setCommentLike}
        boardData={boardData}
        reply_commentList={reply_commentList}
        setReply_commentList={setReply_commentList}
      />
      {commentList.length > 0 ? (
        <CommentList
          board_id={board_id}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          commentList={commentList}
          onDeleteModalOpen={handleCommentDeleteModalOpen}
          setCommentLike={setCommentLike}
          onCommentLikeClick={handleCommentLike}
          reply_commentList={reply_commentList}
          setReply_commentList={setReply_commentList}
          setIsReplyListOpen={setIsReplyListOpen}
          isReplyListOpen={isReplyListOpen}
        />
      ) : (
        <Box h="2rem" />
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
