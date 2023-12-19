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
import { DetectLoginContext } from "../../component/LoginProvider";
import { useNavigate } from "react-router-dom";

function MemberInfoFollowProfile({ board_member_id }) {
  const { loginInfo } = useContext(DetectLoginContext);
  let navigate = useNavigate();
  const [dependency, setDependency] = useState(false);
  const [boardProfile, setBoardProfile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let memberImage = boardProfile !== null ? boardProfile.url : "";
  let roleName = boardProfile !== null ? boardProfile.role_name : "";
  let nickName = boardProfile !== null ? boardProfile.nickname : "";
  const toast = useToast();

  useEffect(() => {
    if (board_member_id !== null) {
      setDependency(false);
      axios
        .get("/api/member/minihomepy/member_id/" + board_member_id)
        .then((response) => {
          setBoardProfile(response.data);
        });
    }
  }, [board_member_id, dependency]);

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
        </MenuList>
      </Menu>
    </>
  );
}
export default MemberInfoFollowProfile;
