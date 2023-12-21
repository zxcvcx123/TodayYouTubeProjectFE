import React, { useContext, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Sidenav } from "./Sidenav";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";

function AdminMemberInfoDetails({
  memberInfo,
  handleMyBoardList,
  handleMemberInfoMyInfo,
  handleMemberComment,
}) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [suspensionReason, setSuspensionReason] = useState("");
  const [suspensionPeriod, setSuspensionPeriod] = useState(7);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();
  const { onClose, isOpen, onOpen } = useDisclosure();
  const navigate = useNavigate();

  function handleSuspensionButton() {
    setIsSubmitting(true);
    axios
      .put("/api/admin/member", {
        member_id: memberInfo.member_id,
        period: suspensionPeriod,
        reason: suspensionReason,
        role_name: loginInfo.role_name,
      })
      .then(() => {
        toast({
          description: "정지처리가 완료되었습니다.",
          status: "success",
        });
        navigate("/admin/member/list?p=1");
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 400) {
          toast({
            description: "정지사유를 입력해주세요.",
            status: "warning",
          });
        } else if (status === 403) {
          toast({
            description: "권한이 없습니다.",
            status: "error",
          });
        } else if (status === 401) {
          toast({
            description: "이미 정지된 사용자입니다.",
            status: "warning",
          });
        }
      })
      .finally(() => setIsSubmitting(false));
  }

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

  return (
    <Box>
      <Card w={"80%"} p={"20px"} boxShadow={"none"} minWidth="1200px">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Card mt={"5"}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Heading>상세정보</Heading>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          아이디
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.member_id}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          닉네임
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.nickname}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          이메일
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.email}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          생년월일
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.birth_date}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          성별
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.gender === "m" ? "남자" : "여자"}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        {/* ---------------------------등급 ------------------------------*/}
                        <Flex alignItems={"center"}>
                          <Heading size="s" textTransform="uppercase">
                            등급
                          </Heading>
                        </Flex>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.role_name}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  {/* --------------------------- ------------------------------*/}
                  <Heading>활동내역</Heading>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Flex alignItems={"center"}>
                          <Heading size="s" textTransform="uppercase">
                            작성한 게시글 수
                          </Heading>
                        </Flex>
                        <Button
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                          variant={"link"}
                          onClick={handleMyBoardList}
                        >
                          {memberInfo.countboard}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          댓글 수
                        </Heading>
                        <Button
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                          variant={"link"}
                          onClick={handleMemberComment}
                        >
                          {memberInfo.countcomment +
                            memberInfo.countcommentreply}{" "}
                          (댓글 {memberInfo.countcomment}, 대댓글
                          {memberInfo.countcommentreply})
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          누른 좋아요
                        </Heading>
                        <Text
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                        >
                          {memberInfo.countlike}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </CardBody>
        <CardFooter w={"60%"}>
          <Tooltip
            label="정지중인 회원입니다"
            isDisabled={memberInfo.role_name !== "정지회원"}
          >
            <Button
              isDisabled={
                memberInfo.role_name === "정지회원" ||
                memberInfo.role_name === "탈퇴회원"
              }
              ml="80%"
              colorScheme="red"
              onClick={onOpen}
            >
              회원정지
            </Button>
          </Tooltip>
        </CardFooter>
      </Card>

      {/* 회원정지 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원 정지</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      정지사유
                    </Heading>
                    <Input
                      type="text"
                      pt="2"
                      fontSize="sm"
                      placeholder={"정지사유를 입력해주세요"}
                      onChange={(e) => setSuspensionReason(e.target.value)}
                    ></Input>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      정지기간
                    </Heading>
                    <Select
                      defaultValue={7}
                      onChange={(e) => setSuspensionPeriod(e.target.value)}
                    >
                      <option value={7}>7일</option>
                      <option value={30}>30일</option>
                      <option value={999}>999일</option>
                    </Select>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              닫기
            </Button>
            <Button
              isDisabled={isSubmitting}
              colorScheme="red"
              onClick={handleSuspensionButton}
            >
              정지
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminMemberInfoDetails;
