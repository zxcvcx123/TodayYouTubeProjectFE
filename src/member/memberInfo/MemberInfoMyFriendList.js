import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  StackDivider,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import YoutubeInfo from "../../component/YoutubeInfo";
import * as PropTypes from "prop-types";
import axios from "axios";
import BoardProfile from "../../board/BoardProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import MemberInfoFollowProfile from "./MemberInfoFollowProfile";

export function MemberInfoMyFriendList({ loginInfo }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  const [dependency, setDependency] = useState(false);
  const [searchMemberResult, setSearchMemberResult] = useState(null);
  const [followingList, setFollowingList] = useState(null);
  const [followerList, setFollowerList] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const subModal = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  let toast = useToast();
  useEffect(() => {
    if (loginInfo !== null) {
      setDependency(false);
      axios
        .get("/api/member/info/getFollowList", {
          params: {
            member_id: loginInfo.member_id,
          },
        })
        .then((response) => {
          console.log(response.data);
          setFollowerList(response.data.followerList);
          setFollowingList(response.data.followingList);
          console.log(followingList);
        });
    }
  }, [loginInfo, dependency]);

  function handleSearchMember() {
    axios
      .get("/api/member/info/searchMember", {
        params: {
          nickname: searchInput,
        },
      })
      .then((response) => {
        setSearchMemberResult(response.data);
        setSearchResult(true);
      })
      .catch((error) => {
        setSearchResult(false);
      })
      .finally(() => {
        subModal.onOpen();
      });
  }

  function handleFollow() {
    if (loginInfo.member_id !== searchMemberResult.member_id) {
      axios
        .post("/api/member/info/add/follow", {
          following_id: searchMemberResult.member_id,
          follower_id: loginInfo.member_id,
        })
        .then(() => {
          toast({
            description: searchMemberResult.nickname + " 님을 팔로우했습니다.",
            status: "success",
          });
          subModal.onClose();
          onClose();
          setDependency(true);
        })
        .catch((error) => {
          toast({
            description: "이미 팔로우한 사용자입니다",
            status: "error",
          });
          subModal.onClose();
        });
    } else {
      toast({
        description: "자신을 팔로우할 수 없습니다.",
        status: "warning",
      });
    }
  }

  function handleFollowingDelete(followingId, followerId) {
    axios
      .delete("/api/member/info/delete/follow", {
        params: { followingId: followingId, followerId: followerId },
      })
      .then(() => {
        setDependency(true);
        toast({
          description: "팔로우를 취소했습니다.",
          status: "success",
        });
      });
  }

  return (
    <>
      <Card w={"100%"} p={"20px"} boxShadow={"none"}>
        <CardBody w={"100%"}>
          <Box display={"flex"} pt={5}>
            <Box borderRight={"1px solid black"} w="50%" pl={3} pr={3}>
              <Box
                display={"flex"}
                w={"100%"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Text fontSize={"40px"} fontWeight={"bold"}>
                  팔로우
                </Text>
                <Button
                  h={"30px"}
                  pr={1}
                  pl={1}
                  bg="black"
                  color={"#dcdcdc"}
                  variant={"link"}
                  onClick={() => {
                    onOpen();
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} color="#dcdcdc" />
                  <Text ml={1}>추가</Text>
                </Button>
              </Box>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>팔로우 할 사용자 검색</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>닉네임</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="입력"
                        value={searchInput}
                        onChange={(e) => {
                          setSearchInput(e.target.value);
                        }}
                      />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={handleSearchMember}
                    >
                      검색
                    </Button>
                    <Button onClick={onClose}>취소</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <>
                <Modal isOpen={subModal.isOpen} onClose={subModal.onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>검색 결과</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {searchResult && searchMemberResult !== null ? (
                        <>
                          <Flex
                            w={"100%"}
                            flexDirection={"column"}
                            alignItems={"center"}
                          >
                            <BoardProfile
                              board_member_id={searchMemberResult.member_id}
                            />
                            <Text mt={5}>
                              {searchInput}님을 팔로우 하시겠습니까?
                            </Text>
                          </Flex>
                        </>
                      ) : (
                        <Text>해당 사용자는 존재하지 않습니다.</Text>
                      )}
                    </ModalBody>

                    <ModalFooter>
                      {searchResult && searchMemberResult !== null && (
                        <Button colorScheme="blue" onClick={handleFollow}>
                          팔로우
                        </Button>
                      )}
                      <Button mr={3} onClick={subModal.onClose}>
                        뒤로
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
              <Box display={"flex"} pt={5}>
                <Box
                  w={"220px"}
                  display={"flex"}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  fontWeight={"bold"}
                >
                  프로필
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontWeight={"bold"}
                  w={"100px"}
                >
                  추천수
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontWeight={"bold"}
                  w={"100px"}
                >
                  조회수
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  fontWeight={"bold"}
                  w={"100px"}
                >
                  게시글수
                </Box>
              </Box>
              <Box>
                {followingList !== null &&
                  followingList.map((following) => (
                    <Box
                      display={"flex"}
                      key={following.id}
                      alignItems={"center"}
                      pt={2}
                      pb={1}
                      borderBottom={"1px solid black"}
                    >
                      <Box w={"220px"}>
                        <MemberInfoFollowProfile
                          board_member_id={following.member_id}
                        />
                      </Box>

                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        w={"100px"}
                        fontWeight={"bold"}
                      >
                        {following.total_like}
                      </Box>
                      {following.total_views !== null ? (
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"100px"}
                          fontWeight={"bold"}
                        >
                          {following.total_views}
                        </Box>
                      ) : (
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"100px"}
                          fontWeight={"bold"}
                        >
                          0
                        </Box>
                      )}
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        w={"100px"}
                        fontWeight={"bold"}
                      >
                        {following.total_board}
                      </Box>
                      <Button
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        w={"60px"}
                        bg={"transparent"}
                        color={"tomato"}
                        variant={"link"}
                        onClick={() => {
                          handleFollowingDelete(
                            following.member_id,
                            loginInfo.member_id,
                          );
                        }}
                      >
                        삭제
                      </Button>
                    </Box>
                  ))}
              </Box>
            </Box>
            {/* 팔로워 리스트 -------------------------------------------------------*/}
            <Box w="50%" pl={5}>
              <Box
                display={"flex"}
                w={"100%"}
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <Text fontSize={"40px"} fontWeight={"bold"}>
                  팔로워
                </Text>
              </Box>
              <Box>
                <Box display={"flex"} pt={5}>
                  <Box
                    w={"220px"}
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    fontWeight={"bold"}
                  >
                    프로필
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontWeight={"bold"}
                    w={"100px"}
                  >
                    추천수
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontWeight={"bold"}
                    w={"100px"}
                  >
                    조회수
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    fontWeight={"bold"}
                    w={"100px"}
                  >
                    게시글수
                  </Box>
                </Box>
                <Box>
                  {followerList !== null &&
                    followerList.map((follower) => (
                      <Box
                        display={"flex"}
                        key={follower.id}
                        alignItems={"center"}
                        pt={2}
                        pb={1}
                        borderBottom={"1px solid black"}
                      >
                        <Box w={"220px"}>
                          <MemberInfoFollowProfile
                            board_member_id={follower.member_id}
                          />
                        </Box>

                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"100px"}
                          fontWeight={"bold"}
                        >
                          {follower.total_like}
                        </Box>
                        {follower.total_views !== null ? (
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            w={"100px"}
                            fontWeight={"bold"}
                          >
                            {follower.total_views}
                          </Box>
                        ) : (
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            w={"100px"}
                            fontWeight={"bold"}
                          >
                            0
                          </Box>
                        )}
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          w={"100px"}
                          fontWeight={"bold"}
                        >
                          {follower.total_board}
                        </Box>
                      </Box>
                    ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </CardBody>
        <Divider color={"gray"} />
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
