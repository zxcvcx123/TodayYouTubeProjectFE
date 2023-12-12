import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Pagination from "../page/Pagination";
import { DetectLoginContext } from "../component/LoginProvider";

function InquiryList(props) {
  const { token, handleLogout, loginInfo, validateToken, connectUser } =
    useContext(DetectLoginContext);

  const [inquiryList, setInquiryList] = useState(null);
  const [pageInfo, setPageInfo] = useState([]);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (loginInfo !== null) {
      axios
        .post("/api/inquiry/list?" + params, {
          login_member_id: loginInfo.member_id,
          role_name: loginInfo.role_name,
        })
        .then((response) => {
          setInquiryList(response.data.inquiryList);
          setPageInfo(response.data.pageInfo);
        })
        .catch(() => console.log("bad"));
    }
  }, [location, params, loginInfo]);

  if (inquiryList == null || loginInfo == null) {
    return <Spinner />;
  }

  // 로그인 안했을시 로그인화면으로 이동
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

  return (
    <Box>
      <Box width={"60%"} m={"auto"}>
        <Box>
          <Heading mb={2}>문의게시판</Heading>
          <Flex
            width={"99%"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
          >
            <Box
              mb={3}
              fontSize={"0.9rem"}
              ml={3}
              fontStyle={"italic"}
              color={"gray.500"}
            >
              문의하실 사항이 있으면 말씀해주세요
            </Box>
            <Button
              colorScheme="red"
              variant={"outline"}
              onClick={() => navigate("/inquiry/write")}
            >
              문의하기
            </Button>
          </Flex>
          <Divider />
        </Box>

        <Table size={"sm"} mb={5}>
          <Thead>
            <Tr>
              <Th textAlign={"center"}>번호</Th>
              <Th textAlign={"center"}>카테고리</Th>
              <Th textAlign={"center"}>제목</Th>
              <Th textAlign={"center"}>작성자</Th>
              <Th textAlign={"center"}>작성일자</Th>
              <Th textAlign={"center"}>답변상태</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr
              backgroundColor={"purple.100"}
              _hover={{
                cursor: "pointer",
                backgroundColor: "purple.200",
              }}
            >
              <Td textAlign={"center"} fontWeight={"bold"}>
                notice
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                공지사항
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                문의게시판 답변관련 공지사항입니다.
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                관리자
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                2023 / 11 / 30
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                --
              </Td>
            </Tr>
            <Tr
              backgroundColor={"purple.100"}
              _hover={{
                cursor: "pointer",
                backgroundColor: "purple.200",
              }}
            >
              <Td textAlign={"center"} fontWeight={"bold"}>
                notice
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                공지사항
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                문의게시판 답변관련 공지사항입니다.
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                관리자
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                2023 / 11 / 30
              </Td>
              <Td textAlign={"center"} fontWeight={"bold"}>
                --
              </Td>
            </Tr>
            {inquiryList &&
              inquiryList.map((inquiry) => (
                <Tr
                  textAlign={"center"}
                  key={inquiry.id}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "gray.100",
                  }}
                  onClick={() => navigate("/inquiry/" + inquiry.id)}
                >
                  <Td textAlign={"center"}>{inquiry.id}</Td>
                  <Td textAlign={"center"}>{inquiry.inquiry_category}</Td>
                  <Td textAlign={"center"}>{inquiry.title}</Td>
                  <Td textAlign={"center"}>{inquiry.inquiry_member_id}</Td>
                  <Td textAlign={"center"}>{inquiry.ago}</Td>
                  {(inquiry.answer_status === "답변완료" && (
                    <Td
                      backgroundColor={"green.300"}
                      textAlign={"center"}
                      fontWeight="bold"
                    >
                      {inquiry.answer_status}
                    </Td>
                  )) || (
                    <Td
                      backgroundColor={"orange.300"}
                      textAlign={"center"}
                      fontWeight="bold"
                    >
                      {inquiry.answer_status}
                    </Td>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Pagination pageInfo={pageInfo} />
      </Box>
    </Box>
  );
}

export default InquiryList;
