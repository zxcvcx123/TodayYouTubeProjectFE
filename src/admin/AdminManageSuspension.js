import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Flex,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Center,
  AlertIcon,
  AlertTitle,
  Alert,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Sidenav } from "./Sidenav";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";
import { DetectLoginContext } from "../component/LoginProvider";
import Pagination from "../page/Pagination";

function AdminManageSuspension(props) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [suspensionList, setSuspensionList] = useState(null);
  const [releaseList, setReleaseList] = useState(null);
  const [isReleasing, setIsReleasing] = useState(false);
  const [sendingRelease, setSendingRelease] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/admin/suspension?" + params)
      .then((response) => {
        setReleaseList(response.data.releaseList);
        setSuspensionList(response.data.suspensionList);
        setPageInfo(response.data.pageInfo);
      })
      .catch();
  }, [isReleasing, location]);

  if (suspensionList == null || releaseList == null || pageInfo == null) {
    return <LoadingPage />;
  }

  function handleReleaseSuspension(sendingRelease) {
    setIsReleasing(true);
    setIsSubmitting(true);
    axios
      .put("/api/admin/suspension", {
        id: sendingRelease.id,
        member_id: sendingRelease.member_id,
        role_name: loginInfo.role_name,
      })
      .then(() => {
        onClose();
        toast({
          description: "정지가 해제되었습니다.",
          status: "success",
        });
      })

      .catch((error) => {
        if (error.response && error.response.status === 403) {
          toast({
            description: "접근 불가한 경로입니다.",
            status: "error",
          });
          navigate("/");
        }
      })
      .finally(() => {
        setIsReleasing(false);
        setIsSubmitting(false);
      });
  }

  function handleModalClick(release) {
    setSendingRelease(release);
    onOpen();
  }

  // 운영자만 문의게시판으로(/admin으로 검색해서 들어올때)
  if (!token.detectLogin || loginInfo.role_name !== "운영자") {
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
            관리자페이지 입니다!
          </AlertTitle>
          <Button mt={5} onClick={() => navigate("/")}>
            메인페이지로 가기
          </Button>
        </Alert>
      </Box>
    );
  }

  function handleEarlyRelease(suspension) {
    setSendingRelease(suspension);
    onOpen();
  }

  return (
    <Flex>
      <Sidenav />
      <Box w={"80%"}>
        <Box ml={10}>
          <Heading mt={10}>정지가 끝난 회원(정지해제 처리 요망)</Heading>
          {releaseList &&
            releaseList.map((release) => (
              <Card w={"50%"} m={"auto"} mt={10}>
                <CardHeader>
                  <Flex justifyContent={"space-between"}>
                    <Heading size="md">
                      정지회원 ID : {release.member_id}
                    </Heading>
                    <Button
                      colorScheme="red"
                      onClick={() => handleModalClick(release)}
                    >
                      정지 해제!
                    </Button>
                  </Flex>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="sm" textTransform="uppercase">
                        [정지사유]
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {release.reason}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm" textTransform="uppercase">
                        [정지시작 일짜]
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {release.start_date}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm" textTransform="uppercase">
                        [정지해제 일자]
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {release.end_date}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          {releaseList == "" && (
            <Center mt={10}>
              <Text fontWeight={"bold"}>
                현재 정지해제 해야할 회원들은 없습니다.
              </Text>
            </Center>
          )}
        </Box>
        <Divider mt={20} />
        <Box ml={10}>
          <Heading mt={90}>정지중인 회원들</Heading>
          {suspensionList &&
            suspensionList.map((suspension) => (
              <Card w={"50%"} m={"auto"} mt={10} mb={5} key={suspension.id}>
                <CardHeader>
                  <Flex justifyContent={"space-between"}>
                    <Heading size="md">
                      정지회원 ID : {suspension.member_id}
                    </Heading>
                    <Box
                      h={"50px"}
                      w={"40%"}
                      bgColor="blue.200"
                      borderRadius={(2, 20)}
                    >
                      <Text
                        lineHeight={"50px"}
                        fontWeight={"bold"}
                        m={"auto"}
                        textAlign={"center"}
                        alignItems={"center"}
                      >
                        정지 해제까지 : {suspension.remaindate}일 +{" "}
                        {suspension.remaintime}
                      </Text>
                      <Flex justifyContent={"space-between"} mt={3}>
                        <Box></Box>
                        <Button
                          colorScheme="red"
                          onClick={() => handleEarlyRelease(suspension)}
                        >
                          조기 정지해제
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="sm" textTransform="uppercase">
                        [정지사유]
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {suspension.reason}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm" textTransform="uppercase">
                        [정지시작 일자]
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {suspension.start_date}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="sm" textTransform="uppercase">
                        [정지해제 일자]
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {suspension.end_date}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          <Pagination pageInfo={pageInfo} />
        </Box>
        {/* 삭제 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>정지를 해제시키시겠습니까?</ModalBody>
            <ModalFooter>
              <Button variant={"ghost"} onClick={onClose}>
                닫기
              </Button>
              <Button
                isDisabled={isSubmitting}
                colorScheme="blue"
                onClick={() => handleReleaseSuspension(sendingRelease)}
              >
                정지해제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default AdminManageSuspension;
