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
    axios
      .get("/api/member/minihomepy/getCommentList", {
        params: {
          homepy_id: homepyId,
        },
      })
      .then((response) => {
        setCommentList(response.data.commentList);
      });
  }, []);
  function handleAddComment() {
    axios.post("/api/member/minihomepy/addComment", {
      homepy_id: homepyId,
      member_id: loginInfo.member_id,
      comment: comment,
      image_url: loginInfo.image_url,
      role_name: loginInfo.role_name,
      nickname: loginInfo.nickname,
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
        {commentList !== null ? (
          commentList.map((comments) => (
            <Box
              p={"15px"}
              w="80%"
              bg=" rgba( 255, 255, 255, 0.1 )"
              borderRadius={"20px"}
              key={comments.id}
              mt={1.5}
              mb={1.5}
            >
              <Flex w="80%" alignItems={"center"}>
                <Box>
                  <Flex alignItems={"center"}>
                    <Box borderRadius={"20px"} mr={5}>
                      <Image
                        src={comments.image_url}
                        borderRadius={"80px"}
                        w={"160px"}
                        minWidth={"160px"}
                        h={"160px"}
                        minHeight={"160px"}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
