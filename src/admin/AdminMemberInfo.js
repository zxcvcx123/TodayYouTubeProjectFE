import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AdminMemberInfoDetails from "./AdminMemberInfoDetails";
import YoutubeInfo from "../component/YoutubeInfo";
import Pagination from "../page/Pagination";
import { Sidenav } from "./Sidenav";
import LoadingPage from "../component/LoadingPage";
import { DetectLoginContext } from "../component/LoginProvider";

function AdminMemberInfo(props) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const { member_id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const [activeBoard, setActiveBoard] = useState(null);
  const [memberInfoBoardList, setMemberInfoBoardList] = useState(null);
  const [memberInfoCommentList, setMemberInfoCommentList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [pageInfo2, setPageInfo2] = useState(null);

  const [myInfo, setMyInfo] = useState(true);
  const [popMyBoardList, setPopMyBoardList] = useState(false);
  const [myBoardListDependency, setMyBoardListDependency] = useState(0);
  const [MemberComment, setMemberComment] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/admin/member/" + member_id + "?" + params)
      .then((response) => {
        setMemberInfo(response.data.memberList);
        setActiveBoard(response.data.activeBoard);
        setMemberInfoBoardList(response.data.memberInfoBoardList);
        setMemberInfoCommentList(response.data.memberInfoCommentList);
        setPageInfo(response.data.pageInfo);
        setPageInfo2(response.data.pageInfo2);
      })
      .catch(() => console.log("bad"));
  }, [location]);

  function handleMemberInfoMyInfo() {
    setMyInfo(true);
    setPopMyBoardList(false);
    setMemberComment(false);
    document.querySelector(".myInfoBtn").style.backgroundColor = "white";
    document.querySelector(".myBoardListBtn").style.backgroundColor = "inherit";
    document.querySelector(".myFavoriteBoardBtn").style.backgroundColor =
      "inherit";
    document.querySelector(".myInfoBtn").style.color = "black";
    document.querySelector(".myBoardListBtn").style.color = "white";
    document.querySelector(".myFavoriteBoardBtn").style.color = "white";
  }

  function handleMyBoardList() {
    setMyBoardListDependency(1);
    setMyInfo(false);
    setPopMyBoardList(true);
    setMemberComment(false);
    setMyBoardListDependency(1);
    document.querySelector(".myInfoBtn").style.backgroundColor = "inherit";
    document.querySelector(".myBoardListBtn").style.backgroundColor = "white";
    document.querySelector(".myFavoriteBoardBtn").style.backgroundColor =
      "inherit";
    document.querySelector(".myInfoBtn").style.color = "white";
    document.querySelector(".myBoardListBtn").style.color = "black";
    document.querySelector(".myFavoriteBoardBtn").style.color = "white";
  }

  function handleMemberComment() {
    setMyInfo(false);
    setPopMyBoardList(false);
    setMemberComment(true);
    document.querySelector(".myInfoBtn").style.backgroundColor = "inherit";
    document.querySelector(".myBoardListBtn").style.backgroundColor = "inherit";
    document.querySelector(".myFavoriteBoardBtn").style.backgroundColor =
      "white";
    document.querySelector(".myInfoBtn").style.color = "white";
    document.querySelector(".myBoardListBtn").style.color = "white";
    document.querySelector(".myFavoriteBoardBtn").style.color = "black";
  }

  if (memberInfo == null || memberInfoBoardList == null || pageInfo == null) {
    return <LoadingPage />;
  }

  if (!token.detectLogin || loginInfo.role_name !== "운영자") {
    return (
      <Box w={"80%"} m={"auto"}>
        <Alert
          // colorScheme="red"
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            관리자페이지 입니다!
          </AlertTitle>
          <Button mt={5} onClick={() => navigate("/")}>
            메인페이지로 가기
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Flex w={"100%"} h={"100%"} minHeight={"750px"}>
        <Sidenav />
        <Card
          w={"300px"}
          minWidth={"300px"}
          bg={"#323232"}
          boxShadow={"none"}
          position={"sticky"}
        >
          <Center>
            <Box mt={10} mb={20}></Box>
          </Center>
          <Flex flexDirection={"column"} w={"100%"} alignItems={"flex-end"}>
            <div className="divBtn">
              <Button
                w={"100%"}
                variant={"ghost"}
                p={"8"}
                fontSize={"18px"}
                className="myInfoBtn"
                backgroundColor={"white"}
                onClick={handleMemberInfoMyInfo}
              >
                {memberInfo.member_id} 님의 정보
              </Button>
            </div>
            <div className="divBtn">
              <Button
                w={"100%"}
                variant={"ghost"}
                p={"8"}
                fontSize={"18px"}
                className="myBoardListBtn"
                color={"white"}
                onClick={handleMyBoardList}
              >
                작성한 게시물
              </Button>
            </div>
            <div className="divBtn">
              <Button
                w={"100%"}
                variant={"ghost"}
                p={"8"}
                fontSize={"18px"}
                color={"white"}
                className="myFavoriteBoardBtn"
                onClick={handleMemberComment}
              >
                작성한 댓글
              </Button>
            </div>
          </Flex>
        </Card>
        {myInfo && (
          <AdminMemberInfoDetails
            memberInfo={memberInfo}
            member_id={member_id}
            handleMemberInfoMyInfo={handleMemberInfoMyInfo}
            handleMyBoardList={handleMyBoardList}
            handleMemberComment={handleMemberComment}
          />
        )}
        {popMyBoardList && (
          <Card minWidth="1200px" w={"70%"} p={"20px"} boxShadow={"none"}>
            <CardBody>
              <Stack mt="6" spacing="3">
                <Flex justifyContent={"space-between"}>
                  <Heading size="xl">사용자가 작성한 게시물</Heading>
                </Flex>
                <Card mt={"5"}>
                  <CardBody>
                    <Flex m={2} justifyContent={"flex-end"}></Flex>
                    <Center>
                      <TableContainer w={"100%"}>
                        <Table size="sm">
                          <Thead>
                            <Tr fontSize={"15px"}>
                              <Th>썸네일</Th>
                              <Th>제목</Th>
                              <Th>작성자</Th>
                              <Th>작성일</Th>
                              <Th>추천수</Th>
                              <Th>조회수</Th>
                              <Th>비고</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {memberInfoBoardList &&
                              memberInfoBoardList.map((mList) => (
                                <Tr key={mList.id}>
                                  <Td textAlign={"center"} w={"10%"}>
                                    <YoutubeInfo
                                      link={mList.link}
                                      extraThumbnail={true}
                                    />
                                  </Td>
                                  <Td
                                    overflow={"hidden"}
                                    maxW={"120px"}
                                    verticalAlign={"middle"}
                                  >
                                    <Tooltip label={mList.title}>
                                      {mList.title}
                                    </Tooltip>
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mList.board_member_id}
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mList.created_at}
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mList.countlike}
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mList.views}
                                  </Td>
                                  <Td verticalAlign={"middle"} color={"red"}>
                                    {mList.is_show || "삭제됨"}
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Center>
                  </CardBody>
                </Card>
              </Stack>
            </CardBody>
            <Divider color={"gray"} />
            <CardFooter m={"auto"}>
              <Pagination pageInfo={pageInfo} />
            </CardFooter>
          </Card>
        )}
        {MemberComment && (
          <Card minWidth="1200px" w={"70%"} p={"20px"} boxShadow={"none"}>
            <CardBody>
              <Stack mt="6" spacing="3">
                <Flex justifyContent={"space-between"}>
                  <Heading size="xl">사용자가 작성한 게시물</Heading>
                </Flex>
                <Card mt={"5"}>
                  <CardBody>
                    <Flex m={2} justifyContent={"flex-end"}></Flex>
                    <Center>
                      <TableContainer w={"100%"}>
                        <Table size="sm">
                          <Thead>
                            <Tr fontSize={"15px"}>
                              <Th>번호</Th>
                              <Th>게시글 id</Th>
                              <Th>글 제목</Th>
                              <Th>댓글 id</Th>
                              <Th>댓글내용</Th>
                              <Th>댓글 추천수</Th>
                              <Th>작성일시</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {memberInfoCommentList &&
                              memberInfoCommentList.map((mComment) => (
                                <Tr key={mComment.id}>
                                  <Td>
                                    {memberInfoCommentList.indexOf(mComment) +
                                      1}
                                  </Td>
                                  <Td textAlign={"center"}>
                                    {mComment.board_id}
                                  </Td>
                                  <Td
                                    overflow={"hidden"}
                                    maxW={"120px"}
                                    verticalAlign={"middle"}
                                  >
                                    <Tooltip label={mComment.title}>
                                      {mComment.title}
                                    </Tooltip>
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mComment.id}
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mComment.comment}
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mComment.countcommentlike}
                                  </Td>
                                  <Td verticalAlign={"middle"}>
                                    {mComment.created_at}
                                  </Td>
                                </Tr>
                              ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Center>
                  </CardBody>
                </Card>
              </Stack>
            </CardBody>
            <Divider color={"gray"} />
            <CardFooter m={"auto"}>
              <Pagination pageInfo={pageInfo2} />
            </CardFooter>
          </Card>
        )}
      </Flex>
    </>
  );
}

export default AdminMemberInfo;
