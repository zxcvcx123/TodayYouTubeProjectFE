import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser } from "@fortawesome/free-solid-svg-icons/faHouseUser";
import { useNavigate } from "react-router-dom";
import { DetectLoginContext } from "../component/LoginProvider";

function BoardProfile({ board_member_id, board_id }) {
  const { loginInfo } = useContext(DetectLoginContext);
  let navigate = useNavigate();
  const [reportReason, setReportReason] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [dependency, setDependency] = useState(false);
  const [boardProfile, setBoardProfile] = useState(null);
  const [isLoginMemberReported, setIsLoginMemberReported] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let memberImage = boardProfile !== null ? boardProfile.url : "";
  let roleName = boardProfile !== null ? boardProfile.role_name : "";
  let nickName = boardProfile !== null ? boardProfile.nickname : "";
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    if (board_member_id !== null) {
      setDependency(false);
      axios
        .get("/api/member/minihomepy/member_id/" + board_member_id)
        .then((response) => {
          setBoardProfile(response.data);
        });

      if (loginInfo !== null) {
        axios
          .get("/api/member/info/isMemberFollowing", {
            params: {
              loginId: loginInfo.member_id,
              memberId: board_member_id,
            },
          })
          .then((response) => {
            setIsFollowing(response.data);
          });
      }
      if (board_id !== null && board_member_id !== null && loginInfo !== null) {
        axios
          .get("/api/member/report", {
            params: {
              reporter_id: loginInfo.member_id,
              reported_id: board_member_id,
              board_id: board_id,
            },
          })
          .then((response) => {
            setIsLoginMemberReported(response.data);
          });
      }
    }
  }, [board_member_id, dependency]);

  function handleAddFollower() {
    if (loginInfo.member_id !== board_member_id) {
      axios
        .post("/api/member/info/add/follow", {
          following_id: board_member_id,
          follower_id: loginInfo.member_id,
        })
        .then(() => {
          toast({
            description: board_member_id + " 님을 팔로우했습니다.",
            status: "success",
          });
          setDependency(true);
        })
        .catch((error) => {
          toast({
            description: "이미 팔로우한 사용자입니다",
            status: "error",
          });
        });
    } else {
      toast({
        description: "자신을 팔로우할 수 없습니다.",
        status: "warning",
      });
    }
  }

  function handleDeleteFollower() {
    axios
      .delete("/api/member/info/delete/follow", {
        params: {
          followingId: board_member_id,
          followerId: loginInfo.member_id,
        },
      })
      .then(() => {
        setDependency(true);
        toast({
          description: "팔로우를 취소했습니다.",
          status: "success",
        });
      });
  }

  function handleMemberReport() {
    setIsSubmitting(true);
    axios
      .post("/api/member/report", {
        reporter_id: loginInfo.member_id,
        reported_id: board_member_id,
        report_reason: reportReason,
        board_id: board_id,
      })
      .then(() => {
        toast({
          description: "신고가 접수되었습니다.",
          status: "success",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        onClose();
        setIsLoginMemberReported(false);
      });
  }

  return (
    <>
      <Menu size="sm" variant="link">
        <MenuButton>
          <HStack>
            <Flex width={"200px"}>
              <Avatar src={memberImage} />
              <Box ml="3">
                {roleName === "아이언" && (
                  <Badge
                    backgroundColor={"#663300"}
                    color={"white"}
                    borderRadius={"8px"}
                  >
                    IRON
                  </Badge>
                )}
                {roleName === "브론즈" && (
                  <Badge
                    backgroundColor={"#996600"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    BRONZE
                  </Badge>
                )}
                {roleName === "실버" && (
                  <Badge
                    backgroundColor={"#CCCCCC"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    SILVER
                  </Badge>
                )}
                {roleName === "골드" && (
                  <Badge
                    backgroundColor={"#FFCC00"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    GOLD
                  </Badge>
                )}
                {roleName === "플레티넘" && (
                  <Badge
                    backgroundColor={"#33FF33"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    PLATINUM
                  </Badge>
                )}
                {roleName === "다이아몬드" && (
                  <Badge
                    backgroundColor={"#00FFFF"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    DIAMOND
                  </Badge>
                )}
                {roleName === "마스터" && (
                  <Badge
                    backgroundColor={"#CC66FF"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    MASTER
                  </Badge>
                )}
                {roleName === "그랜드마스터" && (
                  <Badge
                    backgroundColor={"#FF3366"}
                    color="white"
                    borderRadius={"8px"}
                  >
                    GRANDMASTER
                  </Badge>
                )}
                {roleName === "챌린저" && (
                  <Badge
                    backgroundColor={"black"}
                    color="red"
                    borderRadius={"8px"}
                  >
                    CHALLENGER
                  </Badge>
                )}
                {roleName === "운영자" && (
                  <Badge
                    backgroundColor={"black"}
                    color="red"
                    borderRadius={"8px"}
                  >
                    ADMIN
                  </Badge>
                )}
                <Text fontWeight="bold">{nickName}</Text>
              </Box>
            </Flex>
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              navigate("/member/minihomepy/" + board_member_id);
              window.location.reload();
            }}
          >
            미니홈피 방문
          </MenuItem>
          {board_member_id !== null ? (
            isFollowing ? (
              <MenuItem
                onClick={() => {
                  handleAddFollower();
                }}
              >
                팔로우 하기
              </MenuItem>
            ) : board_member_id !== null &&
              loginInfo !== null &&
              loginInfo.member_id !== board_member_id ? (
              <MenuItem
                onClick={() => {
                  handleDeleteFollower();
                }}
              >
                팔로우 취소
              </MenuItem>
            ) : (
              <></>
            )
          ) : (
            <MenuItem>
              <Spinner />
            </MenuItem>
          )}
          {loginInfo !== null &&
            isLoginMemberReported !== null &&
            loginInfo.member_id !== board_member_id &&
            (isLoginMemberReported ? (
              <MenuItem onClick={onOpen}>신고</MenuItem>
            ) : (
              <MenuItem>신고완료 (처리중)</MenuItem>
            ))}
          {/* 신고 모달창------------------------------------------------*/}
          <Modal isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>신고</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel fontWeight={"bold"}>아이디</FormLabel>
                  <Input
                    readOnly={"readonly"}
                    bg={"#f5f5f5"}
                    value={board_member_id}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel fontWeight={"bold"}>신고 사유</FormLabel>
                  <Textarea
                    maxLength={501}
                    h="250px"
                    placeholder="신고 사유를 입력해주세요.(최대 500자)"
                    onChange={(e) => {
                      setReportReason(e.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <Button colorScheme="red" mr={3} onClick={handleMemberReport}>
                    접수
                  </Button>
                )}
                <Button onClick={onClose}>취소</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </MenuList>
      </Menu>
    </>
  );
}

export default BoardProfile;
