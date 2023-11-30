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
              <Th>번호</Th>
              <Th>카테고리</Th>
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>작성일자</Th>
              <Th>답변상태</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inquiryList &&
              inquiryList.map((inquiry) => (
                <Tr key={inquiry.id}>
                  <Td>{inquiry.id}</Td>
                  <Td>{inquiry.inquiry_category}</Td>
                  <Td>{inquiry.title}</Td>
                  <Td>{inquiry.inquiry_member_id}</Td>
                  <Td>{inquiry.created_at}</Td>
                  <Td>{inquiry.answer_status}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}

export default InquiryList;
