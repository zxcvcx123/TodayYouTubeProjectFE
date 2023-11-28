import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Img,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BoardComment } from "./BoardComment";
import BoardLike from "../like/BoardLike";
import YouTube from "react-youtube";
import YoutubeInfo from "../component/YoutubeInfo";

function BoardView() {
  // state
  const [board, setBoard] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [like, setLike] = useState(0);

  //URL 매개변수 추출
  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // 초기 렌더링
  useEffect(() => {
    axios.get("/api/board/id/" + id).then((response) => {
      setBoard(response.data);
    });
  }, []);

  // 초기 렌더링 좋아요 출력
  useEffect(() => {
    axios
      .get("/api/like/board/" + id)
      .then((response) => {
        setLike(response.data);
      })
      .catch(() => console.log("bad"))
      .finally(() => console.log("완료"));
  }, []);

  // board 불러오지 못할 시 로딩중 표시
  if (board === null) {
    return <Spinner />;
  }

  function handleLike() {
    axios
      .post("/api/like/board/" + id)
      .then((response) => setLike(response.data))
      .catch(() => console.log("bad"))
      .catch(() => console.log("done"));
  }
  function handleDelete() {
    axios
      .put("/api/board/remove/" + id)
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  return (
    <Box m={"50px 20% 20px 50px"}>
      <Heading>{board.id} 번 게시글 보기(임시 게시글 번호 확인용!!)</Heading>

      {/* 제목 */}
      <FormControl mt={10} mb={2}>
        <Text fontSize={"large"} as={"strong"}>
          {board.title}
        </Text>
        <Flex justifyContent={"space-between"}>
          <Text>
            {board.board_member_id} | {board.updated_at}
          </Text>
          <BoardLike id={id} like={like} board={board} onClick={handleLike} />
          <Text>| 조회수</Text>
        </Flex>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 링크 */}
      <FormControl mb={2}>
        <FormLabel>유튜브 링크</FormLabel>
        <Text>{board.link}</Text>
        <Button onClick={() => window.open(board.link)}>
          유튜브 영상으로 가기!
        </Button>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 유튜브 썸네일 및 영상 출력 */}
      <FormControl mb={2}>
        <FormLabel>추천 유튜브 영상!</FormLabel>
        <YoutubeInfo
          link={board.link}
          extraThumbnail={true}
          thumbnailWidth={100}
          thumbnailHeight={100}
        />
      </FormControl>
      <Divider my={5} borderColor="grey" />

      {/* 본문 */}
      <FormControl mb={2}>
        <FormLabel>본문</FormLabel>
        {/* 유튜브 영상 출력 */}
        <YoutubeInfo link={board.link} extraVideo={true} />
        <Textarea
          value={board.content}
          readOnly
          w={"100%"}
          minH={"400px"}
          resize={"none"}
        />
      </FormControl>

      {/* 목록 버튼 */}
      <Button colorScheme="blue" onClick={() => navigate("/board/list")}>
        목록
      </Button>

      {/* 수정 버튼 */}
      <Button
        colorScheme="purple"
        onClick={() => navigate("/board/edit/" + id)}
      >
        수정
      </Button>

      {/* 삭제 버튼 */}
      <Button colorScheme="red" onClick={handleDelete}>
        삭제
      </Button>

      {/* 댓글 영역 */}
      <BoardComment board_id={id} />
    </Box>
  );
}

export default BoardView;
