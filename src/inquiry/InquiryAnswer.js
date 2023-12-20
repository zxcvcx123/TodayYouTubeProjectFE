import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as stompClient from "immer";
import { SocketContext } from "../socket/Socket";
import { DetectLoginContext } from "../component/LoginProvider";
import LoadingPage from "../component/LoadingPage";

function InquiryAnswer(props) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const { stompClient } = useContext(SocketContext);
  const [inquiry, setInquiry] = useState(null);
  const [answerContent, setAnswerContent] = useState("");

  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  // App에서 :id 로 넘겼을때 객체 형태로 넘어가기 때문에 {}로 받아서 사용한다.
  const { id } = useParams();

  useEffect(() => {
    axios.get("/api/inquiry/" + id).then((response) => {
      setInquiry(response.data);
    });
  }, []);

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

  return (
    <Box mt={10}>
      {/*// 문의 내용시작*/}
      <Box width={"80%"} m={"auto"}>
        <FormControl mb={1}>
          <FormLabel fontWeight={"bold"} ml={3}>
            문의유형
          </FormLabel>
          <Input
            value={inquiry.inquiry_category}
            size={"sm"}
            width={"30%"}
            borderColor={"black.300"}
            readOnly
          ></Input>
        </FormControl>
        <FormControl mb={1}>
          <FormLabel fontWeight={"bold"} ml={3}>
            제목
          </FormLabel>
          <Input
            type="text"
            width={"70%"}
            value={inquiry.title}
            readOnly
            borderColor={"black.300"}
          ></Input>
        </FormControl>
        {/*<Editor />*/}
        <FormControl mb={1}>
          <FormLabel fontWeight={"bold"} ml={3}>
            문의내용
          </FormLabel>
          <Textarea
            padding={3}
            size={"xl"}
            h={"300px"}
            value={inquiry.content}
            borderColor={"black.300"}
            readOnly
          ></Textarea>
        </FormControl>
      </Box>
      {/*//   문의 내용 끝*/}
      <Box w={"80%"} m={"auto"}>
        <Box ml={5} mt={5}>
          <FontAwesomeIcon icon={faArrowTurnUp} rotation={90} size="2xl" />
        </Box>
        <FormControl mb={1}>
          <FormLabel fontWeight={"bold"} ml={50}>
            답변내용
          </FormLabel>
          <Textarea
            padding={3}
            size={"xl"}
            h={"300px"}
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            border={"2px"}
            borderColor={"red"}
            borderRadius={(2, 20)}
          ></Textarea>
        </FormControl>
        <Button
          colorScheme={"blue"}
          onClick={() => {
            handleAnswerComplete();
            send();
          }}
        >
          작성완료
        </Button>
        <Button colorScheme="red" onClick={onOpen}>
          취소
        </Button>
      </Box>
    </Box>
  );
}

export default InquiryAnswer;
