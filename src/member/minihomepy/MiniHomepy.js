import React, { createContext, useContext, useEffect, useState } from "react";
import "./minihomepy-styles/snowflake.css";
import { Box, useToast } from "@chakra-ui/react";
import { MiniHomepyMiddleContainer } from "./MiniHomepyMiddleContainer";
import "./minihomepy-styles/reset.css";
import Snowflake from "./Snowflake";
import { DetectLoginContext } from "../../component/LoginProvider";
import { MiniHomepyLeftContainer } from "./MiniHomepyLeftContainer";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { MiniHomepyRightContainer } from "./MiniHomepyRightContainer";
import { config } from "../config/apikey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowman } from "@fortawesome/free-solid-svg-icons/faSnowman";

export let HomepyMemberContext = createContext(null);

export function MiniHomepy(props) {
  const API_KEY = config.apikey;
  // 로그인 정보
  const { loginInfo } = useContext(DetectLoginContext);
  // 미니홈피 정보
  const [member, setMember] = useState();
  const [miniHomepyInfo, setMiniHomepyInfo] = useState(null);
  const [introduce, setIntroduce] = useState("");
  const [homepyId, setHomepyId] = useState(null);
  const [todayViews, setTodayViews] = useState(null);
  const [totalViews, setTotalViews] = useState(null);
  const [bgm, setBgm] = useState(null);
  const [addYoutuber, setAddYoutuber] = useState("");
  const [isYoutuberDeleted, setIsYoutuberDeleted] = useState(false);
  const { member_id } = useParams();
  // 게시글 정보 가져오기
  const [topRankBoardList, setTopRankBoardList] = useState(null);
  const [newBoardList, setNewBoardList] = useState(null);
  const [favoriteBoardList, setFavoriteBoardList] = useState(null);
  const [boardListAll, setBoardListAll] = useState(null);
  const [categoryOrdedBy, setCategoryOrdedBy] = useState("latest"); // 정렬 기준
  const [params] = useSearchParams();
  const [searchingKeyword, setSearchingKeyword] = useState("");
  // 구독 정보 가져오기
  const [youtuberInfo, setYoutuberInfo] = useState(null);

  let navigate = useNavigate();
  let toast = useToast();

  // 로그인 정보
  const loginMember = loginInfo !== null ? loginInfo.member_id : "";
  let originBgmValue = "";

  /*미니홈피 정보*/
  useEffect(() => {
    axios
      .get("/api/member/minihomepy/member_id/" + member_id)
      .then((response) => {
        setMember((prevState) => ({
          ...prevState,
          member_id: response.data.member_id,
          nickname: response.data.nickname,
          birth_date: response.data.birth_date,
          gender: response.data.gender,
          role_name: response.data.role_name,
          total_like: response.data.total_like,
          total_board: response.data.total_board,
          total_comment: response.data.total_comment,
          total_views: response.data.total_views,
          image_url: response.data.url,
        }));
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 400) {
            toast({
              description: "존재하지 않는 홈피입니다",
              status: "error",
            });
            navigate("/");
          }
          if (error.response.status === 403) {
            toast({
              description: "로그인 후 접속 가능합니다",
              status: "warning",
            });
            navigate("/member/login");
          } else {
            toast({
              description: "문제가 발생하였습니다. 다시 시도해주세요",
              status: "warning",
            });
            navigate("/");
          }
        }
      });
  }, []);

  /* 미니 홈피 콘텐츠 정보 */
  useEffect(() => {
    axios
      .get("/api/member/minihomepy/member_id/info/" + member_id)
      .then((response) => {
        setIntroduce(response.data.introduce);
        setTodayViews(response.data.today_visitors);
        setTotalViews(response.data.total_visitors);
        setBgm(response.data.bgm_link);
        setHomepyId(response.data.homepy_id);
        originBgmValue = response.data.bgm_link;
      })
      .catch((error) => {
        console.log(bgm);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/member/minihomepy/boardlist/member_id/" + member_id)
      .then((response) => {
        setTopRankBoardList(response.data.topBoardList);
        setNewBoardList(response.data.newBoardList);
        setFavoriteBoardList(response.data.favoriteBoardList);
        console.log(topRankBoardList);
      });
  }, []);

  // MinihomepyList 정렬 및 검색
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api/member/minihomepy/boardlist/all?",
          {
            params: {
              member_id: member_id,
              ob: categoryOrdedBy,
              sk: searchingKeyword,
            },
          },
        );
        setBoardListAll(response.data.boardListAll);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchingKeyword) {
      fetchData();
    }
    if (categoryOrdedBy) {
      fetchData();
    }
  }, [searchingKeyword, categoryOrdedBy]);

  /* 방문자 수 정보 */
  useEffect(() => {
    if (loginInfo !== null) {
      axios
        .post("/api/member/minihomepy/view", {
          member_id: member_id,
          login_member_id: loginInfo.member_id,
        })
        .catch(() => {
          toast({
            description: "존재하지 않는 회원입니다.",
            status: "warning",
          });
          navigate("/");
        });
    }
  }, [loginInfo]);

  useEffect(() => {
    setIsYoutuberDeleted(false);
    axios
      .get("/api/member/minihomepy/youtuberinfo/" + member_id)
      .then((response) => {
        setYoutuberInfo(response.data.youtuberInfo);
      });
  }, [addYoutuber, isYoutuberDeleted]);

  const [videoId, setVideoId] = useState(null);
  useEffect(() => {
    if (bgm !== null) {
      if (bgm && bgm.trim() !== "") {
        const bgmIdMatch = bgm.match(
          /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        );
        if (bgmIdMatch && bgmIdMatch[4]) {
          setVideoId(bgmIdMatch[4]);
        }
      }
    }
  }, [bgm]);

  const bgmOpts = {
    height: "220px",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      loop: 1,
      disablekb: 0,
    },
  };
  return (
    <>
      <HomepyMemberContext.Provider value={{ member, miniHomepyInfo }}>
        <Box
          w={"100vw"}
          h={"100vh"}
          // bgGradient="linear( to top,#283e51,#0a2342)"
          position={"relative"}
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          backdropFilter={"blur(2px)"}
          bgGradient="linear(#0a2342, #131862,#2e4482,#546bab,	#87889c)"
        >
          <Box
            position={"absolute"}
            w={"110%"}
            minWidth={"2000px"}
            h={"350px"}
            bg={"white"}
            borderRadius={"50%"}
            top="85%"
            boxShadow={"-500px -10px #dcdcdc, 700px -40px #e9ecef"}
          ></Box>
          <Snowflake />
          <Box
            w={"100%"}
            h={"90%"}
            minWidth={"1200px"}
            minHeight={"600px"}
            zIndex={"10"}
            borderRadius={"20px"}
            backgroundColor={"transparent"}
            display={"flex"}
            alignItems={"center"}
            backdropFilter={"blur(2px)"}
          >
            <Box
              w={"25%"}
              h={"100%"}
              borderRadius={"20px"}
              backgroundColor={"transparent"}
            >
              <MiniHomepyLeftContainer
                todayViews={todayViews}
                totalViews={totalViews}
                member={member}
                miniHomepyInfo={miniHomepyInfo}
                introduce={introduce}
                setIntroduce={setIntroduce}
              />
            </Box>
            <Box
              w={"70%"}
              h={"100%"}
              minWidth={"800px"}
              zIndex={"10"}
              borderRadius={"20px"}
              bgGradient="linear(white, transparent,  transparent, transparent,transparent,transparent,transparent,transparent,transparent,transparent,transparent)"
              display={"flex"}
              justifyContent={"flex-end"}
              fontFamily={"'Song Myung', serif;"}
              mr={"50px"}
            >
              <MiniHomepyMiddleContainer
                loginMember={loginMember}
                member_id={member_id}
                topRankBoardList={topRankBoardList}
                newBoardList={newBoardList}
                favoriteBoardList={favoriteBoardList}
                categoryOrdedBy={categoryOrdedBy}
                setCategoryOrdedBy={setCategoryOrdedBy}
                boardListAll={boardListAll}
                member={member}
                setSearchingKeyword={setSearchingKeyword}
                searchingKeyword={searchingKeyword}
                youtuberInfo={youtuberInfo}
                addYoutuber={addYoutuber}
                setAddYoutuber={setAddYoutuber}
                setIsYoutuberDeleted={setIsYoutuberDeleted}
                homepyId={homepyId}
              />
            </Box>
          </Box>
          <Box
            w={"20%"}
            h={"100%"}
            borderRadius={"20px"}
            backgroundColor={"transparent"}
            backdropFilter={"blur(2px)"}
          >
            <MiniHomepyRightContainer
              videoId={videoId}
              bgmOpts={bgmOpts}
              loginMember={loginMember}
              member_id={member_id}
              setBgm={setBgm}
              bgm={bgm}
              originBgmValue={originBgmValue}
            />
          </Box>
        </Box>
      </HomepyMemberContext.Provider>
    </>
  );
}

export default MiniHomepy;
