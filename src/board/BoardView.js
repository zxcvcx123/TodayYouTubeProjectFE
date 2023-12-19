import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BoardComment } from "../comment/BoardComment";
import BoardLike from "../like/BoardLike";
import YoutubeInfo from "../component/YoutubeInfo";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { DetectLoginContext } from "../component/LoginProvider";
import MemberProfile from "../member/MemberProfile";
import ScrollToTop from "../util/ScrollToTop";
import LoadingPage from "../component/LoadingPage";
import BoardProfile from "./BoardProfile";
import ReactPlayer from "react-player";
import dompurify from "dompurify";
import { config } from "../member/config/apikey";

function BoardView() {
  /* 로그인 정보 컨텍스트 */
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  // state
  const [board, setBoard] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [like, setLike] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  /* 작성자 본인이 맞는지 확인 하는 state */
  const [isAuthor, setIsAuthor] = useState(false);
  // const [isReadOnly, setIsReadOnly] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  // useState를 사용하여 채널 정보를 저장할 state 생성
  const [channelInfo, setChannelInfo] = useState(null);

  //URL 매개변수 추출
  const { id } = useParams();

  // 현재 URL 파악하기
  const location = useLocation();
  const boardInfo = location.state;

  // 현재 URL에서 category 명 추출
  const currentParams = new URLSearchParams(location.search).get("category");

  // navigate
  const navigate = useNavigate();

  /* use toast */
  const toast = useToast();

  /* modal */
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  ck에디터 설정 값 (toolbar 삭제함)
  const editorConfig = {
    toolbar: [],
  };

  // 게시글 정보에서 비디오 링크를 가져온 후 채널 정보를 가져오는 함수
  const fetchChannelInfo = (videoLink) => {
    // 정규 표현식을 사용하여 동영상 ID 추출
    const videoIdMatch = videoLink.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v\/|.*[?&]v=))([^"&?\/\s]{11})/,
    );

    // videoIdMatch 배열에서 동영상 ID 추출
    const videoId = videoIdMatch && videoIdMatch[1];

    if (!videoId) {
      console.error("YouTube 동영상 ID를 추출할 수 없습니다.");
      return;
    }

    // YouTube Data API 엔드포인트
    const apiKey = config.apikey;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    // 비디오 정보 가져오기
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.items && data.items.length > 0) {
          // 채널 ID 가져오기
          const channelId = data.items[0].snippet.channelId;

          // 채널 정보 가져오기
          return fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`,
          );
        } else {
          console.error("YouTube API 응답에서 항목을 찾을 수 없습니다.");
        }
      })
      .then((response) => response.json())
      .then((data) => {
        // 채널명 가져오기
        const channelTitle = data.items[0].snippet.title;
        console.log("채널명:", channelTitle);

        // 채널 정보 state에 저장
        setChannelInfo(data.items[0].snippet);
      })
      .catch((error) => console.error("에러 발생:", error));
  };

  // 초기 렌더링
  useEffect(() => {
    console.log("랜더링 테스트");
    axios
      .get("/api/board/id/" + id)
      .then((response) => {
        setBoard(response.data);

        // if (!response.data.is_show) {
        //   navigate("/");
        //   window.alert("삭제된 게시물입니다.");
        // }

        // 게시글 데이터를 가져온 후 작성자 여부를 확인하여 isAuthor 설정
        if (
          loginInfo &&
          loginInfo.member_id === response.data.board_member_id
        ) {
          setIsAuthor(true);
        }

        // 게시글 데이터를 가져온 후 운영자 여부를 확인하여 isAdmin 설정
        if (
          loginInfo &&
          loginInfo.role_name &&
          loginInfo.role_name === "운영자"
        ) {
          setIsAdmin(true);
        }

        if (loginInfo) {
          console.log(loginInfo.role_name);
          console.log(loginInfo.role_name === "운영자");
        }

        // 게시글 정보를 가져온 후 채널 정보를 가져오는 함수 호출
        if (response.data.link) {
          fetchChannelInfo(response.data.link);
        }
      })
      .catch(() => navigate("/board/list?" + currentParams));
  }, [isSubmitting, location, loginInfo]);

  // 초기 렌더링 파일 목록 가져오기
  useEffect(() => {
    axios.get("/api/file/list/" + id).then((response) => {
      setUploadFiles(response.data);
    });
  }, []);

  // board 불러오지 못할 시 로딩중 표시
  if (board === null) {
    return <LoadingPage />;
  }

  // 게시글 삭제 버튼 클릭
  function handleDeleteClick() {
    setIsSubmitting(true);
    // 게시글 삭제 시 아이디 유효성 검증
    if (isAdmin || isAuthor) {
      axios
        .put("/api/board/remove/" + id, {
          id: board.id,
          title: board.title,
          content: board.content,
          link: board.link,
          board_category_code: board.board_category_code,
          board_member_id: board.board_member_id,
          created_at: board.created_at,
          updated_at: board.updated_at,
          is_show: board.is_show,
          countlike: board.countlike,
          views: board.views,
          login_member_id: loginInfo.member_id,
          role_name: loginInfo.role_name,
        })
        .then(() => {
          toast({
            description: "삭제되었습니다.",
            status: "success",
          });
          navigate("/board/list?" + currentParams);
        })
        .catch((error) => {
          if (error.response.status === 403) {
            toast({
              description: "게시글 삭제는 작성자만 가능합니다.",
              status: "error",
            });
            return;
          }

          if (error.response.status === 401) {
            toast({
              description: "권한 정보가 없습니다.",
              status: "error",
            });
            return;
          }

          if (error.response) {
            toast({
              description: "게시글 삭제에 실패했습니다.",
              status: "error",
            });
            return;
          }

          console.log("error");
        })
        .finally(() => {
          onClose();
          setIsSubmitting(false);
        });
      return;
    }

    if (!isAuthor) {
      window.alert("작성자 본인만 삭제 가능합니다.");
      return;
    }
  }

  // 수정 버튼 클릭
  function handleEditClick() {
    // 로그인 여부 검증
    if (!isAuthor) {
      window.alert("작성자 본인만 수정 가능합니다.");
      return;
    }

    // 작성자 본인 여부 검증
    if (loginInfo.member_id === board.board_member_id) {
      navigate("/board/edit/" + id);
    } else {
      window.alert("작성자 본인만 수정이 가능합니다.");
    }
  }

  // 링크 복사 버튼 클릭
  function handleCopyClick() {
    navigator.clipboard
      .writeText(board.link)
      .then(() => {
        toast({
          description: "링크가 복사되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "링크가 복사에 실패하였습니다 ㅠㅠ",
          status: "error",
        });
      });
  }

  // 유효한 YouTube 링크인지 확인하는 함수
  function isValidYoutubeLink(link) {
    // 정규 표현식을 사용하여 유효한 YouTube 링크인지 확인
    const youtubeLinkRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|youtu\.be\/)([^\?&"'>]+)/;
    return youtubeLinkRegex.test(link);
  }

  // 유튜브 섹션 렌더링 여부 결정 함수
  function renderYoutubeSection() {
    if (!board.link || !isValidYoutubeLink(board.link)) {
      return <></>;
    }

    return (
      <FormControl
        backgroundColor={"rgba(0,0,0,0.9)"}
        p={"10px"}
        boxShadow={"0 2px 10px rgba(0, 0, 0, 0.3)"}
      >
        <FormLabel fontSize="xl" fontWeight="bold" color={"rgb(255,255,255)"}>
          추천 유튜브 영상
        </FormLabel>
        <Center>
          <Flex m={2} ml={0} gap={5}>
            {/* 유튜브 영상 출력 */}
            {/*<YoutubeInfo link={board.link} extraVideo={true} />*/}
            <ReactPlayer
              className="video-container"
              url={board.link}
              config={{
                youtube: {
                  playerVars: {
                    autoplay: 0,
                  },
                },
              }}
            />
            <Box justifyContent={"center"}>{renderChannelInfo()}</Box>
          </Flex>
        </Center>
      </FormControl>
    );
  }

  // 채널 정보가 있는 경우에만 출력하는 부분
  function renderChannelInfo() {
    if (!channelInfo) {
      return null;
    }

    // 채널 설명의 최대 표시 길이
    const maxDescriptionLength = 200;

    // 채널 설명이 최대 길이보다 길 경우 일부만 표시하고 "..." 추가
    const truncatedDescription =
      channelInfo.description.length > maxDescriptionLength
        ? `${channelInfo.description.slice(0, maxDescriptionLength)}...`
        : channelInfo.description;

    return (
      <Box>
        <Flex>
          <Avatar
            boxShadow="0 0 0 5px rgba(255, 255, 255, 1)"
            size="2xl"
            src={channelInfo.thumbnails.high.url}
            alt={channelInfo.title}
            m={"20px"}
          />
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Button
              size={"sm"}
              onClick={() => {
                window.open("https://www.youtube.com/" + channelInfo.customUrl);
              }}
              colorScheme="red"
              mb={5}
            >
              채널로 이동
            </Button>
            <Button size={"sm"} onClick={handleCopyClick} colorScheme="blue">
              유튜브 링크 복사
            </Button>
          </Box>
        </Flex>
        <Text color={"white"} fontWeight={"bold"} mb={"5px"}>
          채널명 : {channelInfo.title}
        </Text>
        <Badge variant={"solid"}>채널설명</Badge>
        <Text color={"white"} fontSize={"small"} w={"310px"}>
          {truncatedDescription}
        </Text>
      </Box>
    );
  }

  // 날짜 포맷 변경
  function formatDateTime(dateTimeString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24시간 형식
    };

    const formattedDate = new Date(dateTimeString);
    const intlFormatter = new Intl.DateTimeFormat("ko-KR", options);
    const [
      { value: year },
      ,
      { value: month },
      ,
      { value: day },
      ,
      { value: hour },
      ,
      { value: minute },
    ] = intlFormatter.formatToParts(formattedDate);

    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  function contents() {
    if (board.content !== undefined) {
      const contents = dompurify.sanitize(board.content);
      return <Box dangerouslySetInnerHTML={{ __html: contents }}></Box>;
    } else {
      return <Box></Box>;
    }
  }

  return (
    <Center mb={"50px"}>
      <Box mt={"20px"} w={"1000px"}>
        <Box mb={5}>
          <Box w={"500px"} borderBottom={"5px solid rgb(0,35,150,0.5)"}>
            <Heading>{board.categoryName} 게시판</Heading>
          </Box>
        </Box>

        {/* -------------------- 상단 영역 -------------------- */}
        <FormControl mt={10} mb={2}>
          {/* 제목 */}
          <Text fontSize={"xx-large"} as={"strong"}>
            {board.title}
          </Text>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex alignItems={"center"}>
              {/* 프로필 */}
              <BoardProfile
                board_id={board.id}
                board_member_id={board.board_member_id}
              />
              {/* 일자 */}
              <Text>| {formatDateTime(board.updated_at)}</Text>
            </Flex>
            {/* 좋아요, 조회수 */}
            <Flex alignItems={"center"} gap={"5"}>
              <BoardLike id={id} like={like} board={board} />
              <Text> | 조회수 : {board.views}</Text>
            </Flex>
          </Flex>
        </FormControl>

        {/* -------------------- 유튜브 섹션 -------------------- */}
        {renderYoutubeSection()}

        {/* -------------------- 본문 -------------------- */}
        <FormControl my={"50px"}>
          {/*<FormLabel>본문</FormLabel>*/}
          <Box>
            {board.content !== undefined && contents()}

            {/* CKEditor 본문 영역 onReady => 높이 설정 */}
            {/*{board && (*/}
            {/*  <CKEditor*/}
            {/*    disabled={"true"}*/}
            {/*    editor={ClassicEditor}*/}
            {/*    data={board.content}*/}
            {/*    config={editorConfig}*/}
            {/*    onReady={(editor) => {*/}
            {/*      editor.ui.view.editable.element.style.minHeight = "500px";*/}
            {/*    }}*/}
            {/*  />*/}
            {/*)}*/}
          </Box>
        </FormControl>

        {/* -------------------- 파일 리스트 -------------------- */}
        {uploadFiles.length > 0 && (
          <Box mb={2}>
            <Text>파일 목록</Text>
            <Box border={"1px solid #edf1f6"} h={"auto"} textIndent={"10px"}>
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
        {/* -------------------- 버튼 섹션 -------------------- */}
        <Flex justifyContent={"right"}>
          {isAuthor || isAdmin ? (
            <Box mr={"10px"}>
              {/* 수정 버튼 */}
              <Button
                colorScheme="purple"
                onClick={handleEditClick}
                mr={"10px"}
              >
                수정
              </Button>

              {/* 삭제 버튼 */}
              <Button colorScheme="red" onClick={onOpen}>
                삭제
              </Button>
            </Box>
          ) : (
            <></>
          )}
          {/* 목록 버튼 */}
          <Button
            colorScheme="blue"
            onClick={() => navigate("/board/list?category=" + currentParams)}
          >
            목록
          </Button>
        </Flex>
        {/* -------------------- 댓글 영역 -------------------- */}

        <BoardComment board_id={id} boardData={board} />
        <ScrollToTop />
      </Box>
      {/* 삭제 모달 */}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>삭제 확인</ModalHeader>
            <ModalCloseButton />
            <ModalBody>삭제 하시겠습니까?</ModalBody>

            <ModalFooter>
              <Button onClick={onClose}>닫기</Button>
              <Button
                isDisabled={isSubmitting}
                onClick={handleDeleteClick}
                colorScheme="red"
              >
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Center>
  );
}

export default BoardView;
