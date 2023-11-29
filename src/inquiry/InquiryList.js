import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useParams, useSearchParams } from "react-router-dom";

function InquiryList(props) {
  const [inquiryList, setInquiryList] = useState(null);

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
