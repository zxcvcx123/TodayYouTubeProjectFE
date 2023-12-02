import React, { useContext, useEffect, useState } from "react";
import { DetectLoginContext } from "../component/LoginProvider";
import axios from "axios";
import "./MemberInfo.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, Center, Flex, Image, useToast } from "@chakra-ui/react";
import MemberInfoMyInfo from "./MemberInfoMyInfo";
import MemberInfoMyBoardList from "./MemberInfoMyBoardList";
import { MemberInfoMyFavoriteBoard } from "./MemberInfoMyFavoriteBoard";

function MemberInfo(props) {
  const { loginInfo } = useContext(DetectLoginContext);
  let navigate = useNavigate("");
  let toast = useToast();
  const [myInfo, setMyInfo] = useState(true);
  const [myBoardList, setMyBoardList] = useState(false);
  const [myFavoriteBoard, setMyFavoriteBoard] = useState(false);

  useEffect(() => {
    axios
      .get("/api/member/info", {
        member_id: loginInfo.member_id,
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast({
            description: "비정상적인 접근입니다. 로그인 후 이용바랍니다.",
            status: "warning",
          });
          navigate("/member/login");
        }
      });
  }, []);

  function handleMemberInfoMyInfo() {
    setMyInfo(true);
    setMyBoardList(false);
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
    setMyInfo(false);
    setMyBoardList(true);
    setMyFavoriteBoard(false);
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
    setMyBoardList(false);
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
      <Flex w={"100%"} h={"100%"}>
        <Card w={"20%"} bg={"#2d3748"} boxShadow={"none"}>
          <Center>
            <Image
              mt={"10"}
              mb={"20"}
              borderRadius="full"
              boxSize="200px"
              src="https://bit.ly/sage-adebayo"
              alt="Dan Abramov"
            />
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
                좋아요 한 글
              </Button>
            </div>
          </Flex>
        </Card>
        {myInfo && <MemberInfoMyInfo loginInfo={loginInfo} />}
        {myBoardList && <MemberInfoMyBoardList loginInfo={loginInfo} />}
        {myFavoriteBoard && <MemberInfoMyFavoriteBoard loginInfo={loginInfo} />}
      </Flex>
    </>
  );
}

export default MemberInfo;
