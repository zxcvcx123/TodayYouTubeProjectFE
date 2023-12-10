import React, { useContext, useEffect, useState } from "react";
import { DetectLoginContext } from "../../component/LoginProvider";
import axios from "axios";
import "./MemberInfo.css";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
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
  Tr,
  useToast,
} from "@chakra-ui/react";
import MemberInfoMyInfo from "./MemberInfoMyInfo";
import { MemberInfoMyFavoriteBoard } from "./MemberInfoMyFavoriteBoard";
import YoutubeInfo from "../../component/YoutubeInfo";
import MemberInfoPageNation from "./MemberInfoPageNation";
import { AttachmentIcon } from "@chakra-ui/icons";
import { MemberInfoProfile } from "./MemberInfoProfile";

function MemberInfo(props) {
  const { loginInfo, token } = useContext(DetectLoginContext);
  let navigate = useNavigate("");
  let toast = useToast();
  const [myInfo, setMyInfo] = useState(true);
  const [popMyBoardList, setPopMyBoardList] = useState(false);
  const [myBoardListDependency, setMyBoardListDependency] = useState(0);
  const [myFavoriteBoard, setMyFavoriteBoard] = useState(false);
  const [pageNumberInformation, setPageNumberInformation] = useState(null);
  /* State*/
  const [myBoardList, setMyBoardList] = useState(null); // 글 리스트
  const [categoryOrdedBy, setCategoryOrdedBy] = useState("latest"); // 정렬 기준
  const [categoryTopics, setCategoryTopics] = useState("video"); // 리스트 기준
  const [params] = useSearchParams();
  const location = useLocation();
  /* react-router-dom */
  useEffect(() => {
    const grantType = localStorage.getItem("grantType");
    const accessToken = localStorage.getItem("accessToken");
    params.set("ob", categoryOrdedBy); // 정렬 기준
    params.set("ct", categoryTopics); // 리스트 기준
    params.set("member_id", loginInfo.member_id);
    axios
      .get("/api/member/info/myBoardList?" + params, {
        headers: {
          Authorization: `${grantType} ${accessToken}`,
        },
      })
      .then((response) => {
        setMyBoardList(response.data.myBoardList);
        setPageNumberInformation(response.data.pagingInformation);
        console.log(response.data.pagingInformation);
      })
      .catch((error) => {
        toast({
          description: "비정상적인 접근입니다.",
          status: "error",
        });
        navigate("/");
      });
  }, [myBoardListDependency, categoryOrdedBy, categoryTopics, location]);
  function handleMemberInfoMyInfo() {
    setMyInfo(true);
    setPopMyBoardList(false);
    setMyFavoriteBoard(false);
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
    setMyFavoriteBoard(false);
    setMyBoardListDependency(1);
    document.querySelector(".myInfoBtn").style.backgroundColor = "inherit";
    document.querySelector(".myBoardListBtn").style.backgroundColor = "white";
    document.querySelector(".myFavoriteBoardBtn").style.backgroundColor =
      "inherit";
    document.querySelector(".myInfoBtn").style.color = "white";
    document.querySelector(".myBoardListBtn").style.color = "black";
    document.querySelector(".myFavoriteBoardBtn").style.color = "white";
  }

  function handleMyFavoriteBoard() {
    setMyInfo(false);
    setPopMyBoardList(false);
    setMyFavoriteBoard(true);
    document.querySelector(".myInfoBtn").style.backgroundColor = "inherit";
    document.querySelector(".myBoardListBtn").style.backgroundColor = "inherit";
    document.querySelector(".myFavoriteBoardBtn").style.backgroundColor =
      "white";
    document.querySelector(".myInfoBtn").style.color = "white";
    document.querySelector(".myBoardListBtn").style.color = "white";
    document.querySelector(".myFavoriteBoardBtn").style.color = "black";
  }

  return (
    <>
      <Flex w={"100%"} h={"100%"} minHeight={"750px"}>
        <Card
          w={"350px"}
          minWidth={"350px"}
          bg={"#323232"}
          boxShadow={"none"}
          position={"sticky"}
        >
          <Center>
            <Box mt={10} mb={20}>
              <MemberInfoProfile />
            </Box>
          </Center>
          <Flex flexDirection={"column"} w={"100%"} alignItems={"flex-end"}>
            <div className="divBtn">
              <Button
                w={"100%"}
                variant={"ghost"}
                p={"8"}
                onClick={handleMemberInfoMyInfo}
                fontSize={"18px"}
                className="myInfoBtn"
                backgroundColor={"white"}
              >
                내 정보
              </Button>
            </div>
            <div className="divBtn">
              <Button
                w={"100%"}
                variant={"ghost"}
                p={"8"}
                onClick={handleMyBoardList}
                fontSize={"18px"}
                className="myBoardListBtn"
                color={"white"}
              >
                내가 쓴 글
              </Button>
            </div>
            <div className="divBtn">
              <Button
                w={"100%"}
                variant={"ghost"}
                p={"8"}
                onClick={handleMyFavoriteBoard}
                fontSize={"18px"}
                color={"white"}
                className="myFavoriteBoardBtn"
              >
                내 미니 홈피
              </Button>
            </div>
          </Flex>
        </Card>
        {myInfo && <MemberInfoMyInfo loginInfo={loginInfo} />}
        {popMyBoardList && (
          <Card minWidth="1200px" w={"80%"} p={"20px"} boxShadow={"none"}>
            <CardBody>
              <Stack mt="6" spacing="3">
                <Flex justifyContent={"space-between"}>
                  <Heading size="xl">내가 쓴 글</Heading>
                  <Flex>
                    <Select
                      w={"100px"}
                      defaultValue={"latest"}
                      onChange={(e) => {
                        setCategoryOrdedBy(e.target.value);
                      }}
                    >
                      <option value="latest">최신순</option>
                      <option value="like">추천순</option>
                      <option value="views">조회수순</option>
                    </Select>
                  </Flex>
                </Flex>
                <Card mt={"5"}>
                  <CardBody>
                    <Flex m={2} justifyContent={"flex-end"}>
                      <RadioGroup
                        value={categoryTopics}
                        onChange={setCategoryTopics}
                      >
                        <Stack direction="row">
                          <Radio value="video">영상</Radio>
                          <Radio value="origin">소통</Radio>
                        </Stack>
                      </RadioGroup>
                    </Flex>
                    <Center>
                      <TableContainer w={"100%"}>
                        <Table size="sm">
                          <Thead>
                            <Tr fontSize={"15px"}>
                              {categoryTopics !== "origin" && <Th>썸네일</Th>}
                              <Th>제목</Th>
                              <Th>작성자</Th>
                              <Th>작성일</Th>
                              <Th>추천수</Th>
                              <Th>조회수</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {myBoardList.map((myBoard) => (
                              <Tr
                                _hover={{
                                  cursor: "pointer",
                                }}
                                key={myBoard.id}
                                onClick={() => navigate("/board/" + myBoard.id)}
                              >
                                {categoryTopics !== "origin" && (
                                  <Td>
                                    <YoutubeInfo
                                      link={myBoard.link}
                                      extraThumbnail={true}
                                      thumbnailWidth={120}
                                      thumbnailHeight={70}
                                    />
                                  </Td>
                                )}
                                <Td>{myBoard.title}</Td>
                                <Td>{myBoard.nickname}</Td>
                                <Td>{myBoard.created_at}</Td>
                                <Td>{myBoard.countlike}</Td>
                                <Td>{myBoard.views}</Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>{" "}
                    </Center>
                    <MemberInfoPageNation
                      pageNumberInformation={pageNumberInformation}
                    />
                  </CardBody>
                </Card>
              </Stack>
            </CardBody>
            <Divider color={"gray"} />
            <CardFooter></CardFooter>
          </Card>
        )}
        {myFavoriteBoard && <MemberInfoMyFavoriteBoard loginInfo={loginInfo} />}
      </Flex>
    </>
  );
}

export default MemberInfo;
