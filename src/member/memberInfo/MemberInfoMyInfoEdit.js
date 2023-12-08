import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
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
import {
  defaultLength,
  validatePassword,
  defaultMessage,
  validateEmail,
} from "../memberUtil/memberSignUpMethods";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useNavigate } from "react-router-dom";

function MemberInfoMyInfoEdit({ loginInfo }) {
  const [timer, setTimer] = useState(null);
  const [spinner, setSpinner] = useState(true);

  /* 회원 상태 */
  const defaultNickname = loginInfo.nickname;
  const [changeNickname, setChangeNickname] = useState(defaultNickname);

  const defaultEmail = loginInfo.email;
  const [changeEmail, setChangeEmail] = useState(defaultEmail);

  const [changePassword, setChangePassword] = useState("");
  const [changePasswordCheck, setChangePasswordCheck] = useState("");

  const defaultPhoneNumber = loginInfo.phone_number;
  const [changePhoneNumber, setChangePhoneNumber] =
    useState(defaultPhoneNumber);
  /* 에러 메세지 */
  const [emailMessage, setEmailMessage] = useState(defaultMessage);
  const [passwordMessage, setPasswordMessage] = useState(defaultMessage);
  const [nicknameMessage, setNicknameMessage] = useState(defaultMessage);
  /* 값 변경 여부 상태 */
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isPasswordCheckChanged, setIsPasswordCheckChanged] = useState(false);
  const [isPhoneNumberChanged, setIsPhoneNumberChanged] = useState(false);

  /* 비밀번호 폼 상태 */
  const [show, setShow] = React.useState(false);
  const [showCheck, setShowCheck] = React.useState(false);
  /* Modal */
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const handleClick = () => setShow(!show);
  const handleCheckClick = () => setShowCheck(!showCheck);
  let toast = useToast();

  const navigate = useNavigate();
  const CustomOverlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<CustomOverlay />);

  /*--------------------------중복체크 -----------------------------*/
  function handleDuplicated(itemName, item) {
    const params = new URLSearchParams();
    params.set(itemName, item);
    axios
      .get("/api/signup/check?" + params)
      .then((response) => {
        const result = response.data;
        toast({
          description: result,
          status: "success",
        });
        if (itemName === "nickname") {
          setIsNicknameChanged(false);
        }
        if (itemName === "email") {
          setIsEmailChanged(false);
        }
        if (itemName === "changePassword") {
          setIsPasswordCheckChanged(false);
        }
      })
      .catch((error) => {
        const result = error.response.data;
        toast({
          description: result,
          status: "warning",
        });
        if (itemName === "nickname") {
          setIsNicknameChanged(true);
        }
        if (itemName === "email") {
          setIsEmailChanged(true);
        }
        if (itemName === "changePassword") {
          setIsPasswordCheckChanged(true);
        }
      });
  }

  function handleEditMemberInfo() {
    setSpinner(false);
    if (
      !isNicknameChanged &&
      !isEmailChanged &&
      !isPasswordChanged &&
      !isPasswordCheckChanged &&
      !isPhoneNumberChanged
    ) {
      const grantType = localStorage.getItem("grantType");
      const accessToken = localStorage.getItem("accessToken");

      axios
        .patch(
          "/api/member/info/update",
          {
            member_id: loginInfo.member_id,
            password: changePassword,
            nickname: changeNickname,
            email: changeEmail,
            phone_number: changePhoneNumber,
          },
          {
            headers: {
              Authorization: `${grantType} ${accessToken}`,
            },
          },
        )
        .then((response) => {
          toast({
            description: "변경이 완료되었습니다",
            status: "success",
          });
        })
        .catch((error) => {
          toast({
            description: "변경에 실패하였습니다. 다시 시도해주세요",
            status: "error",
          });
        })
        .finally(() => {
          navigate("/");
          setSpinner(true);
        });
    } else {
      toast({
        description: "처리되지 않은 작업이 있습니다",
        status: "warning",
      });
    }
  }

  return (
    <Card w={"80%"} p={"20px"} boxShadow={"none"}>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Card mt={"5"}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Flex alignItems={"center"}>
                    <Heading size="s" textTransform="uppercase" mr={3}>
                      아이디
                    </Heading>
                    <Kbd
                      h={"fit-content"}
                      backgroundColor={"white"}
                      color={"tomato"}
                    >
                      변경불가
                    </Kbd>
                  </Flex>
                  <Flex>
                    <Text pl={2} mt={1} pt="2" fontSize="sm" mr={"15px"}>
                      {loginInfo.member_id}
                    </Text>
                  </Flex>
                </Box>
                <Box w={"100%"}>
                  <Flex alignItems={"center"}>
                    <Heading size="s" textTransform="uppercase" mr={3}>
                      닉네임
                    </Heading>
                    <Kbd
                      h={"fit-content"}
                      backgroundColor={"white"}
                      color={"#0A6EFF"}
                    >
                      변경가능
                    </Kbd>
                  </Flex>
                  <FormControl isInvalid={isNicknameChanged}>
                    <Flex mt={2} alignItems={"center"}>
                      <Input
                        w={"200px"}
                        variant="unstyled"
                        placeholder="닉네임 변경"
                        value={changeNickname}
                        pl={2}
                        border={"1px solid #E2E4E8"}
                        onChange={(e) => {
                          setChangeNickname(e.target.value);
                          setIsNicknameChanged(true);
                          if (e.target.value === defaultNickname) {
                            setIsNicknameChanged(false);
                          }
                        }}
                      />
                      <Button
                        isDisabled={
                          changeNickname.length < 3 || !isNicknameChanged
                        }
                        onClick={() => {
                          handleDuplicated("nickname", changeNickname);
                        }}
                      >
                        중복확인
                      </Button>
                    </Flex>
                    {changeNickname.length >= 3 && isNicknameChanged ? (
                      <FormErrorMessage>중복확인이 필요합니다</FormErrorMessage>
                    ) : (
                      changeNickname.length < 3 && (
                        <FormErrorMessage>
                          3글자 이상 입력 가능합니다.
                        </FormErrorMessage>
                      )
                    )}
                  </FormControl>
                </Box>
                <Box>
                  <Flex alignItems={"center"}>
                    <Heading size="s" textTransform="uppercase" mr={3}>
                      이메일
                    </Heading>
                    <Kbd
                      h={"fit-content"}
                      backgroundColor={"white"}
                      color={"#0A6EFF"}
                    >
                      변경가능
                    </Kbd>
                  </Flex>
                  <Flex mt={2} alignItems={"center"}>
                    <FormControl isInvalid={isEmailChanged}>
                      <Input
                        type="email"
                        maxLength={"30"}
                        w={"250px"}
                        variant="unstyled"
                        placeholder="이메일 변경"
                        value={changeEmail}
                        pl={2}
                        border={"1px solid #E2E4E8"}
                        onChange={(e) => {
                          if (!e.target.value.includes(" ")) {
                            setChangeEmail(e.target.value);
                            setIsEmailChanged(true);

                            const newTimer = setTimeout(() => {
                              if (validateEmail(e.target.value)) {
                                setEmailMessage(defaultMessage);
                              } else {
                                setEmailMessage("이메일 형식이 맞지 않습니다");
                              }
                            }, 500);
                            setTimer(newTimer);
                          }
                          if (e.target.value === defaultEmail) {
                            setIsEmailChanged(false);
                          }
                        }}
                      />
                      <Button
                        isDisabled={
                          !validateEmail(changeEmail) || !isEmailChanged
                        }
                        onClick={() => {
                          handleDuplicated("email", changeEmail);
                        }}
                      >
                        중복확인
                      </Button>
                      {isEmailChanged ? (
                        <FormErrorMessage>{emailMessage}</FormErrorMessage>
                      ) : (
                        <></>
                      )}
                    </FormControl>
                  </Flex>
                </Box>
                <Box>
                  <Flex alignItems={"center"}>
                    <Heading size="s" textTransform="uppercase" mr={3}>
                      비밀번호
                    </Heading>
                    <Kbd
                      h={"fit-content"}
                      backgroundColor={"white"}
                      color={"#0A6EFF"}
                    >
                      변경가능
                    </Kbd>
                  </Flex>
                  <Flex alignItems={"center"}>
                    <Box mr={3}>
                      <FormControl isInvalid={isPasswordChanged}>
                        <Flex mt={2} alignItems={"center"}>
                          <InputGroup size="md" w={"250px"}>
                            <Input
                              pr="4.5rem"
                              type={show ? "text" : "password"}
                              placeholder="비밀번호 입력"
                              value={changePassword}
                              onChange={(e) => {
                                if (!e.target.value.includes(" ")) {
                                  setIsPasswordChanged(true);
                                  setChangePassword(e.target.value);
                                  setPasswordMessage("8" + defaultLength);
                                  if (e.target.value.length >= 8) {
                                    setPasswordMessage("안전검사가 필요합니다");
                                  }
                                  if (e.target.value.length == 0) {
                                    setIsPasswordChanged(false);
                                  }
                                }
                              }}
                            />

                            <InputRightElement width="4.5rem">
                              <Button size="xs" onClick={handleClick}>
                                {show ? "감추기" : "보기"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </Flex>
                        {isPasswordChanged ? (
                          <FormErrorMessage>{passwordMessage}</FormErrorMessage>
                        ) : (
                          <></>
                        )}
                      </FormControl>
                      <FormControl
                        isInvalid={
                          changePasswordCheck !== changePassword ||
                          isPasswordChanged
                        }
                      >
                        <Flex mt={2} alignItems={"center"}>
                          <InputGroup size="md" w={"250px"}>
                            <Input
                              pr="4.5rem"
                              type={showCheck ? "text" : "password"}
                              placeholder="비밀번호 재입력"
                              value={changePasswordCheck}
                              onChange={(e) => {
                                if (!e.target.value.includes(" ")) {
                                  setIsPasswordCheckChanged(true);
                                  setChangePasswordCheck(e.target.value);
                                  if (e.target.value.length == 0) {
                                    setIsPasswordCheckChanged(false);
                                  }
                                }
                              }}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="xs"
                                onClick={handleCheckClick}
                              >
                                {showCheck ? "감추기" : "보기"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </Flex>
                        {changePassword !== changePasswordCheck ? (
                          <FormErrorMessage>
                            비밀번호가 일치하지 않습니다
                          </FormErrorMessage>
                        ) : isPasswordChanged && isPasswordCheckChanged ? (
                          <FormErrorMessage>
                            안전검사가 필요합니다.
                          </FormErrorMessage>
                        ) : (
                          <></>
                        )}
                      </FormControl>
                    </Box>
                    <Button
                      isDisabled={
                        changePassword.length < 8 ||
                        changePassword !== changePasswordCheck
                      }
                      onClick={() => {
                        if (validatePassword(changePassword)) {
                          setIsPasswordCheckChanged(false);
                          setIsPasswordChanged(false);
                          toast({
                            description: "안전한 비밀번호입니다",
                            status: "success",
                          });
                        } else {
                          toast({
                            description: "안전하지 않은 비밀번호입니다.",
                            status: "warning",
                          });
                          setIsPasswordCheckChanged(true);
                          setIsPasswordChanged(true);
                          setPasswordMessage(
                            "영문자와 숫자, 특수기호를 모두 포함해주세요",
                          );
                        }
                      }}
                    >
                      안전검사
                    </Button>
                  </Flex>
                </Box>
                <Box>
                  <Flex alignItems={"center"}>
                    <Heading size="s" textTransform="uppercase" mr={3}>
                      전화번호
                    </Heading>
                    <Kbd
                      h={"fit-content"}
                      backgroundColor={"white"}
                      color={"#0A6EFF"}
                    >
                      변경가능
                    </Kbd>
                  </Flex>
                  <Flex mt={2} alignItems={"center"}>
                    <FormControl isInvalid={isPhoneNumberChanged}>
                      <Input
                        m={"2xs"}
                        type="tel"
                        w={"250px"}
                        placeholder="전화번호"
                        maxLength={"15"}
                        defaultValue={defaultPhoneNumber}
                        value={changePhoneNumber}
                        onChange={(e) => {
                          setChangePhoneNumber(
                            (e.target.value = e.target.value
                              .replace(/[^0-9]/g, "")
                              .replace(
                                /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
                                "$1-$2-$3",
                              )),
                          );
                          if (e.target.value.length < 9) {
                            setIsPhoneNumberChanged(true);
                          } else {
                            setIsPhoneNumberChanged(false);
                          }
                        }}
                      />
                      {isPhoneNumberChanged && (
                        <FormErrorMessage>
                          전화번호 형식이 아닙니다
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  </Flex>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </CardBody>
      <Divider color={"gray"} />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            isDisabled={
              isNicknameChanged ||
              isPasswordCheckChanged ||
              isPasswordChanged ||
              isEmailChanged ||
              isPhoneNumberChanged
            }
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              setOverlay(<CustomOverlay />);
              onOpen();
            }}
          >
            저장
          </Button>
          <Button
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </Button>
        </ButtonGroup>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          size={"sm"}
        >
          {overlay}
          <ModalContent>
            <ModalHeader>회원정보 수정</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text fontSize={"20px"}>변경 사항을 적용하시겠습니까?</Text>
            </ModalBody>
            <ModalFooter>
              {spinner ? (
                <Button colorScheme="blue" onClick={handleEditMemberInfo}>
                  저장
                </Button>
              ) : (
                <Spinner />
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
}

export default MemberInfoMyInfoEdit;
