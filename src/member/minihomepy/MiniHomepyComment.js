import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Badge,
  Avatar,
  Spinner,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import YoutubeInfo from "../../component/YoutubeInfo";
import { DetectLoginContext } from "../../component/LoginProvider";
import axios from "axios";
import MemberProfile from "../MemberProfile";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons/faHouseUser";
import { useNavigate } from "react-router-dom";

export function MiniHomepyComment({ homepyId }) {
  const { loginInfo } = useContext(DetectLoginContext);
  const [commentId, setCommentId] = useState(null);
  const [editingCommentValue, setEditingCommentValue] = useState(null);
  const [isCommentEditting, setIsCommentEditting] = useState(false);
  const [isCommentAdd, setIsCommentAdd] = useState(false);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentList, setCommentList] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (loginInfo !== null) {
      setIsCommentAdd(false);

      axios
        .get("/api/member/minihomepy/getCommentList", {
          params: {
            homepy_id: homepyId,
          },
        })
        .then((response) => {
          setCommentList(response.data.commentList);
        });
    }
  }, [isCommentAdd, loginInfo]);
  function handleAddComment() {
    setIsSubmitting(true);
    axios
      .post("/api/member/minihomepy/addComment", {
        homepy_id: homepyId,
        member_id: loginInfo.member_id,
        comment: comment,
        image_url: loginInfo.image_url,
        role_name: loginInfo.role_name,
        nickname: loginInfo.nickname,
      })
      .then(() => {
        setIsCommentAdd(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleCommentDelete(id) {
    setIsSubmitting(true);

    axios
      .delete("/api/member/minihomepy/comment/delete", {
        params: {
          id: id,
        },
      })
      .finally(() => {
        setIsCommentAdd(true);
        setIsSubmitting(false);
      });
  }

  function handleEditComment(id) {
    axios
      .patch("/api/member/minihomepy/comment/update", {
        id: id,
        comment: editingCommentValue,
      })
      .finally(() => {
        setIsCommentAdd(true);
      });
  }

  return (
    <>
      <Text
        fontFamily={"'Jua', sans-serif"}
        pt={10}
        color={"white"}
        fontSize={"30px"}
      >
        방명록
      </Text>
      <Box
        w={"100%"}
        h={"100%"}
        mt={5}
        pt={10}
        bg="transparent"
        maxHeight={"100%"}
        fontFamily={"'Jua', sans-serif"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box
          w={"90%"}
          h={"250px"}
          borderRadius={"20px"}
          bg=" rgba( 255, 255, 255, 0.1 )"
          minWidth={"650px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          pr={"70px"}
          mb={5}
        >
          <Box mr={"50px"} ml={"30px"}>
            {loginInfo !== null ? (
              <Avatar
                minWidth="200px"
                minHeght="200px"
                w={"200px"}
                h={"200px"}
                borderRadius={"20px"}
                src={loginInfo.image_url}
              />
            ) : (
              <Avatar
                minWidth="240px"
                minHeght="160px"
                w={"240px"}
                h={"160px"}
                borderRadius={"50px"}
              />
            )}
          </Box>
          <FormControl>
            <Flex w={"100%"} flexDirection="column" alignItems={"flex-end"}>
              <Textarea
                w="100%"
                placeholder="방명록을 남겨주세요(최대 500자)"
                maxLength={"499"}
                border={"1px solid white"}
                h={"150px"}
                mb={2}
                color={"#dcdcdc"}
                maxHieght={"150px"}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              {isSubmitting ? (
                <Spinner />
              ) : (
                <Button
                  fontSize={"20px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={handleAddComment}
                  bg={"transparent"}
                  variant={"link"}
                  color={"#dcdcdc"}
                >
                  등록
                </Button>
              )}
            </Flex>
          </FormControl>
        </Box>
        {commentList !== null ? (
          commentList.map((comments) => (
            <Box
              p={"15px"}
              w="80%"
              bgGradient="linear(to right, black,transparent)"
              borderRadius={"20px"}
              key={comments.id}
              mt={1.5}
              mb={1.5}
            >
              <Flex w="100%" alignItems={"center"}>
                <Box w={"100%"}>
                  <Flex alignItems={"center"} w={"100%"}>
                    <Box
                      borderRadius={"20px"}
                      mr={5}
                      w={"100%"}
                      display={"flex"}
                      color={"#dcdcdc"}
                    >
                      <Avatar
                        src={comments.image_url}
                        borderRadius={"20px"}
                        w={"160px"}
                        minWidth={"160px"}
                        h={"160px"}
                        minHeight={"160px"}
                        mr={4}
                      />
                      <Box display={"flex"} w={"100%"} flexDirection={"column"}>
                        <Box
                          display={"flex"}
                          w={"100%"}
                          justifyContent={"space-between"}
                          mb={3}
                        >
                          <Box display={"flex"}>
                            <Menu size="sm" variant="link">
                              <MenuButton>
                                <FontAwesomeIcon icon={faHouseUser} />
                              </MenuButton>
                              <MenuList bg={"black"}>
                                <MenuItem
                                  bg={"black"}
                                  onClick={() => {
                                    navigate(
                                      "/member/minihomepy/" +
                                        comments.member_id,
                                    );
                                    window.location.reload();
                                  }}
                                >
                                  미니홈피로 이동
                                </MenuItem>
                              </MenuList>
                            </Menu>
                            <Box mr={1} ml={3}>
                              {comments.nickname}
                            </Box>
                            <Box>
                              {" "}
                              {comments.role_name === "아이언" && (
                                <Badge
                                  backgroundColor={"#663300"}
                                  color={"white"}
                                  borderRadius={"8px"}
                                >
                                  IRON
                                </Badge>
                              )}
                              {comments.role_name === "브론즈" && (
                                <Badge
                                  backgroundColor={"#996600"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  BRONZE
                                </Badge>
                              )}
                              {comments.role_name === "실버" && (
                                <Badge
                                  backgroundColor={"#CCCCCC"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  SILVER
                                </Badge>
                              )}
                              {comments.role_name === "골드" && (
                                <Badge
                                  backgroundColor={"#FFCC00"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  GOLD
                                </Badge>
                              )}
                              {comments.role_name === "플레티넘" && (
                                <Badge
                                  backgroundColor={"#33FF33"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  PLATINUM
                                </Badge>
                              )}
                              {comments.role_name === "다이아몬드" && (
                                <Badge
                                  backgroundColor={"#00FFFF"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  DIAMOND
                                </Badge>
                              )}
                              {comments.role_name === "마스터" && (
                                <Badge
                                  backgroundColor={"#CC66FF"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  MASTER
                                </Badge>
                              )}
                              {comments.role_name === "그랜드마스터" && (
                                <Badge
                                  backgroundColor={"#FF3366"}
                                  color="white"
                                  borderRadius={"8px"}
                                >
                                  GRANDMASTER
                                </Badge>
                              )}
                              {comments.role_name === "챌린저" && (
                                <Badge
                                  backgroundColor={"black"}
                                  color="red"
                                  borderRadius={"8px"}
                                >
                                  CHALLENGER
                                </Badge>
                              )}
                              {comments.role_name === "운영자" && (
                                <Badge
                                  backgroundColor={"black"}
                                  color="red"
                                  borderRadius={"8px"}
                                >
                                  ADMIN
                                </Badge>
                              )}
                            </Box>
                          </Box>
                          <Box display={"flex"}>
                            {loginInfo.member_id === comments.member_id && (
                              <Box>
                                <Button
                                  color={"#dcdcdc"}
                                  display="inline"
                                  variant={"link"}
                                  bg={"transparent"}
                                  onClick={() => {
                                    setCommentId(comments.id);
                                    setIsCommentEditting(true);
                                    setEditingCommentValue(comments.comment);
                                  }}
                                >
                                  수정
                                </Button>
                                {isSubmitting ? (
                                  <Spinner />
                                ) : (
                                  <Button
                                    color={"#dcdcdc"}
                                    display="inline"
                                    variant={"link"}
                                    bg={"transparent"}
                                    onClick={() => {
                                      handleCommentDelete(comments.id);
                                    }}
                                  >
                                    삭제
                                  </Button>
                                )}
                              </Box>
                            )}
                            <Box ml={3}>{comments.ago}</Box>
                          </Box>
                        </Box>
                        {commentId === comments.id ? (
                          isCommentEditting ? (
                            <Box
                              w="100%"
                              display={"flex"}
                              flexDirection="column"
                              alignItems={"flex-end"}
                            >
                              <Textarea
                                w="100%"
                                maxLength={"499"}
                                border={"1px solid white"}
                                color={"#dcdcdc"}
                                value={editingCommentValue}
                                onChange={(e) => {
                                  setEditingCommentValue(e.target.value);
                                }}
                                mb={2}
                              />
                              <Box>
                                <Button
                                  bg={"transparent"}
                                  variant={"link"}
                                  color={"#dcdcdc"}
                                  onClick={() => {
                                    setIsCommentEditting(false);
                                    handleEditComment(comments.id);
                                  }}
                                >
                                  저장
                                </Button>
                                <Button
                                  bg={"transparent"}
                                  variant={"link"}
                                  color={"#dcdcdc"}
                                  onClick={() => {
                                    setIsCommentEditting(false);
                                  }}
                                >
                                  취소
                                </Button>
                              </Box>
                            </Box>
                          ) : (
                            <Box>{comments.comment}</Box>
                          )
                        ) : (
                          <Box>{comments.comment}</Box>
                        )}
                      </Box>
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
