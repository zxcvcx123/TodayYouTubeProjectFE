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
import { Link, useNavigate, useParams } from "react-router-dom";
import { BoardComment } from "../comment/BoardComment";
import BoardLike from "../like/BoardLike";
import YouTube from "react-youtube";
import YoutubeInfo from "../component/YoutubeInfo";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import editor from "../component/Editor";

function BoardView() {
  // state
  const [board, setBoard] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [like, setLike] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadFiles, setUploadFiles] = useState([]);
  // const [isReadOnly, setIsReadOnly] = useState(true);

  //URL 매개변수 추출
  const { id } = useParams();

  // navigate
  const navigate = useNavigate();

  // 초기 렌더링
  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => {
        setBoard(response.data);
      })
      .finally(() => {});
  }, [isSubmitting]);

  // 초기 렌더링 파일 목록 가져오기
  useEffect(() => {
    axios.get("/api/file/list/" + id).then((response) => {
      setUploadFiles(response.data);
    });
  }, []);

  // 초기 렌더링 좋아요 출력
  useEffect(() => {
    if (!isSubmitting) {
      axios
        .get("/api/like/board/" + id)
        .then((response) => {
          setLike(response.data);
        })
        .catch(() => console.log("bad"))
        .finally(() => console.log("완료"));
    }
  }, [isSubmitting]);

  if (like == null) {
    return <Spinner />;
  }

  // board 불러오지 못할 시 로딩중 표시
  if (board === null) {
    return <Spinner />;
  }

  function handleLike() {
    setIsSubmitting(true);
    axios
      .post("/api/like/board/" + id)
      .then((response) => setLike(response.data))
      .catch(() => console.log("bad"))
      .finally(() => {
        console.log("done");
        setIsSubmitting(false);
      });
  }

  function handleDelete() {
    axios
      .put("/api/board/remove/" + id)
      .then(() => console.log("good"))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }

  //  ck에디터 설정 값 (toolbar 삭제함)
  const editorConfig = {
    toolbar: [],
    width: "800px",
    height: "800px",
  };

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
          <Text>| 조회수 : {board.views}</Text>
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
        <Box border={"1px solid red"}>
          {/* CKEditor 본문 영역 onReady => 높이 설정 */}
          <CKEditor
            disabled={"true"}
            editor={ClassicEditor}
            data={board.content}
            config={editorConfig}
            onReady={(editor) => {
              editor.ui.view.editable.element.style.minHeight = "500px";
            }}
          />
        </Box>
      </FormControl>

      {/* 파일 리스트 */}
      {uploadFiles.length > 0 && (
        <Box mb={2}>
          <Text>파일 목록</Text>
          <Box
            border={"1px solid #edf1f6"}
            h={"50px"}
            display={"flex"}
            alignItems={"center"}
            gap={3}
          >
            {uploadFiles.map((fileList) => (
              <Link
                key={fileList.id}
                style={{ display: "block", color: "blue" }}
                to={fileList.fileurl}
              >
                {fileList.filename}
              </Link>
            ))}
          </Box>
        </Box>
      )}
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
