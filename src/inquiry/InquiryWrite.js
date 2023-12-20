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
  Flex,
  FormControl,
  FormLabel,
  Heading,
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
  Text,
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

  // 소켓
  const { stompClient, setToId, IsConnected } = useContext(SocketContext);

  const [uuid, setUuid] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inquiry_category, setInquiry_category] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [returnData, setReturnData] = useState(content);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();

  /* ck에디터 이미지 첨부 개수 확인 */
  let imgFile = document.getElementsByTagName("figure");
  // write 도메인에 쳐서 들어올경우
  useEffect(() => {
    if (!token.detectLogin) {
      navigate("/inquiry/list");
    }
  }, []);

  function handleWriteButton() {
    setIsSubmitting(true);

    if (imgFile.length > 5) {
      toast({
        description: "이미지 개수를 초과했습니다. (최대 5개)",
        status: "info",
      });
      let htmlContent = content; // 여기에 HTML 컨텐츠를 넣으세요.
      htmlContent = htmlContent.replace(
        /<figure[^>]*>([\s\S]*?)<\/figure>/g,
        "",
      );
      setReturnData(htmlContent);
      setIsSubmitting(false);
    }

    if (imgFile.length < 6) {
      // 에디터 이미지 uuid arr 형태 변수에 담아주기
      let uuSrc = getSrc();

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
        .finally(() => {
          setIsSubmitting(false);
        });
    }
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
    <Box width={"80%"} m={"auto"} mt={10}>
      <Heading mb={5}>문의하기</Heading>

      <FormControl mb={5}>
        <FormLabel fontWeight={"bold"}>
          <Text>문의유형</Text>
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
        <FormLabel fontWeight={"bold"}>제목</FormLabel>
        <Input
          borderColor={"black.300"}
          type="text"
          width={"70%"}
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </FormControl>
      {/*<Editor />*/}
      <FormControl mb={5}>
        <FormLabel fontWeight={"bold"}>
          <Flex>
            <Text>문의 내용</Text>
            <Flex alignItems={"end"}>
              <Text color="gray" fontSize={"0.75rem"}>
                (본문 내 이미지는 최대 5개 / 1개당 최대 500kb / 총 1mb)
              </Text>
            </Flex>
          </Flex>
        </FormLabel>
        {/*<Textarea*/}
        {/*  borderColor={"black.300"}*/}
        {/*  padding={3}*/}
        {/*  size={"xl"}*/}
        {/*  h={"300px"}*/}
        {/*  placeholder="문의하실 내용을 입력해주세요"*/}
        {/*  onChange={(e) => setContent(e.target.value)}*/}
        {/*></Textarea>*/}
        <Editor
          setUuid={setUuid}
          uuid={uuid}
          setContent1={setContent}
          data={returnData}
        />
      </FormControl>
      {IsConnected && (
        <Button
          isDisabled={isSubmitting}
          onClick={() => {
            handleWriteButton();
            send();
          }}
          colorScheme={"blue"}
          mr={2}
        >
          작성완료
        </Button>
      )}
      {IsConnected || (
        <Button isDisabled={true} colorScheme={"blue"} mr={2}>
          연결중
        </Button>
      )}
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
