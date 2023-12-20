import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  FormControl,
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
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  Text,
  useDisclosure,
  StackDivider,
  Select,
  useToast,
} from "@chakra-ui/react";
import { Sidenav } from "./Sidenav";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdminReportPagenation } from "./AdminReportPagenation";
import { MinusIcon } from "@heroicons/react/24/solid";
import { AddIcon } from "@chakra-ui/icons";
import { DetectLoginContext } from "../component/LoginProvider";
export function AdminReportManagement() {
  const [reportDependency, setReportDependency] = useState(false);
  const [reportCategory, setReportCategory] = useState("unResolve");
  const [reportList, setReportList] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportedMemberId, setReportedMemberId] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [roleName, setRoleName] = useState(null);
  const [pageNumberInformation, setPageNumberInformation] = useState(null);
  const [allReportedList, setAllReportedList] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const subModal = useDisclosure();
  const rejectModal = useDisclosure();

  let navigate = useNavigate();
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [suspensionReason, setSuspensionReason] = useState("");
  const [suspensionPeriod, setSuspensionPeriod] = useState(7);
  let toast = useToast();

  useEffect(() => {
    setReportDependency(false);
    axios
      .get("/api/admin/report/list", {
        params: { rc: reportCategory },
      })
      .then((response) => {
        setReportList(response.data.reporterList);
        setPageNumberInformation(response.data.pagingInformation);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          toast({
            description: "접근 불가한 경로입니다.",
            status: "error",
          });

          navigate("/");
        }
        if (error.response && error.response.status === 404) {
          toast({
            description: "접근 불가한 경로입니다.",
            status: "error",
          });

          navigate("/");
        }
      });
  }, [reportCategory, allReportedList, reportDependency]);

  function handleReportClick(board_id, reported_id, role_name) {
    onOpen();
    axios
      .get("/api/admin/report/reportedList", {
        params: {
          reported_id: reported_id,
        },
      })
      .then((response) => {
        setAllReportedList(response.data.allReportedList);
        setReportedMemberId(reported_id);
        setBoardId(board_id);
        setRoleName(role_name);
      });
  }

  function handleSuspensionButton() {
    setIsSubmitting(true);
    axios
      .put("/api/admin/member", {
        member_id: reportedMemberId,
        period: suspensionPeriod,
        reason: suspensionReason,
        role_name: roleName,
      })
      .then(() => {
        toast({
          description: "정지처리가 완료되었습니다.",
          status: "success",
        });
        axios
          .patch("/api/admin/report/resolved", {
            reported_id: reportedMemberId,
          })
          .finally(() => {
            subModal.onClose();
            setIsSubmitting(false);
            onClose();
            setReportDependency(true);
          });
      });
  }

  function handleRejectReport() {
    setIsSubmitting(true);
    axios
      .delete("/api/admin/report/reject", {
        params: {
          reported_id: reportedMemberId,
        },
      })
      .then(() => {
        toast({ description: "반려 처리되었습니다.", status: "success" });
      })
      .finally(() => {
        setIsSubmitting(false);
        rejectModal.onClose();
        onClose();
        setReportDependency(true);
      });
  }

  return (
    <>
      <Flex>
        <Sidenav />
        <Box w={"80%"} ml={"3%"}>
          <Box boxShadow={"none"}>
            <Box w={"100%"}>
              <Flex mt={10}>
                <Heading size="xl">신고 목록</Heading>
              </Flex>
              <Box mt={"5"} w={"100%"} mr={5}>
                <Box>
                  <Flex mb={10} justifyContent={"flex-end"}>
                    <RadioGroup
                      value={reportCategory}
                      onChange={setReportCategory}
                    >
                      <Stack direction="row">
                        <Radio value="unResolve">미처리</Radio>
                        <Radio value="resolved">처리완료</Radio>
                      </Stack>
                    </RadioGroup>
                  </Flex>
                  <Center>
                    <TableContainer w={"100%"}>
                      <Table size="sm">
                        <Thead>
                          <Tr>
                            <Th
                              fontWeight={"bold"}
                              borderColor={"black"}
                              textAlign={"center"}
                              fontSize={"18px"}
                              p={5}
                            >
                              신고번호
                            </Th>
                            <Th
                              fontWeight={"bold"}
                              borderColor={"black"}
                              textAlign={"center"}
                              fontSize={"18px"}
                            >
                              피신고자
                            </Th>
                            <Th
                              fontWeight={"bold"}
                              borderColor={"black"}
                              textAlign={"center"}
                              fontSize={"18px"}
                            >
                              닉네임
                            </Th>
                            {reportCategory === "unResolve" && (
                              <Th
                                fontWeight={"bold"}
                                borderColor={"black"}
                                textAlign={"center"}
                                fontSize={"18px"}
                              >
                                등급
                              </Th>
                            )}
                            {reportCategory !== "unResolve" && (
                              <Th
                                fontWeight={"bold"}
                                borderColor={"black"}
                                textAlign={"center"}
                                fontSize={"18px"}
                              >
                                상태
                              </Th>
                            )}
                            <Th
                              fontWeight={"bold"}
                              borderColor={"black"}
                              textAlign={"center"}
                              fontSize={"18px"}
                            >
                              신고횟수
                            </Th>

                            <Th
                              fontWeight={"bold"}
                              borderColor={"black"}
                              textAlign={"center"}
                              fontSize={"18px"}
                            >
                              처리
                            </Th>
                          </Tr>
                        </Thead>

                        <Tbody>
                          {reportList !== null &&
                            reportList.map(
                              (report) =>
                                reportCategory === "unResolve" ? (
                                  <Tr
                                    _hover={{
                                      cursor: "pointer",
                                    }}
                                    key={report.id}
                                    onClick={() => {
                                      handleReportClick(
                                        report.board_id,
                                        report.reported_id,
                                        report.role_name,
                                      );
                                    }}
                                  >
                                    <Td
                                      p={5}
                                      textAlign={"center"}
                                      fontSize={"18px"}
                                    >
                                      {report.id}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.reported_id}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.nickname.length > 15
                                        ? `${report.nickname.slice(0, 15)}...`
                                        : report.nickname}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.role_name}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.countReported}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      <Text color={"red"}>미처리</Text>
                                    </Td>
                                  </Tr>
                                ) : (
                                  /*처리완료 ---------------------------------------------------------------*/
                                  <Tr
                                    _hover={{
                                      cursor: "pointer",
                                    }}
                                    key={report.uuid}
                                  >
                                    <Td
                                      p={5}
                                      textAlign={"center"}
                                      fontSize={"18px"}
                                    >
                                      {report.id}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.reported_id}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.nickname.length > 15
                                        ? `${report.nickname.slice(0, 15)}...`
                                        : report.nickname}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.role_name}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      {report.countReported}
                                    </Td>
                                    <Td textAlign={"center"} fontSize={"18px"}>
                                      <Text color={"blue"}>처리완료</Text>
                                    </Td>
                                  </Tr>
                                ),

                              /*모달창 --------------------------------------------------------------*/
                            )}
                          <Modal
                            initialFocusRef={initialRef}
                            finalFocusRef={finalRef}
                            isOpen={isOpen}
                            onClose={onClose}
                            size={"full"}
                          >
                            <ModalOverlay />
                            <ModalContent bg={"#ffffff"}>
                              <ModalCloseButton />
                              <ModalBody
                                border={"1px solid black"}
                                pb={6}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}
                              >
                                <Text
                                  fontSize={"30px"}
                                  fontWeight={"bold"}
                                  p={10}
                                >
                                  {reportedMemberId}의 신고 목록
                                </Text>
                                <Box
                                  borderTop={"1px solid black"}
                                  borderBottom={"1px solid black"}
                                  pt={2}
                                  display={"flex"}
                                  flexDirection={"column"}
                                  alignItems={"center"}
                                  overflowY="auto"
                                  w={"80%"}
                                  maxHeight="500px"
                                  sx={{
                                    overflowY: "scroll",
                                    "::-webkit-scrollbar": {
                                      width: "10px",
                                    },
                                    "::-webkit-scrollbar-track": {
                                      background: "transparent",
                                    },
                                    "::-webkit-scrollbar-thumb": {
                                      background: "transparent",
                                      borderRadius: "10px",
                                    },
                                    ":hover::-webkit-scrollbar-thumb": {
                                      background: "#e3e2e2",
                                    },
                                  }}
                                >
                                  {allReportedList !== null ? (
                                    <>
                                      {allReportedList.map((reportedInfo) => (
                                        <Accordion
                                          allowMultiple
                                          w={"100%"}
                                          border={"1px solid black"}
                                          mb={"50px"}
                                          key={reportedInfo.id}
                                        >
                                          <AccordionItem>
                                            {({ isExpanded }) => (
                                              <>
                                                <h2>
                                                  <AccordionButton
                                                    bg={"#ffffff"}
                                                    display={"flex"}
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                  >
                                                    <Box
                                                      as="span"
                                                      flex="1"
                                                      textAlign="left"
                                                    >
                                                      <Text
                                                        fontWeight={"bold"}
                                                        fontSize={"20px"}
                                                        mb={3}
                                                      >
                                                        신고인
                                                      </Text>
                                                      <Text>
                                                        {
                                                          reportedInfo.reporter_id
                                                        }
                                                      </Text>
                                                    </Box>

                                                    <Box
                                                      as="span"
                                                      flex="1"
                                                      textAlign="left"
                                                    >
                                                      <Text
                                                        fontWeight={"bold"}
                                                        fontSize={"20px"}
                                                        mb={3}
                                                      >
                                                        신고사유
                                                      </Text>
                                                      <Text>
                                                        {reportedInfo
                                                          .report_reason
                                                          .length > 20
                                                          ? `${reportedInfo.report_reason.slice(
                                                              0,
                                                              20,
                                                            )}..`
                                                          : reportedInfo.report_reason}
                                                      </Text>
                                                    </Box>

                                                    <Box
                                                      as="span"
                                                      flex="1"
                                                      textAlign="left"
                                                    >
                                                      <Text
                                                        fontWeight={"bold"}
                                                        fontSize={"20px"}
                                                        mb={3}
                                                      >
                                                        신고일시
                                                      </Text>
                                                      <Text>
                                                        {reportedInfo.ago}
                                                      </Text>
                                                    </Box>
                                                    <AccordionIcon />
                                                  </AccordionButton>
                                                </h2>
                                                <AccordionPanel
                                                  pb={4}
                                                  display={"flex"}
                                                  flexDirection={"column"}
                                                  justifyContent={"center"}
                                                  alignItems={"center"}
                                                >
                                                  <Box
                                                    mt={3}
                                                    border={"1px solid black"}
                                                    display={"flex"}
                                                    flexDirection={"column"}
                                                    alignItems={"center"}
                                                    minWidth={"1300px"}
                                                    maxWidth={"1300px"}
                                                  >
                                                    <Text
                                                      fontSize={"25px"}
                                                      fontWeight={"bold"}
                                                      p={10}
                                                    >
                                                      신고서
                                                    </Text>
                                                    <Flex
                                                      border={"1px solid black"}
                                                      w={"95%"}
                                                      maxWidth={"1250px"}
                                                      minWidth={"1250px"}
                                                    >
                                                      {/*----------------- 신고 상세 ------------------------*/}
                                                      <Box
                                                        w={"120px"}
                                                        h={"120px"}
                                                        borderRight={
                                                          "1px solid black"
                                                        }
                                                        display={"flex"}
                                                        justifyContent={
                                                          "center"
                                                        }
                                                        alignItems={"center"}
                                                      >
                                                        <Text fontSize={"20px"}>
                                                          신고 상세
                                                        </Text>
                                                      </Box>
                                                      <Box
                                                        w={"40%"}
                                                        display={"flex"}
                                                      >
                                                        <Box
                                                          w={"50%"}
                                                          borderRight={
                                                            "1px solid black"
                                                          }
                                                        >
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                          >
                                                            신고번호
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {reportedInfo.id}
                                                          </Text>
                                                        </Box>
                                                        <Box
                                                          w={"50%"}
                                                          borderRight={
                                                            "1px solid black"
                                                          }
                                                        >
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                            justifyContent="center"
                                                          >
                                                            신고일
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {reportedInfo.ago}
                                                          </Text>
                                                        </Box>
                                                      </Box>
                                                      {/* --------------------- 신고자 구분 ---------------------------------*/}
                                                      <Box
                                                        w={"120px"}
                                                        h={"120px"}
                                                        borderRight={
                                                          "1px solid black"
                                                        }
                                                        display={"flex"}
                                                        justifyContent={
                                                          "center"
                                                        }
                                                        alignItems={"center"}
                                                      >
                                                        <Text fontSize={"20px"}>
                                                          신고인
                                                        </Text>
                                                      </Box>
                                                      <Box
                                                        w={"40%"}
                                                        display={"flex"}
                                                      >
                                                        <Box
                                                          w={"50%"}
                                                          borderRight={
                                                            "1px solid black"
                                                          }
                                                        >
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                          >
                                                            아이디
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {reportedInfo
                                                              .reporter_id
                                                              .length > 14
                                                              ? `${reportedInfo.reporter_id.slice(
                                                                  0,
                                                                  14,
                                                                )}..`
                                                              : reportedInfo.reporter_id}
                                                          </Text>
                                                        </Box>
                                                        <Box w={"50%"}>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                            justifyContent="center"
                                                          >
                                                            등급
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {
                                                              reportedInfo.role_name
                                                            }
                                                          </Text>
                                                        </Box>
                                                      </Box>
                                                    </Flex>
                                                    {/*----------------- 피신고인 ------------------------*/}
                                                    <Flex
                                                      border={"1px solid black"}
                                                      borderTop={"0px"}
                                                      w={"1250px"}
                                                      maxWidth={"1250px"}
                                                      minWidth={"1250px"}
                                                    >
                                                      <Box
                                                        w={"132px"}
                                                        h={"120px"}
                                                        borderRight={
                                                          "1px solid black"
                                                        }
                                                        display={"flex"}
                                                        justifyContent={
                                                          "center"
                                                        }
                                                        alignItems={"center"}
                                                      >
                                                        <Text fontSize={"20px"}>
                                                          피신고인
                                                        </Text>
                                                      </Box>
                                                      <Box
                                                        w={"100%"}
                                                        display={"flex"}
                                                      >
                                                        <Box
                                                          w={"33%"}
                                                          borderRight={
                                                            "1px solid black"
                                                          }
                                                        >
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                          >
                                                            게시글번호
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {
                                                              reportedInfo.board_id
                                                            }
                                                          </Text>
                                                        </Box>
                                                        <Box
                                                          w={"33%"}
                                                          borderRight={
                                                            "1px solid black"
                                                          }
                                                        >
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                            justifyContent="center"
                                                          >
                                                            카테고리
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {
                                                              reportedInfo.category_name
                                                            }
                                                          </Text>
                                                        </Box>
                                                        <Box
                                                          w={"34%"}
                                                          borderRight={
                                                            "1px solid black"
                                                          }
                                                        >
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            borderBottom={
                                                              "1px solid black"
                                                            }
                                                            justifyContent="center"
                                                          >
                                                            아이디
                                                          </Text>
                                                          <Text
                                                            h={"50%"}
                                                            fontSize={"20px"}
                                                            display={"flex"}
                                                            alignItems={
                                                              "center"
                                                            }
                                                            justifyContent="center"
                                                            fontWeight={"bold"}
                                                          >
                                                            {reportedMemberId}
                                                          </Text>
                                                        </Box>
                                                      </Box>
                                                    </Flex>
                                                    {/*-----------------------------신고사유-----------------*/}
                                                    <Box
                                                      border={"1px solid black"}
                                                      borderTop={"0px"}
                                                      maxWidth={"1250px"}
                                                      minWidth={"1250px"}
                                                    >
                                                      <Text
                                                        fontSize={"20px"}
                                                        p={2}
                                                        display={"flex"}
                                                        justifyContent={
                                                          "center"
                                                        }
                                                      >
                                                        신고 사유
                                                      </Text>
                                                      <Box
                                                        minHeight={"200px"}
                                                        p={3}
                                                        w={"100%"}
                                                        borderTop={
                                                          "1px solid black"
                                                        }
                                                      >
                                                        {
                                                          reportedInfo.report_reason
                                                        }
                                                      </Box>
                                                    </Box>
                                                  </Box>
                                                  <Flex
                                                    w={"100%"}
                                                    justifyContent={"flex-end"}
                                                  >
                                                    <Button
                                                      m={3}
                                                      colorScheme="blue"
                                                      onClick={() => {
                                                        navigate(
                                                          "/board/" +
                                                            reportedInfo.board_id,
                                                        );
                                                      }}
                                                    >
                                                      본문보기
                                                    </Button>
                                                  </Flex>
                                                </AccordionPanel>
                                              </>
                                            )}
                                          </AccordionItem>
                                        </Accordion>
                                      ))}
                                    </>
                                  ) : (
                                    <Spinner />
                                  )}
                                </Box>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => {
                                    rejectModal.onOpen();
                                  }}
                                >
                                  반려
                                </Button>
                                <Button
                                  colorScheme="red"
                                  mr={3}
                                  onClick={subModal.onOpen}
                                >
                                  정지
                                </Button>
                                <Button onClick={onClose}>닫기</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>

                          {/*----------------화원 정지 모달 ----------------*/}
                          <Modal
                            isOpen={subModal.isOpen}
                            onClose={subModal.onClose}
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>회원 정지</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                <Card>
                                  <CardBody>
                                    <Stack
                                      divider={<StackDivider />}
                                      spacing="4"
                                    >
                                      <Box>
                                        <Heading
                                          size="xs"
                                          textTransform="uppercase"
                                        >
                                          정지사유
                                        </Heading>
                                        <Input
                                          type="text"
                                          pt="2"
                                          fontSize="sm"
                                          placeholder={
                                            "정지사유를 입력해주세요"
                                          }
                                          onChange={(e) =>
                                            setSuspensionReason(e.target.value)
                                          }
                                        ></Input>
                                      </Box>
                                      <Box>
                                        <Heading
                                          size="xs"
                                          textTransform="uppercase"
                                        >
                                          정지기간
                                        </Heading>
                                        <Select
                                          defaultValue={7}
                                          onChange={(e) =>
                                            setSuspensionPeriod(e.target.value)
                                          }
                                        >
                                          <option value={7}>7</option>
                                          <option value={30}>30</option>
                                          <option value={999}>999</option>
                                        </Select>
                                      </Box>
                                    </Stack>
                                  </CardBody>
                                </Card>
                              </ModalBody>
                              <ModalFooter>
                                {isSubmitting ? (
                                  <Spinner />
                                ) : (
                                  <Button
                                    colorScheme="red"
                                    onClick={handleSuspensionButton}
                                  >
                                    정지
                                  </Button>
                                )}
                                <Button
                                  variant={"ghost"}
                                  onClick={subModal.onClose}
                                >
                                  닫기
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          {/*-------------------모달 끝--------------------------*/}
                          {/*------------------반려 모달--------------------------*/}
                          <Modal
                            isOpen={rejectModal.isOpen}
                            onClose={rejectModal.onClose}
                          >
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>반려</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody>
                                {reportedMemberId}님의 신고서를
                                반려하시겠습니까?
                              </ModalBody>

                              <ModalFooter>
                                {isSubmitting ? (
                                  <Spinner />
                                ) : (
                                  <Button
                                    variant="ghost"
                                    colorScheme="blue"
                                    onClick={() => {
                                      handleRejectReport();
                                    }}
                                  >
                                    반려
                                  </Button>
                                )}
                                <Button mr={3} onClick={rejectModal.onClose}>
                                  닫기
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                        </Tbody>
                      </Table>
                    </TableContainer>{" "}
                  </Center>
                  <AdminReportPagenation
                    pageNumberInformation={pageNumberInformation}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
