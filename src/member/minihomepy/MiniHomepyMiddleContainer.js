import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons/faHouseUser";
import { faBookOpen, faComments } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import "./minihomepy-styles/content.css";
import { ArrowForwardIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { MiniHomepyList } from "./MiniHomepyList";
import { Box, Center, Text } from "@chakra-ui/react";
import { MiniHomepyHome } from "./MiniHomepyHome";

function MiniHomepyMiddleContent({
  name,
  loginMember,
  member_id,
  topRankBoardList,
  newBoardList,
  categoryOrdedBy,
  setCategoryOrdedBy,
  boardListAll,
  member,
  setSearchingKeyword,
  searchingKeyword,
}) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        bg={"transparent"}
        sx={{
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <div className="popup">
          <Text fontSize={"25px"} w={"100%"} color={"#BC55EF"}></Text>
          <Center
            h={"95%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Box w={"95%"} h={"100%"}>
              {name === "HOME" && (
                <MiniHomepyHome
                  topRankBoardList={topRankBoardList}
                  newBoardList={newBoardList}
                />
              )}

              {name === "LIST" && (
                <MiniHomepyList
                  loginMember={loginMember}
                  member_id={member_id}
                  categoryOrdedBy={categoryOrdedBy}
                  setCategoryOrdedBy={setCategoryOrdedBy}
                  boardListAll={boardListAll}
                  member={member}
                  setSearchingKeyword={setSearchingKeyword}
                  searchingKeyword={searchingKeyword}
                />
              )}
              {name === "MESSAGE" && <MiniHomepyList />}
            </Box>
          </Center>
          {/* 여기에 각 팝업의 내용을 추가 */}
        </div>
      </Box>
    </>
  );
}

export function MiniHomepyMiddleContainer({
  loginMember,
  member_id,
  topRankBoardList,
  newBoardList,
  categoryOrdedBy,
  setCategoryOrdedBy,
  boardListAll,
  member,
  setSearchingKeyword,
  searchingKeyword,
}) {
  let navigate = useNavigate();
  useEffect(() => {
    const list = document.querySelectorAll(".list");
    function activeLink() {
      list.forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    }

    list.forEach((item) => {
      item.addEventListener("click", activeLink);
    });
    return () => {
      list.forEach((item) => {
        item.removeEventListener("click", activeLink);
      });
    };
  }, []);

  const [activePopup, setActivePopup] = useState("HOME");

  // 팝업을 표시하는 함수
  const showPopup = (popupName) => {
    setActivePopup(popupName);
  };

  return (
    <>
      {activePopup && (
        <MiniHomepyMiddleContent
          name={activePopup}
          loginMember={loginMember}
          member_id={member_id}
          topRankBoardList={topRankBoardList}
          newBoardList={newBoardList}
          categoryOrdedBy={categoryOrdedBy}
          setCategoryOrdedBy={setCategoryOrdedBy}
          boardListAll={boardListAll}
          member={member}
          setSearchingKeyword={setSearchingKeyword}
          searchingKeyword={searchingKeyword}
        />
      )}

      <div className="container">
        <div className="navigation">
          <HamburgerIcon
            color="white"
            fontSize="1.5em"
            position={"absolute"}
            left={"10"}
          />
          <ul>
            <li
              className="list active"
              onClick={() => {
                showPopup("HOME");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faHouseUser} />
                </span>
                <span className="text">HOME</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li
              className="list"
              onClick={() => {
                showPopup("LIST");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faBookOpen} />
                </span>
                <span className="text">LIST</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li
              className="list"
              onClick={() => {
                showPopup("MESSAGE");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </span>
                <span className="text">MESSAGE</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li className="list">
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <span className="text">Photos</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li className="list">
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComments} />
                </span>
                <span className="text">Settings</span>
                <span className="circle"></span>
              </a>
            </li>
            <div className="indicator"></div>
          </ul>
          <ArrowForwardIcon
            color="white"
            fontSize="1.8em"
            position={"absolute"}
            right={"10"}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
      </div>
    </>
  );
}
