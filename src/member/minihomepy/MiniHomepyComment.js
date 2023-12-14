import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import YoutubeInfo from "../../component/YoutubeInfo";
import { DetectLoginContext } from "../../component/LoginProvider";
import axios from "axios";

export function MiniHomepyComment({ homepyId }) {
  const { loginInfo } = useContext(DetectLoginContext);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(null);
  useEffect(() => {
    axios.get("/api/member/minihomepy/getCommentList", {
      homepy_id: homepyId,
    });
  }, []);
  function handleAddComment() {
    axios.post("/api/member/minihomepy/addComment", {
      homepy_id: homepyId,
      member_id: loginInfo.member_id,
      comment: comment,
      image_url: loginInfo.image_url,
    });
  }

  return (
    <>
      <Text color={"white"} fontSize={"30px"}>
        방명록
      </Text>
      <Box
        w={"100%"}
        h={"100%"}
        mt={5}
        pt={10}
        border={"1px solid white"}
        bg="transparent"
        maxHeight={"100%"}
        fontFamily={"'Jua', sans-serif"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box
          border={"1px solid tomato"}
          w={"100%"}
          h={"250px"}
          minWidth={"650px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box mr={"50px"} ml={"30px"}>
            {loginInfo !== null ? (
              <Image
                minWidth="200px"
                minHeght="200px"
                w={"200px"}
                h={"200px"}
                borderRadius={"110px"}
                src={loginInfo.image_url}
              />
            ) : (
              <Image
                minWidth="240px"
                minHeght="160px"
                w={"240px"}
                h={"160px"}
                borderRadius={"50px"}
              />
            )}
          </Box>
          <FormControl>
            <Flex w={"100%"} alignItems={"flex-end"}>
              <Textarea
                w="500px"
                placeholder="블라블라브라"
                border={"1px solid white"}
                h={"150px"}
                maxHieght={"150px"}
                mr={5}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <Button
                w={"60px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                onClick={handleAddComment}
              >
                저장
              </Button>
            </Flex>
          </FormControl>
        </Box>
      </Box>
    </>
  );
}
