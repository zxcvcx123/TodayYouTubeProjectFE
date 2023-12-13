import React, { useEffect, useState } from "react";
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
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import AdminMemberInfoDetails from "./AdminMemberInfoDetails";

function AdminMemberInfo(props) {
  const { member_id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);

  const [myInfo, setMyInfo] = useState(true);
  const [popMyBoardList, setPopMyBoardList] = useState(false);
  const [myBoardListDependency, setMyBoardListDependency] = useState(0);
  const [myFavoriteBoard, setMyFavoriteBoard] = useState(false);

  useEffect(() => {
    axios
      .get("/api/admin/member/" + member_id)
      .then((response) => setMemberInfo(response.data))
      .catch(() => console.log("bad"));
  }, []);

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

  if (memberInfo == null) {
    return <Spinner />;
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
                내가 쓴 글
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
                onClick={handleMyFavoriteBoard}
              >
                내 미니 홈피
              </Button>
            </div>
          </Flex>
        </Card>
        {myInfo && <AdminMemberInfoDetails memberInfo={memberInfo} />}
        {popMyBoardList && (
          <Card minWidth="1200px" w={"80%"} p={"20px"} boxShadow={"none"}>
            <CardBody>
              <Stack mt="6" spacing="3">
                <Flex justifyContent={"space-between"}>
                  <Heading size="xl">내가 쓴 글</Heading>
                  <Flex>
                    <Select w={"100px"} defaultValue={"latest"}>
                      <option value="latest">최신순</option>
                      <option value="like">추천순</option>
                      <option value="views">조회수순</option>
                    </Select>
                  </Flex>
                </Flex>
                <Card mt={"5"}>
                  <CardBody>
                    <Flex m={2} justifyContent={"flex-end"}>
                      <RadioGroup>
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
                              <Th>썸네일</Th>
                              <Th>제목</Th>
                              <Th>작성자</Th>
                              <Th>작성일</Th>
                              <Th>추천수</Th>
                              <Th>조회수</Th>
                            </Tr>
                          </Thead>
                        </Table>
                      </TableContainer>
                    </Center>
                  </CardBody>
                </Card>
              </Stack>
            </CardBody>
            <Divider color={"gray"} />
            <CardFooter></CardFooter>
          </Card>
        )}
      </Flex>
    </>
  );
}

export default AdminMemberInfo;
