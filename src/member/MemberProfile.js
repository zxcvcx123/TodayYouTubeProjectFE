import React, { useContext } from "react";
import { DetectLoginContext } from "../component/LoginProvider";
import { Avatar, Badge, Box, Flex, HStack, Text } from "@chakra-ui/react";

function MemberProfile(props) {
  const { loginInfo } = useContext(DetectLoginContext);
  const memberImage = loginInfo.image_url;
  console.log(memberImage);
  return (
    <>
      <HStack>
        <Flex width={"200px"}>
          <Avatar src={memberImage} />
          <Box ml="3">
            {loginInfo.role_name === "아이언" && (
              <Badge
                backgroundColor={"#663300"}
                color={"white"}
                borderRadius={"8px"}
              >
                IRON
              </Badge>
            )}
            {loginInfo.role_name === "브론즈" && (
              <Badge
                backgroundColor={"#996600"}
                color="white"
                borderRadius={"8px"}
              >
                BRONZE
              </Badge>
            )}
            {loginInfo.role_name === "실버" && (
              <Badge
                backgroundColor={"#CCCCCC"}
                color="white"
                borderRadius={"8px"}
              >
                SILVER
              </Badge>
            )}
            {loginInfo.role_name === "골드" && (
              <Badge
                backgroundColor={"#FFCC00"}
                color="white"
                borderRadius={"8px"}
              >
                GOLD
              </Badge>
            )}
            {loginInfo.role_name === "플레티넘" && (
              <Badge
                backgroundColor={"#33FF33"}
                color="white"
                borderRadius={"8px"}
              >
                PLATINUM
              </Badge>
            )}
            {loginInfo.role_name === "다이아몬드" && (
              <Badge
                backgroundColor={"#00FFFF"}
                color="white"
                borderRadius={"8px"}
              >
                DIAMOND
              </Badge>
            )}
            {loginInfo.role_name === "마스터" && (
              <Badge
                backgroundColor={"#CC66FF"}
                color="white"
                borderRadius={"8px"}
              >
                MASTER
              </Badge>
            )}
            {loginInfo.role_name === "그랜드마스터" && (
              <Badge
                backgroundColor={"#FF3366"}
                color="white"
                borderRadius={"8px"}
              >
                GRANDMASTER
              </Badge>
            )}
            {loginInfo.role_name === "챌린저" && (
              <Badge backgroundColor={"black"} color="red" borderRadius={"8px"}>
                CHALLENGER
              </Badge>
            )}
            {loginInfo.role_name === "운영자" && (
              <Badge backgroundColor={"black"} color="red" borderRadius={"8px"}>
                ADMIN
              </Badge>
            )}
            <Text fontWeight="bold"
                  style={{ fontFamily: "Nanum Gothic" }}
            >{loginInfo.nickname}</Text>
          </Box>
        </Flex>
      </HStack>
    </>
  );
}

export default MemberProfile;
