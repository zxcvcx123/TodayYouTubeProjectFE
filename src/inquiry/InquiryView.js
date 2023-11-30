import React, { useEffect, useState } from "react";
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

function InquiryView(props) {
  const [inquiry, setInquiry] = useState(null);

  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  // App에서 :id 로 넘겼을때 객체 형태로 넘어가기 때문에 {}로 받아서 사용한다.
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("/api/inquiry/" + id)
      .then((response) => setInquiry(response.data));
  }, []);

  if (inquiry == null) {
    return <Spinner />;
  }

  return (
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
      <Button colorScheme="blue" onClick={() => navigate("/api/inquiry/edit")}>
        수정
      </Button>
      <Button colorScheme="red" onClick={onOpen}>
        삭제
      </Button>

      {/* 삭제 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>문의글을 삭제하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              닫기
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                navigate("/inquiry/list");
                toast({
                  description: "글이 삭제되었습니다.",
                  status: "success",
                });
              }}
            >
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default InquiryView;
