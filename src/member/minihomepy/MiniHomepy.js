import React, { createContext, useContext, useEffect, useState } from "react";
import "./minihomepy-styles/snowflake.css";
import { Box, useToast } from "@chakra-ui/react";
import { MiniHomepyMiddleContainer } from "./MiniHomepyMiddleContainer";
import "./minihomepy-styles/reset.css";
import Snowflake from "./Snowflake";
import { DetectLoginContext } from "../../component/LoginProvider";
import { MiniHomepyLeftContainer } from "./MiniHomepyLeftContainer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MiniHomepyRightContainer } from "./MiniHomepyRightContainer";

export let HomepyMemberContext = createContext(null);

export function MiniHomepy(props) {
  const { loginInfo } = useContext(DetectLoginContext);
  const [member, setMember] = useState();
  const [miniHomepyInfo, setMiniHomepyInfo] = useState(null);
  const [introduce, setIntroduce] = useState("");
  const [todayViews, setTodayViews] = useState(null);
  const [totalViews, setTotalViews] = useState(null);
  const [bgm, setBgm] = useState(null);
  const { member_id } = useParams();
  let navigate = useNavigate();
  let toast = useToast();
  // 각 링크에 대한 팝업 상태
  const grantType = localStorage.getItem("grantType");
  const accessToken = localStorage.getItem("accessToken");
  const loginMember = localStorage.getItem("memberInfo");

  useEffect(() => {
    axios
      .get("/api/member/minihomepy/member_id/" + member_id, {
        headers: {
          Authorization: `${grantType} ${accessToken}`,
        },
      })
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

  useEffect(() => {
    axios
      .get("/api/member/minihomepy/member_id/info/" + member_id, {
        headers: {
          Authorization: `${grantType} ${accessToken}`,
        },
      })
      .then((response) => {
        setIntroduce(response.data.introduce);
        setTodayViews(response.data.today_visitors);
        setTotalViews(response.data.total_visitors);
        setBgm(response.data.bgm_link);
        console.log(response.data.bgm_link);
        console.log(bgm);
      })
      .catch((error) => {
        console.log(bgm);
      });
  }, []);

  useEffect(() => {
    if (loginInfo !== null) {
      axios.post("/api/member/minihomepy/view", {
        member_id: member_id,
        login_member_id: loginMember,
      });
    }
  }, []);

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
          bgGradient="linear(    to top,
    #283e51,
    #0a2342)"
          position={"relative"}
          overflow={"hidden"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Snowflake />
          <Box
            w={"100%"}
            h={"100%"}
            minWidth={"1200px"}
            minHeight={"700px"}
            zIndex={"10"}
            borderRadius={"20px"}
            backgroundColor={"transparent"}
            backdropFilter={"blur(2px)"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              w={"25%"}
              h={"95%"}
              borderRadius={"20px"}
              backgroundColor={"transparent"}
            >
              <MiniHomepyLeftContainer
                member={member}
                miniHomepyInfo={miniHomepyInfo}
                introduce={introduce}
                setIntroduce={setIntroduce}
              />
            </Box>
            <Box
              w={"540px"}
              h={"95%"}
              minWidth={"540px"}
              zIndex={"10"}
              borderRadius={"20px"}
              backgroundColor={"transparent"}
              backdropFilter={"blur(10px)"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <MiniHomepyMiddleContainer />
            </Box>
            <Box
              w={"25%"}
              h={"95%"}
              borderRadius={"20px"}
              backgroundColor={"red"}
            >
              <MiniHomepyRightContainer
                todayViews={todayViews}
                totalViews={totalViews}
                videoId={videoId}
                bgmOpts={bgmOpts}
              />
            </Box>
          </Box>
        </Box>
      </HomepyMemberContext.Provider>
    </>
  );
}

export default MiniHomepy;
