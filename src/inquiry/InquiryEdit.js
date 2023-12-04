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
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function InquiryEdit(props) {
  const [inquiry, setInquiry] = useState();
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [inquiry_category, setInquiry_category] = useState([]);

  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { id } = useParams();

  // 초기 화면
  useEffect(() => {
    axios
      .get("/api/inquiry/" + id)
      .then((response) => setInquiry(response.data));
  }, []);

  if (inquiry == null) {
    return <Spinner />;
  }

  function handleUpdateButton() {
    axios
      .put("/api/inquiry/edit/", { id, title, content, inquiry_category })
      .then(() => navigate("/inquiry/list"));
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
          onChange={(e) => setInquiry_category(e.target.value)}
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
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setContent(e.target.value)}
        ></Textarea>
      </FormControl>
      <Button colorScheme="blue" onClick={handleUpdateButton}>
        수정완료
      </Button>
      <Button onClick={onOpen}>취소</Button>
    </Box>
  );
}

export default InquiryEdit;
