import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  StackDivider,
  TableContainer,
  Table,
  Thead,
  Tr,
  Text,
  Th,
  Td,
  Tfoot,
  Tbody,
} from "@chakra-ui/react";
import axios from "axios";

function MemberInfoMyBoardList({ loginInfo }) {
  const [myBoardList, setMyBoardList] = useState("");
  useEffect(() => {
    axios.get("/api/member/info/myBoardList", {
      member_id: loginInfo.member_id,
    });
  }, []);
  return (
    <>
      <Card w={"80%"} p={"20px"} boxShadow={"none"}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="xl">내가 쓴 글</Heading>

            <Card mt={"5"}>
              <CardBody>
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>제목</Th>
                        <Th>내용</Th>
                        <Th>작성자</Th>
                        <Th>좋아요</Th>
                        <Th>생성일자</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>millimetres (mm)</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                      </Tr>
                      <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                      </Tr>
                      <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                      </Tr>
                    </Tbody>
                    <Tfoot>
                      <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                      </Tr>
                    </Tfoot>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          </Stack>
        </CardBody>
        <Divider color={"gray"} />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              변경
            </Button>
            <Button variant="ghost" colorScheme="blue">
              삭제
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}

export default MemberInfoMyBoardList;
