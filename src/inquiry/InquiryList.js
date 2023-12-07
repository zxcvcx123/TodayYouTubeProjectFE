import React, { useEffect, useState } from "react";
import axios from "axios";
import {
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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { defineStyle, defineStyleConfig } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

function InquiryList(props) {
  const [inquiryList, setInquiryList] = useState(null);

  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/inquiry/list?" + params)
      .then((response) => setInquiryList(response.data));
  }, []);

  if (inquiryList == null) {
    return <Spinner />;
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

        <Table size={"sm"}>
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
                    <Td backgroundColor={"green.300"} textAlign={"center"}>
                      {inquiry.answer_status}
                    </Td>
                  )) || (
                    <Td backgroundColor={"orange.300"} textAlign={"center"}>
                      {inquiry.answer_status}
                    </Td>
                  )}
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default InquiryList;
