import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Editor from "../component/Editor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { DetectLoginContext } from "../component/LoginProvider";

import ScrollToTop from "../util/ScrollToTop";
import LoadingPage from "../component/LoadingPage";
import dompurify from "dompurify";
import { SocketContext } from "../socket/Socket";

function InquiryView(props) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const { stompClient } = useContext(SocketContext);

  const [answerContent, setAnswerContent] = useState("");
  // App에서 :id 로 넘겼을때 객체 형태로 넘어가기 때문에 {}로 받아서 사용한다.
  const [inquiry, setInquiry] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  // 모달 여러개 쓰기
  const contentDeleteModal = useDisclosure();
  const answerDeleteModal = useDisclosure();

  const toast = useToast();
  const [answer, setAnswer] = useState(false);
  const [answerReadOnly, setAnswerReadOnly] = useState(false);
  const [answerBorder, setAnswerBorder] = useState("");

  // App에서 :id 로 넘겼을때 객체 형태로 넘어가기 때문에 {}로 받아서 사용한다.
  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/inquiry/" + id).then((response) => {
      setInquiry(response.data);
      setAnswerContent(response.data.answerContent);
      if (response.data.answer_status === "답변완료") {
        setAnswerReadOnly(true);
        setAnswerBorder("none");
      }
    });
  }, []);

  if (inquiry == null) {
    return <LoadingPage />;
  }
  if (!token.detectLogin) {
    return (
      <Box w={"80%"} m={"auto"}>
        <Alert
          // colorScheme="red"
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            로그인이 필요한 서비스입니다!
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            문의게시판의 글을 보시려면 로그인 하세요.
          </AlertDescription>
          <Button mt={5} onClick={() => navigate("/member/login")}>
            로그인
          </Button>
        </Alert>
      </Box>
    );
  }

  function handleDeleteButton() {
    axios
      .delete("/api/inquiry/delete/" + id, {
        data: {
          login_member_id: loginInfo.member_id,
          inquiry_member_id: inquiry.inquiry_member_id,
        },
      })
      .then(() => {
        navigate("/inquiry/list");
        toast({
          description: "글이 삭제되었습니다.",
          status: "success",
        });
      })
      .catch()
      .finally();
  }

  // 본문보여주기
  function ViewContents() {
    const contents = dompurify.sanitize(inquiry.content);
    return <Box dangerouslySetInnerHTML={{ __html: contents }}></Box>;
  }

  if (inquiry == null) {
    return <LoadingPage />;
  }

  // 문의 답변시 알람기능
  function send() {
    // 문의 답변 목록
    stompClient.current.publish({
      destination: "/app/answer/sendalarm",
      body: JSON.stringify({
        sender_member_id: loginInfo.member_id,
        receiver_member_id: inquiry.inquiry_member_id,
        inquiry_id: inquiry.id,
        inquiry_title: inquiry.title,
      }),
    });
  }

  function handleAnswerComplete() {
    axios
      .post("/api/inquiry/answer", {
        answer_board_id: id,
        content: answerContent,
        role_name: loginInfo.role_name,
      })
      .then(() => {
        toast({
          description: "답변완료 등록되었습니다.",
          status: "success",
        });
        navigate("/inquiry/list");
      })
      .catch(() => {
        toast({
          description: "답변등록이 실패하였습니다.",
          status: "error",
        });
      });
  }

  // 답변 수정
  function handleEditBtn() {
    setIsSubmitting(true);
    axios
      .put("/api/inquiry/answer/edit", {
        answer_board_id: inquiry.id,
        content: answerContent,
        role_name: loginInfo.role_name,
      })
      .then(() => {
        setAnswerReadOnly(true);
        setAnswerBorder("none");
        toast({
          description: "수정이 완료되었습니다.",
          status: "success",
        });
      })
      .catch()
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleDeleteBtn() {
    axios
      .delete("/api/inquiry/answer/delete", {
        data: {
          answer_board_id: inquiry.id,
          login_member_id: loginInfo.member_id,
          role_name: loginInfo.role_name,
        },
      })
      .then(() => {
        toast({
          description: "답변삭제가 완료되었습니다.",
          status: "success",
        });
      })
      .catch()
      .finally(() => {
        answerDeleteModal.onClose();
        navigate("/inquiry/list");
      });
  }

  return (
    <Box h={"830px"}>
      <Card width={"60%"} m={"auto"} mt={50}>
        <CardHeader>
          <Flex justifyContent={"space-between"}>
            <Flex fontWeight={"bold"} gap={5}>
              <Text w={50}>제목: </Text>
              <Text>{inquiry.title}</Text>
            </Flex>
            <Flex fontWeight={"bold"} gap={5}>
              <Text>{inquiry.inquiry_category}</Text>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody fontWeight={"bold"}>
          <Flex>
            <Text w={50}>내용: </Text>
            <Text>{ViewContents()}</Text>
          </Flex>
        </CardBody>

        <CardFooter justifyContent={"flex-end"}>
          {loginInfo !== null && loginInfo.role_name === "운영자" && (
            <Box>
              {answer === true && inquiry.answer_status === "답변진행중" && (
                <Button
                  colorScheme="red"
                  onClick={() => {
                    setAnswer(false);
                  }}
                  mr={2}
                >
                  답변취소
                </Button>
              )}
              {answer === false &&
                inquiry.answer_status === "답변진행중" &&
                inquiry.inquiry_category !== "공지사항" && (
                  <Button
                    colorScheme="green"
                    onClick={() => {
                      setAnswer(true);
                    }}
                    mr={2}
                  >
                    답변하기
                  </Button>
                )}
              {answer === false && inquiry.answer_status === "답변완료" && (
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    setAnswer(true);
                  }}
                  mr={2}
                >
                  답변보기
                </Button>
              )}
              {answer === true && inquiry.answer_status === "답변완료" && (
                <Button
                  colorScheme="orange"
                  onClick={() => {
                    setAnswer(false);
                  }}
                  mr={2}
                >
                  답변접기
                </Button>
              )}
            </Box>
          )}

          {loginInfo !== null &&
            loginInfo.role_name !== "운영자" &&
            inquiry.answer_status === "답변완료" && (
              <Box>
                {answer === false && inquiry.answer_status === "답변완료" && (
                  <Button
                    colorScheme="purple"
                    onClick={() => {
                      setAnswer(true);
                    }}
                    mr={2}
                  >
                    답변보기
                  </Button>
                )}
                {answer === true && inquiry.answer_status === "답변완료" && (
                  <Button
                    colorScheme="orange"
                    onClick={() => {
                      setAnswer(false);
                    }}
                    mr={2}
                  >
                    답변접기
                  </Button>
                )}
              </Box>
            )}

          {(loginInfo !== null &&
            loginInfo.member_id === inquiry.inquiry_member_id) ||
          loginInfo.role_name === "운영자" ? (
            <Box>
              <Button
                colorScheme="blue"
                onClick={() => navigate("/inquiry/edit/" + id)}
                mr={2}
              >
                수정
              </Button>
              <Button colorScheme="red" onClick={contentDeleteModal.onOpen}>
                삭제
              </Button>
            </Box>
          ) : (
            <></>
          )}
        </CardFooter>

        {answer ? (
          <Card>
            <CardHeader>
              <Text>답변 내용</Text>
            </CardHeader>
            <CardBody>
              <Textarea
                border={answerBorder}
                readOnly={answerReadOnly}
                value={answerContent}
                onChange={(e) => setAnswerContent(e.target.value)}
              ></Textarea>
            </CardBody>
            <CardFooter justify={"flex-end"}>
              <Box>
                {loginInfo !== null && loginInfo.role_name === "운영자" && (
                  <>
                    {inquiry.answer_status !== "답변완료" && (
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          handleAnswerComplete();
                          send();
                        }}
                        mr={2}
                      >
                        답변
                      </Button>
                    )}
                    {answerReadOnly && (
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          setAnswerReadOnly(false);
                          setAnswerBorder("1px solid black");
                        }}
                        mr={2}
                      >
                        수정
                      </Button>
                    )}
                    {answer || (
                      <Button
                        isDisabled={isSubmitting}
                        colorScheme="blue"
                        onClick={handleEditBtn}
                        mr={2}
                      >
                        작성완료
                      </Button>
                    )}
                    <Button
                      colorScheme="red"
                      onClick={answerDeleteModal.onOpen}
                    >
                      삭제
                    </Button>
                  </>
                )}
              </Box>
            </CardFooter>
          </Card>
        ) : (
          <></>
        )}

        {/* 삭제 모달 */}
        <Modal
          isOpen={contentDeleteModal.isOpen}
          onClose={contentDeleteModal.onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>문의글을 삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button variant={"ghost"} onClick={contentDeleteModal.onClose}>
                닫기
              </Button>
              <Button colorScheme="blue" onClick={handleDeleteButton}>
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* 답변삭제 모달 */}
        <Modal
          isOpen={answerDeleteModal.isOpen}
          onClose={answerDeleteModal.onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>답변을 삭제하시겠습니까?</ModalBody>
            <ModalFooter>
              <Button variant={"ghost"} onClick={answerDeleteModal.onClose}>
                닫기
              </Button>
              <Button colorScheme="blue" onClick={handleDeleteBtn}>
                답변삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ScrollToTop />
      </Card>
    </Box>
  );
}

export default InquiryView;
