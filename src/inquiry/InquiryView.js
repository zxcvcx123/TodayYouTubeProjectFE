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

function InquiryView(props) {
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [inquiry, setInquiry] = useState(null);

  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [answer, setAnswer] = useState(false);

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

  return (
    <Card width={"60%"} m={"auto"}>
      <CardHeader>
        <Flex justifyContent={"space-between"}>
          <Flex fontWeight={"bold"} gap={5}>
            <Text>제목: </Text>
            <Text>{inquiry.title}</Text>
          </Flex>
          <Flex fontWeight={"bold"} gap={5}>
            <Text>{inquiry.inquiry_category}</Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody fontWeight={"bold"}>
        <Text>내용: </Text>
        <Text>{inquiry.content}</Text>
      </CardBody>

      <CardFooter justifyContent={"flex-end"}>
        {loginInfo !== null && loginInfo.role_name === "운영자" && (
          <Box>
            {answer === true ? (
              <Button
                colorScheme="red"
                onClick={() => {
                  setAnswer(false);
                }}
                mr={2}
              >
                답변취소
              </Button>
            ) : (
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
            <Button colorScheme="red" onClick={onOpen}>
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
            <Textarea></Textarea>
          </CardBody>
          <CardFooter justify={"flex-end"}>
            <Button colorScheme="blue" onClick={onOpen}>
              답변
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <></>
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

      <ScrollToTop />
    </Card>
  );
}

export default InquiryView;
