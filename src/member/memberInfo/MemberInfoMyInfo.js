import React, { useState } from "react";
import {
  Alert,
  AlertIcon,
  Badge,
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
  Icon,
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
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Stack,
  StackDivider,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MemberInfoMyInfo({ loginInfo }) {
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
  const roleTip = useDisclosure();
  const [overlay, setOverlay] = React.useState(<CustomOverlay />);
  /*---------------------------------*/
  function handleMemberInfoEditValidatePassword() {
    if (editMemberInfoPassword === editMemberInfoPasswordCheck) {
      setIsSubmitting(true);
      const grantType = localStorage.getItem("grantType");
      const accessToken = localStorage.getItem("accessToken");
      axios
        .post(
          "/api/member/info/passwordCheck",
          {
            member_id: loginInfo.member_id,
            password: editMemberInfoPassword,
          },
          {
            headers: {
              Authorization: `${grantType} ${accessToken}`,
            },
          },
        )
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

  return (
    <>
      {!isMemberInfoEditValidated ? (
        <Card w={"80%"} p={"20px"} boxShadow={"none"}>
          <CardBody>
            <Stack mt="6" spacing="3">
              <Card mt={"5"}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="s" textTransform="uppercase">
                        아이디
                      </Heading>
                      <Text pl={2} mt={1} pt="2" fontSize="sm">
                        {loginInfo.member_id}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="s" textTransform="uppercase">
                        닉네임
                      </Heading>
                      <Text pl={2} mt={1} pt="2" fontSize="sm">
                        {loginInfo.nickname}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="s" textTransform="uppercase">
                        이메일
                      </Heading>
                      <Text pl={2} mt={1} pt="2" fontSize="sm">
                        {loginInfo.email}
                      </Text>
                    </Box>
                    <Box>
                      {/* ---------------------------등급 ------------------------------*/}
                      <Flex alignItems={"center"}>
                        <Heading size="s" textTransform="uppercase">
                          등급
                        </Heading>
                        <Popover
                          returnFocusOnClose={false}
                          isOpen={roleTip.isOpen}
                          onClose={roleTip.onClose}
                          placement="right"
                          closeOnBlur={false}
                        >
                          <PopoverTrigger>
                            <Tooltip label="등급" placement="auto-start">
                              <Icon
                                ml={1}
                                color={"tomato"}
                                fontSize={"14px"}
                                fontWeight={"bold"}
                                onClick={roleTip.onToggle}
                              />
                            </Tooltip>
                          </PopoverTrigger>
                          <PopoverContent>
                            <PopoverHeader fontWeight="semibold">
                              회원 등급표
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                              <TableContainer>
                                <Table variant="simple">
                                  <Thead>
                                    <Tr>
                                      <Th>배지</Th>
                                      <Th>등급</Th>
                                      <Th>조건</Th>
                                    </Tr>
                                  </Thead>
                                  <Tbody>
                                    <Tr>
                                      <Td>
                                        <Badge
                                          backgroundColor={"#663300"}
                                          color={"white"}
                                        >
                                          IRON
                                        </Badge>
                                      </Td>
                                      <Td>아이언</Td>
                                      <Td>아직 안정함</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>
                                        <Badge
                                          backgroundColor={"#996600"}
                                          color="white"
                                        >
                                          BRONZE
                                        </Badge>
                                      </Td>
                                      <Td>브론즈</Td>
                                      <Td>아직 안정함</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>
                                        <Badge
                                          backgroundColor={"#CCCCCC"}
                                          color="white"
                                        >
                                          SILVER
                                        </Badge>
                                      </Td>
                                      <Td>실버</Td>
                                      <Td>아직 안정함</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>
                                        <Badge
                                          backgroundColor={"#FFCC00"}
                                          color="white"
                                        >
                                          GOLD
                                        </Badge>
                                      </Td>
                                      <Td>골드</Td>
                                      <Td>아직 안정함</Td>
                                    </Tr>
                                    <Tr>
                                      <Td>
                                        <Badge
                                          backgroundColor={"#33FF33"}
                                          color="white"
                                        >
                                          Platinum
                                        </Badge>
                                      </Td>
                                      <Td>골드</Td>
                                      <Td>아직 안정함</Td>
                                    </Tr>
                                  </Tbody>
                                  <Tfoot></Tfoot>
                                </Table>
                              </TableContainer>
                            </PopoverBody>
                            <PopoverFooter
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <ButtonGroup size="sm">
                                <Button variant="outline">등업신청</Button>
                                <Button colorScheme="red">닫기</Button>
                              </ButtonGroup>
                            </PopoverFooter>
                          </PopoverContent>
                        </Popover>
                      </Flex>
                      <Text pl={2} mt={1} pt="2" fontSize="sm">
                        {loginInfo.role_name}
                      </Text>
                    </Box>
                    {/* ------------------------------------------------------------*/}
                    <Box>
                      <Heading size="s" textTransform="uppercase">
                        내가 받은 좋아요
                      </Heading>
                      <Text pl={2} mt={1} pt="2" fontSize="sm">
                        {loginInfo.total_like}
                      </Text>
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
                variant="solid"
                colorScheme="blue"
                onClick={() => {
                  setOverlay(<CustomOverlay />);
                  onOpen();
                }}
              >
                변경
              </Button>
              <Button variant="ghost" colorScheme="blue">
                삭제
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
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={handleMemberInfoEditValidatePassword}
                  >
                    확인
                  </Button>
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
          </CardFooter>
        </Card>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default MemberInfoMyInfo;
