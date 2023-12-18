import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
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

function InquiryView(props) {
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

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
      .delete("/api/inquiry/delete/" + id)
      .then(() => {
        navigate("/inquiry/list");
        toast({
          description: "글이 삭제되었습니다.",
          status: "success",
        });
      })
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  function handleAnswerClick() {
    navigate("/inquiry/answer/" + id);
  }

  console.log(inquiry);

  return (
    <Box width={"70%"} m={"auto"} mt={10}>
      <Flex w={"100%"} mb={4}>
        <Box fontWeight={"bold"} ml={3} w={"10%"}>
          문의유형 :
        </Box>
        <Input
          value={inquiry.inquiry_category}
          size={"sm"}
          width={"70%"}
          borderColor={"black.300"}
          readOnly
        ></Input>
      </Flex>
      {loginInfo.role_name == "운영자" && (
        <Flex mb={1} w={"100%"} mb={4}>
          <Box fontWeight={"bold"} ml={3} w={"10%"}>
            작성자 :
          </Box>
          <Input
            value={inquiry.inquiry_member_id}
            size={"sm"}
            width={"70%"}
            borderColor={"black.300"}
            readOnly
          ></Input>
        </Flex>
      )}
      <Flex mb={1} mb={4}>
        <Box fontWeight={"bold"} ml={3} w={"10%"}>
          제 목 :
        </Box>
        <Input
          type="text"
          width={"70%"}
          value={inquiry.title}
          readOnly
          borderColor={"black.300"}
        ></Input>
      </Flex>
      {/*<Editor />*/}
      <Flex mb={1} mb={4}>
        <Box fontWeight={"bold"} ml={3} w={"10%"}>
          문의내용 :
        </Box>
        <Textarea
          w={"70%"}
          padding={3}
          size={"xl"}
          h={"300px"}
          value={inquiry.content}
          borderColor={"black.300"}
          readOnly
        ></Textarea>
      </Flex>
      {loginInfo.role_name == "운영자" && (
        <Flex justifyContent={"space-between"} w={"80%"}>
          <Box></Box>
          <Flex>
            <Button mr={5} colorScheme="green" onClick={handleAnswerClick}>
              답변하기
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => navigate("/inquiry/edit/" + id)}
            >
              수정
            </Button>
            <Button colorScheme="red" onClick={onOpen}>
              삭제
            </Button>
          </Flex>
        </Flex>
      )}

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
            <Button colorScheme="blue" onClick={handleDeleteButton}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box w={"70%"} ml={40}>
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
            border={"2px"}
            value={inquiry.answerContent}
            borderColor={"red"}
            borderRadius={(2, 20)}
            readOnly
          ></Textarea>
        </FormControl>
      </Box>

      <ScrollToTop />
    </Box>
  );
}

export default InquiryView;
