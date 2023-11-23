import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit() {
    axios
      .post("/api/board/write", { title, content, link })
      .then()
      .catch()
      .finally();
  }

  return (
    <Box>
      <FormControl>
        <Flex>
          <FormLabel>제목</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex>
          <FormLabel>링크</FormLabel>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </Flex>
      </FormControl>
      <FormControl>
        <Flex>
          <FormLabel>내용</FormLabel>
          <Input value={content} onChange={(e) => setContent(e.target.value)} />
        </Flex>
      </FormControl>
      <Button onClick={handleSubmit}>글 쓰기</Button>
    </Box>
  );
}
