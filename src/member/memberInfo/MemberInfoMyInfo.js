import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MemberInfoMyInfoPopover from "./MemberInfoMyInfoPopover";
import MemberInfoMyInfoEdit from "./MemberInfoMyInfoEdit";

function MemberInfoMyInfo({ loginInfo, handleLogout }) {
  /* ----------------- 비밀번호 상태------------------------*/
  const [editMemberInfoPassword, setEditMemberInfoPassword] = useState("");
  const [editMemberInfoPasswordCheck, setEditMemberInfoPasswordCheck] =
    useState("");
  let toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  let navigate = useNavigate();
  /*---------------------------------------------------*/
  const [isMemberInfoEditValidated, setIsMemberInfoEditValidated] =
    useState(false);

  /*-------------- ChakraUI-------------------*/

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const CustomOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const withdrawalModal = useDisclosure();
  const withdrawalPasswordCheckModal = useDisclosure();
  const [overlay, setOverlay] = React.useState(<CustomOverlay />);
  /*---------------------------------*/
  function handleMemberInfoEditValidatePassword() {
    if (editMemberInfoPassword === editMemberInfoPasswordCheck) {
      setIsSubmitting(true);

      axios
        .post("/api/member/info/passwordCheck", {
          member_id: loginInfo.member_id,
          password: editMemberInfoPassword,
        })
        .then((response) => {
          toast({
            description: "비밀번호 검증을 성공하였습니다.",
            status: "success",
          });
          setIsMemberInfoEditValidated(true);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            toast({
              description: "사용자 검증에 실패하였습니다.",
              status: "warning",
            });
          } else if (
            error.response.status >= 400 &&
            error.response.status <= 499
          ) {
            toast({
              description: "잘못된 요청입니다",
              status: "error",
            });
          } else {
            toast({
              description: "서버에 오류가 발생했습니다. 잠시 후 시도해주세요",
              status: "error",
            });
          }
          setIsMemberInfoEditValidated(false);
        })
        .finally(setIsSubmitting(false));
    }
  }

  function handleMemberWithdrawal() {
    if (editMemberInfoPassword === editMemberInfoPasswordCheck) {
      setIsSubmitting(true);

      axios
        .post("/api/member/info/passwordCheck", {
          member_id: loginInfo.member_id,
          password: editMemberInfoPassword,
        })
        .then((response) => {
          axios
            .post("/api/member/withdrawal", {
              member_id: loginInfo.member_id,
            })
            .then(() => {
              toast({
                description: "탈퇴처리가 완료되었습니다.",
                status: "error",
              });
              navigate("/");
              handleLogout();
            });
        })
        .catch((error) => {
          if (error.response.status === 403) {
            toast({
              description: "사용자 검증에 실패하였습니다.",
              status: "warning",
            });
          } else if (
            error.response.status >= 400 &&
            error.response.status <= 499
          ) {
            toast({
              description: "잘못된 요청입니다",
              status: "error",
            });
          } else {
            toast({
              description: "서버에 오류가 발생했습니다. 잠시 후 시도해주세요",
              status: "error",
            });
          }
          setIsMemberInfoEditValidated(false);
        })
        .finally(() => {
          setIsSubmitting(false);
          withdrawalPasswordCheckModal.onClose();
          withdrawalModal.onClose();
        });
    }
  }

  return (
    <>
      {!isMemberInfoEditValidated ? (
        <Card w={"80%"} p={"20px"} boxShadow={"none"} minWidth="1200px">
          <CardBody>
            <Stack mt="6" spacing="3">
              <Card mt={"5"}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Flex w={"100%"}>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Heading size="s" textTransform="uppercase">
                            아이디
                          </Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.member_id : <></>}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex w={"50%"}>
                        <Box>
                          <Heading size="s" textTransform="uppercase">
                            닉네임
                          </Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.nickname : <></>}
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
                            {loginInfo !== null ? loginInfo.email : <></>}
                          </Text>
                        </Box>
                      </Flex>
                      {/*<Flex w={"50%"}>*/}
                      {/*  <Box>*/}
                      {/*    <Heading size="s" textTransform="uppercase">*/}
                      {/*      전화번호*/}
                      {/*    </Heading>*/}
                      {/*    <Text pl={2} mt={1} pt="2" fontSize="sm">*/}
                      {/*      {loginInfo !== null ? (*/}
                      {/*        loginInfo.phone_number*/}
                      {/*      ) : (*/}
                      {/*        <></>*/}
                      {/*      )}*/}
                      {/*    </Text>*/}
                      {/*  </Box>*/}
                      {/*</Flex>*/}
                    </Flex>
                    <Flex w={"100%"}>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Heading size="s" textTransform="uppercase">
                            생년월일
                          </Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.birth_date : <></>}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex w={"50%"}>
                        <Box>
                          <Heading size="s" textTransform="uppercase">
                            성별
                          </Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.gender : <></>}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex w={"100%"}>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          {/* ---------------------------등급 ------------------------------*/}
                          <Flex alignItems={"center"}>
                            <Heading size="s" textTransform="uppercase">
                              등급
                            </Heading>
                            {/*<MemberInfoMyInfoPopover />*/}
                          </Flex>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.role_name : <></>}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Heading size="s" textTransform="uppercase">
                            내가 받은 좋아요
                          </Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.total_like : <></>}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                    {/* --------------------------- ------------------------------*/}
                    <Flex w={"100%"}>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Flex alignItems={"center"}>
                            <Heading size="s" textTransform="uppercase">
                              게시글 수
                            </Heading>
                          </Flex>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.total_board : <></>}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Heading size="s" textTransform="uppercase">
                            댓글 수
                          </Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? (
                              loginInfo.total_comment
                            ) : (
                              <></>
                            )}
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                    <Flex w={"100%"}>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Flex alignItems={"center"}>
                            <Heading size="s" textTransform="uppercase">
                              누적 조회수
                            </Heading>
                          </Flex>
                          <Text pl={2} mt={1} pt="2" fontSize="sm">
                            {loginInfo !== null ? loginInfo.total_views : <></>}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                        <Box>
                          <Heading size="s" textTransform="uppercase"></Heading>
                          <Text pl={2} mt={1} pt="2" fontSize="sm"></Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            </Stack>
          </CardBody>
          <Divider color={"gray"} />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  setOverlay(<CustomOverlay />);
                  onOpen();
                }}
              >
                변경
              </Button>

              <Button
                variant="ghost"
                colorScheme="red"
                onClick={withdrawalModal.onOpen}
              >
                탈퇴
              </Button>
            </ButtonGroup>
            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              {overlay}
              <ModalContent>
                <ModalHeader>비밀번호</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl isRequired>
                    <FormLabel>비밀번호</FormLabel>
                    <Input
                      type="password"
                      ref={initialRef}
                      placeholder="비밀번호"
                      onChange={(e) => {
                        setEditMemberInfoPassword(e.target.value);
                      }}
                    />
                  </FormControl>

                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={
                      editMemberInfoPassword === editMemberInfoPasswordCheck
                        ? false
                        : true
                    }
                  >
                    <FormLabel>비밀번호 재확인</FormLabel>
                    <Input
                      type="password"
                      placeholder="비밀번호 재확인"
                      onChange={(e) => {
                        setEditMemberInfoPasswordCheck(e.target.value);
                      }}
                    />{" "}
                    <FormErrorMessage>
                      비밀번호가 일치하지 않습니다
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  {!isSubmitting ? (
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={handleMemberInfoEditValidatePassword}
                    >
                      확인
                    </Button>
                  ) : (
                    <Spinner />
                  )}
                  <Button
                    onClick={() => {
                      setEditMemberInfoPassword("");
                      setEditMemberInfoPasswordCheck("");
                      onClose();
                    }}
                  >
                    취소
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <Modal
              isOpen={withdrawalModal.isOpen}
              onClose={withdrawalModal.onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>회원탈퇴</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box
                    w={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"18px"} fontWeight={"bold"}>
                      {" "}
                      탈퇴시 복구가 불가합니다.
                    </Text>
                    <Text fontSize={"18px"} fontWeight={"bold"}>
                      {" "}
                      탈퇴하시겠습니까?{" "}
                    </Text>
                  </Box>
                </ModalBody>

                <ModalFooter>
                  {isSubmitting ? (
                    <Spinner />
                  ) : (
                    <Button
                      variant="ghost"
                      colorScheme="red"
                      mr={3}
                      onClick={withdrawalPasswordCheckModal.onOpen}
                    >
                      탈퇴
                    </Button>
                  )}
                  <Button variant="ghost" onClick={withdrawalModal.onClose}>
                    취소
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* 비밀번호 확인 모달 */}
            <Modal
              isOpen={withdrawalPasswordCheckModal.isOpen}
              onClose={withdrawalPasswordCheckModal.onClose}
            >
              <ModalContent>
                <ModalHeader>비밀번호</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl isRequired>
                    <FormLabel>비밀번호</FormLabel>
                    <Input
                      type="password"
                      ref={initialRef}
                      placeholder="비밀번호"
                      onChange={(e) => {
                        setEditMemberInfoPassword(e.target.value);
                      }}
                    />
                  </FormControl>

                  <FormControl
                    mt={4}
                    isRequired
                    isInvalid={
                      editMemberInfoPassword === editMemberInfoPasswordCheck
                        ? false
                        : true
                    }
                  >
                    <FormLabel>비밀번호 재확인</FormLabel>
                    <Input
                      type="password"
                      placeholder="비밀번호 재확인"
                      onChange={(e) => {
                        setEditMemberInfoPasswordCheck(e.target.value);
                      }}
                    />{" "}
                    <FormErrorMessage>
                      비밀번호가 일치하지 않습니다
                    </FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  {!isSubmitting ? (
                    <Button
                      colorScheme="red"
                      variant={"ghost"}
                      mr={3}
                      onClick={handleMemberWithdrawal}
                    >
                      탈퇴
                    </Button>
                  ) : (
                    <Spinner />
                  )}
                  <Button
                    onClick={() => {
                      setEditMemberInfoPassword("");
                      setEditMemberInfoPasswordCheck("");
                      withdrawalPasswordCheckModal.onClose();
                    }}
                  >
                    취소
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </CardFooter>
        </Card>
      ) : (
        <MemberInfoMyInfoEdit loginInfo={loginInfo} />
      )}
    </>
  );
}

export default MemberInfoMyInfo;
