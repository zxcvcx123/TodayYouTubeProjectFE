import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
  /* use state */
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [uploadFiles, setUploadFiles] = useState(null);

  /* use navigate */
  let navigate = useNavigate();

  function handleSubmit() {
    axios
      .postForm("/api/board/add", { title, link, content, uploadFiles })
      .then(() => navigate("/board/list"))
      .catch(() => console.log("error"))
      .finally(() => console.log("done"));
  }

  return (
    <Box border={"2px solid black"} m={5}>
      <Heading mb={5}>유튜브 추천 :: 새 글 작성하기</Heading>

      {/* 제목 */}
      <FormControl mb={2}>
        <FormLabel>제목</FormLabel>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="추천 게시글의 제목을 입력해주세요."
        />
      </FormControl>

      {/* 링크 */}
      <FormControl mb={2}>
        <FormLabel>링크</FormLabel>
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="추천 영상의 링크를 입력해주세요."
        />
      </FormControl>

      {/* 본문 */}
      <FormControl mb={2}>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="본문을 작성 전 안내사항. @@개행문자 추가하기1) 욕설 비방 작품 어쩌구 2) 저작권 침해 어쩌구 3) 개인정보 침해 어쩌구... 등등"
          h={"sm"}
          resize={"none"}
        />
      </FormControl>

      {/* 파일 첨부 */}
      <FormControl mb={5}>
        <FormLabel>파일 첨부 (이미지) @@@ 미구현 @@@</FormLabel>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setUploadFiles(e.target.files)}
        />
        <FormHelperText>
          한 개 파일은 1MB 이내, 총 용량은 10MB 이내로 첨부하세요.
        </FormHelperText>
      </FormControl>

      {/* 저장 버튼 */}
      <Button onClick={handleSubmit} colorScheme="blue">
        작성 완료
      </Button>

      {/* 저장 버튼 */}
      <Button onClick={() => navigate("/board/list")} colorScheme="red">
        취소
      </Button>
    </Box>
  );
}

export default BoardWrite;
