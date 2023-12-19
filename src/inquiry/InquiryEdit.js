import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
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
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";
import Editor from "../component/Editor";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { DetectLoginContext } from "../component/LoginProvider";

function InquiryEdit(props) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [inquiry, setInquiry] = useState();
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [inquiry_category, setInquiry_category] = useState([]);
  const [uuid, setUuid] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { id } = useParams();

  // 초기 화면
  useEffect(() => {
    axios.get("/api/inquiry/" + id).then((response) => {
      setInquiry(response.data);
      setTitle(response.data.title);
      setInquiry_category(response.data.category_code);
      setContent(response.data.content);
    });
  }, []);

  if (inquiry == null) {
    return <LoadingPage />;
  }

  function handleUpdateButton() {
    setIsSubmitting(true);
    axios
      .put("/api/inquiry/edit", {
        id,
        title,
        content,
        inquiry_category,
        uuSrc,
        inquiry_member_id: inquiry.inquiry_member_id,
        login_member_id: loginInfo.member_id,
      })
      .then(() => {
        navigate("/inquiry/list");
        toast({
          description: "수정이 완료되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "권한이 없습니다.",
          status: "error",
        });
      })
      .finally(() => setIsSubmitting(false));
  }

  // 에디터 이미지 uuid arr 형태 변수에 담아주기
  let uuSrc = getSrc();

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
      <FormControl mb={1}>
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
      <FormControl mb={1}>
        <FormLabel fontWeight={"bold"} ml={3}>
          제목
        </FormLabel>
        <Input
          type="text"
          width={"70%"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          borderColor={"black.300"}
        ></Input>
      </FormControl>
      {/*<Editor />*/}
      <FormControl mb={1}>
        <FormLabel fontWeight={"bold"} ml={3}>
          문의내용
        </FormLabel>
        {/*<Textarea*/}
        {/*  padding={3}*/}
        {/*  size={"xl"}*/}
        {/*  h={"300px"}*/}
        {/*  value={inquiry.content}*/}
        {/*  borderColor={"black.300"}*/}
        {/*  onChange={(e) => setContent(e.target.value)}*/}
        {/*></Textarea>*/}
        <Editor
          data={content}
          setUuid={setUuid}
          uuid={uuid}
          setContent1={setContent}
        />
      </FormControl>
      <Button
        isDisabled={isSubmitting}
        colorScheme="blue"
        onClick={handleUpdateButton}
      >
        수정완료
      </Button>
      <Button onClick={onOpen}>취소</Button>

      {/* 수정 취소모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>수정을 취소하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              닫기
            </Button>
            <Button
              isDisabled={isSubmitting}
              colorScheme="blue"
              onClick={() => {
                navigate("/inquiry/" + id);
                toast({
                  description: "수정이 취소되었습니다.",
                  status: "warning",
                });
              }}
            >
              수정취소
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default InquiryEdit;
