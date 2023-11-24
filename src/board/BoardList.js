import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

function BoardList() {
  const [boardList, setBoardList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/board/list")
      .then((response) => setBoardList(response.data));
  }, []);

  return (
    <Box>
      <Table size={"sm"}>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>제목</Th>
            <Th>좋아요</Th>
            <Th>작성자</Th>
            <Th>작성일시</Th>
            <Th>조회수</Th>
          </Tr>
        </Thead>

        <Tbody>
          {boardList &&
            boardList.map((board) => (
              <Tr _hover={{ backgroundColor: "lightcyan" }}>
                <Td>{board.id}</Td>
                <Td>{board.title}</Td>
                <Td>좋아요</Td>
                <Td>{board.board_member_id}</Td>
                <Td>{board.created_at}</Td>
                <Td>조회수</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default BoardList;
