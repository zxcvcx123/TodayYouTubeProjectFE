import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { ChevronDownIcon } from "@chakra-ui/icons";
import dompurify from "dompurify";

function InquiryWrite() {
  // 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [uuid, setUuid] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inquiry_category, setInquiry_category] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();

  const { stompClient, setToId } = useContext(SocketContext);

  // write 도메인에 쳐서 들어올경우
  useEffect(() => {
    if (!token.detectLogin) {
      navigate("/inquiry/list");
    }
  }, []);

  // 에디터 이미지 uuid arr 형태 변수에 담아주기
  let uuSrc = getSrc();

  function handleWriteButton() {
    axios
      .post("/api/inquiry/write", {
        title,
        content,
        inquiry_category,
        inquiry_member_id: loginInfo.member_id,
        uuSrc,
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

  // 문의글 등록시 운영자에게 알림
  function send() {
    // 문의 목록
    stompClient.current.publish({
      destination: "/app/inquiry/sendalarm",
      body: JSON.stringify({
        sender_member_id: loginInfo.member_id,
      }),
    });
  }

  // 본문 영역 이미지 소스 코드 얻어오기
  function getSrc() {
    let imgSrc = document.getElementsByTagName("img");
    let arrSrc = [];

    for (let i = 0; i < imgSrc.length; i++) {
      if (
        imgSrc[i].src.length > 0 &&
        imgSrc[i].src.startsWith(
          "https://mybucketcontainer1133557799.s3.ap-northeast-2.amazonaws.com/fileserver/",
        )
      ) {
        arrSrc.push(imgSrc[i].src.substring(79, 115));
      }
    }

    return arrSrc;
  }

  return (
    <Box width={"80%"} m={"auto"}>
      <FormControl mb={5}>
        <FormLabel fontWeight={"bold"} ml={3}>
          문의유형
        </FormLabel>
        <Menu>
          <MenuButton
            borderColor={"black"}
            borderRadius="md"
            borderWidth="1px"
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            {inquiry_category === null && "선택"}
            {inquiry_category === "1" && "개선사항"}
            {inquiry_category === "2" && "유저신고"}
            {inquiry_category === "3" && "광고 / 협찬문의"}
            {inquiry_category === "4" && "기타 / 요청사항"}
          </MenuButton>
          <MenuList>
            <MenuItem
              value={"1"}
              onClick={(e) => setInquiry_category(e.target.value)}
            >
              개선사항
            </MenuItem>
            <MenuItem
              value={"2"}
              onClick={(e) => setInquiry_category(e.target.value)}
            >
              유저신고
            </MenuItem>
            <MenuItem
              value={"3"}
              onClick={(e) => setInquiry_category(e.target.value)}
            >
              광고/협찬문의
            </MenuItem>
            <MenuItem
              value={"4"}
              onClick={(e) => setInquiry_category(e.target.value)}
            >
              기타/요청사항
            </MenuItem>
          </MenuList>
        </Menu>
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
        {/*<Textarea*/}
        {/*  borderColor={"black.300"}*/}
        {/*  padding={3}*/}
        {/*  size={"xl"}*/}
        {/*  h={"300px"}*/}
        {/*  placeholder="문의하실 내용을 입력해주세요"*/}
        {/*  onChange={(e) => setContent(e.target.value)}*/}
        {/*></Textarea>*/}
        <Editor setUuid={setUuid} uuid={uuid} setContent1={setContent} />
      </FormControl>
      <Button
        onClick={() => {
          handleWriteButton();
          send();
        }}
        colorScheme={"blue"}
        mr={2}
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
