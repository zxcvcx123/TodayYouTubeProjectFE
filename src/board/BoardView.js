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
import YouTube from "react-youtube";

function BoardView() {
  // state
  const [board, setBoard] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoId, setVideoId] = useState(null);

  //URL 매개변수 추출
  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // 초기 렌더링
  useEffect(() => {
    axios.get("/api/board/id/" + id).then((response) => {
      setBoard(response.data);

      // 유튜브 링크에서 동영상 ID 추출 (정규표현식 match 메서드)
      const videoIdMatch = response.data.link.match(
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
      );

      // 정규표현식 match 메서드 4번의 값으로 썸네일 추출
      if (videoIdMatch && videoIdMatch[4]) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoIdMatch[4]}/mqdefault.jpg`;
        setThumbnail(thumbnailUrl);
        setVideoId(videoIdMatch[4]);
      }
    });
  }, []);

  // board 불러오지 못할 시 로딩중 표시
  if (board === null) {
    return <Spinner />;
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
          <Text>좋아요 | 조회수</Text>
        </Flex>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 링크 */}
      <FormControl mb={2}>
        <FormLabel>유튜브 링크</FormLabel>
        <Text>{board.link}</Text>
        <Button onClick={() => (window.location.href = board.link)}>
          유튜브 영상으로 가기!
        </Button>
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 유튜브 썸네일 및 영상 출력 */}
      <FormControl mb={2}>
        <FormLabel>추천 유튜브 영상!</FormLabel>
        {/* 유튜브 썸네일 출력 */}
        {thumbnail && <Img src={thumbnail} alt="유튜브 썸네일" />}
        {/* 유튜브 영상 출력 */}
        <YouTube videoId={videoId} />
      </FormControl>

      <Divider my={5} borderColor="grey" />

      {/* 본문 */}
      <FormControl mb={2}>
        <FormLabel>본문</FormLabel>
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
    </Box>
  );
}

export default BoardView;
