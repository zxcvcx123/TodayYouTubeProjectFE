import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons/faHouseUser";
import {
  faBookmark,
  faBookOpen,
  faChartPie,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import "./minihomepy-styles/content.css";
import { useNavigate } from "react-router-dom";
import { MiniHomepyList } from "./MiniHomepyList";
import { Box, Center, Text } from "@chakra-ui/react";
import { MiniHomepyHome } from "./MiniHomepyHome";
import { MiniHomepyFavoriteList } from "./MiniHomepyFavoriteList";
import { MiniHompeyAbout } from "./MiniHompeyAbout";
import { MiniHomepyComment } from "./MiniHomepyComment";

MiniHomepyComment.propTypes = {};

function MiniHomepyMiddleContent({
  name,
  loginMember,
  member_id,
  topRankBoardList,
  newBoardList,
  favoriteBoardList,
  categoryOrdedBy,
  setCategoryOrdedBy,
  boardListAll,
  member,
  setSearchingKeyword,
  searchingKeyword,
  youtuberInfo,
  addYoutuber,
  setAddYoutuber,
  homepyId,
}) {
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        border="1px solid white"
        borderRadius={"10px"}
        bg={"transparent"}
        sx={{
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: "10px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "::-webkit-scrollbar-thumb": {
            background: "transparent",
            borderRadius: "10px",
          },
          ":hover::-webkit-scrollbar-thumb": {
            background: "#dcdcdc",
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
                  favoriteBoardList={favoriteBoardList}
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
              {name === "FAVORITE" && (
                <MiniHomepyFavoriteList
                  loginMember={loginMember}
                  youtuberInfo={youtuberInfo}
                  addYoutuber={addYoutuber}
                  setAddYoutuber={setAddYoutuber}
                />
              )}
              {name === "COMMENT" && (
                <MiniHomepyComment
                  loginMember={loginMember}
                  member_id={member_id}
                  homepyId={homepyId}
                />
              )}
              {name === "ABOUT" && <MiniHompeyAbout />}
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
  favoriteBoardList,
  categoryOrdedBy,
  setCategoryOrdedBy,
  boardListAll,
  member,
  setSearchingKeyword,
  searchingKeyword,
  youtuberInfo,
  addYoutuber,
  setAddYoutuber,
  homepyId,
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
          favoriteBoardList={favoriteBoardList}
          newBoardList={newBoardList}
          categoryOrdedBy={categoryOrdedBy}
          setCategoryOrdedBy={setCategoryOrdedBy}
          boardListAll={boardListAll}
          member={member}
          setSearchingKeyword={setSearchingKeyword}
          searchingKeyword={searchingKeyword}
          youtuberInfo={youtuberInfo}
          addYoutuber={addYoutuber}
          setAddYoutuber={setAddYoutuber}
          homepyId={homepyId}
        />
      )}

      <div className="barContainer">
        <div className="navigation">
          <ul>
            <li
              className="list active"
              onClick={(e) => {
                e.preventDefault();
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
              onClick={(e) => {
                e.preventDefault();
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
              onClick={(e) => {
                e.preventDefault();
                showPopup("FAVORITE");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faBookmark} />
                </span>
                <span className="text">FAVORITE</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li
              className="list"
              onClick={(e) => {
                e.preventDefault();
                showPopup("COMMENT");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faComment} />
                </span>
                <span className="text">COMMENT</span>
                <span className="circle"></span>
              </a>
            </li>{" "}
            <li
              className="list"
              onClick={() => {
                showPopup("ABOUT");
              }}
            >
              <a href="#">
                <span className="icon">
                  <FontAwesomeIcon icon={faChartPie} />
                </span>
                <span className="text">ABOUT</span>
                <span className="circle"></span>
              </a>
            </li>
            <div className="indicator"></div>
          </ul>
        </div>
      </div>
    </>
  );
}
