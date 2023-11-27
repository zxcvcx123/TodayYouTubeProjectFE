import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import YoutubeInfo from "../component/YoutubeInfo";

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
            <Th textAlign={"center"}>번호</Th>
            <Th textAlign={"center"}>제목</Th>
            <Th textAlign={"center"}>좋아요</Th>
            <Th textAlign={"center"}>작성자</Th>
            <Th textAlign={"center"}>작성일시</Th>
            <Th textAlign={"center"}>조회수</Th>
          </Tr>
        </Thead>

        <Tbody>
          {boardList &&
            boardList.map((board) => (
              <Tr
                key={board.id}
                onClick={() => navigate("/board/" + board.id)}
                _hover={{ backgroundColor: "lightcyan", cursor: "pointer" }}
              >
                {/* 삭제된 게시물일 경우 표기가 변동 */}
                {board.is_show ? (
                  <>
                    <Td textAlign={"center"}>{board.id}</Td>
                    <Td>
                      <Flex align={"center"} gap={"10px"}>
                        <YoutubeInfo
                          link={board.link}
                          extraThumbnail={true}
                          thumbnailWidth={50}
                          thumbnailHeight={50}
                        />
                        {board.title}
                      </Flex>
                    </Td>
                    <Td textAlign={"center"}>좋아요</Td>
                    <Td textAlign={"center"}>{board.board_member_id}</Td>
                    <Td textAlign={"center"}>{board.created_at}</Td>
                    <Td textAlign={"center"}>조회수</Td>
                  </>
                ) : (
                  <>
                    <Td textAlign={"center"}>{board.id}</Td>
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
