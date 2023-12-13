import React, { useContext, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Divider,
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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Editor from "../component/Editor";
import { DetectLoginContext } from "../component/LoginProvider";
import { SocketContext } from "../socket/Socket";
import memberInfo from "../member/memberInfo/MemberInfo";

function InquiryWrite() {
  const connectUser = localStorage.getItem("memberInfo");
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inquiry_category, setInquiry_category] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();

  const { stompClient, setToId } = useContext(SocketContext);

  function handleWriteButton() {
    axios
      .post("/api/inquiry/write", {
        title,
        content,
        inquiry_category,
        inquiry_member_id: loginInfo.member_id,
      })
      .then(() => {
        navigate("/inquiry/list");
        toast({
          description: "문의가 접수되었습니다.",
          status: "success",
        });
      })
      .catch(() =>
        toast({
          description: "작성을 완료해주세요",
          status: "warning",
        }),
      )
      .finally(() => console.log("done"));
  }
  if (loginInfo == null) {
    return <Spinner />;
  }

  // 문의글 등록시 운영자에게 알림
  function send() {
    // 문의 목록
    stompClient.current.publish({
      destination: "/app/inquiry/sendalarm",
      body: JSON.stringify({
        sender_member_id: connectUser,
      }),
    });
  }

  return (
    <Box width={"80%"} m={"auto"}>
      <FormControl mb={5}>
        <FormLabel fontWeight={"bold"} ml={3}>
          문의유형
        </FormLabel>
        <Select
          borderColor={"black"}
          size={"sm"}
          width={"30%"}
          placeholder="문의 유형을 선택하세요"
          onChange={(e) => setInquiry_category(e.target.value)}
        >
          <option disabled>-------------------------------------------</option>
          <option value={"1"}>개선사항</option>
          <option value={"2"}>유저신고</option>
          <option value={"3"}>광고/협찬문의</option>
          <option value={"4"}>기타/요청사항</option>
        </Select>
      </FormControl>
      <FormControl mb={5}>
        <FormLabel fontWeight={"bold"} ml={3}>
          제목
        </FormLabel>
        <Input
          borderColor={"black.300"}
          type="text"
          width={"70%"}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </FormControl>
      {/*<Editor />*/}
      <FormControl mb={5}>
        <FormLabel fontWeight={"bold"} ml={3}>
          문의내용
        </FormLabel>
        <Textarea
          borderColor={"black.300"}
          padding={3}
          size={"xl"}
          h={"300px"}
          placeholder="문의하실 내용을 입력해주세요"
          onChange={(e) => setContent(e.target.value)}
        ></Textarea>
      </FormControl>
      <Button
        onClick={() => {
          handleWriteButton();
          send();
        }}
        colorScheme={"blue"}
      >
        작성완료
      </Button>
      <Button colorScheme="red" onClick={onOpen}>
        취소
      </Button>

      {/* 작성취소 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>작성을 취소하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              닫기
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/inquiry/list");
                toast({
                  description: "작성이 취소되었습니다.",
                  status: "warning",
                });
              }}
            >
              네
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default InquiryWrite;
