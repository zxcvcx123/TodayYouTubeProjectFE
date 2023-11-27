import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function BoardList() {
  // state
  const [boardList, setBoardList] = useState(null);

  // navigate
  const navigate = useNavigate();

  // 초기 이펙트
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
              <Tr
                key={board.id}
                onClick={() => navigate("/board/" + board.id)}
                _hover={{ backgroundColor: "lightcyan" }}
              >
                {/* 삭제된 게시물일 경우 표기가 변동 */}
                {board.is_show ? (
                  <>
                    <Td>{board.id}</Td>
                    <Td>{board.title}</Td>
                    <Td>좋아요</Td>
                    <Td>{board.board_member_id}</Td>
                    <Td>{board.created_at}</Td>
                    <Td>조회수</Td>
                  </>
                ) : (
                  <>
                    <Td>{board.id}</Td>
                    <Td colSpan={5}>
                      <Text textAlign={"center"}>삭제된 게시물입니다.</Text>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default BoardList;
