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

export let HomepyMemberContext = createContext(null);

export function MiniHomepy(props) {
  const { loginInfo } = useContext(DetectLoginContext);
  const [member, setMember] = useState();
  const [miniHomepyInfo, setMiniHomepyInfo] = useState(null);
  const [introduce, setIntroduce] = useState("");
  const { member_id } = useParams();
  let navigate = useNavigate();
  let toast = useToast();
  // 각 링크에 대한 팝업 상태

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
        toast({
          description: "존재하지 않는 홈피입니다",
          status: "error",
        });
        navigate("/");
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/member/minihomepy/member_id/info/" + member_id)
      .then((response) => {
        setIntroduce(response.data.introduce);
        console.log(miniHomepyInfo);
      });
  }, []);

  return (
    <>
      <HomepyMemberContext.Provider value={{ member, miniHomepyInfo }}>
        <Box
          w={"100vw"}
          h={"100vh"}
          bgGradient="linear(    to top,
    #283e51,
    #0a2342)"
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
            ></Box>
          </Box>
        </Box>
      </HomepyMemberContext.Provider>
    </>
  );
}

export default MiniHomepy;
