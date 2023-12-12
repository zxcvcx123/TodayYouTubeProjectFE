import React, { useContext } from "react";
import { Badge, Spinner } from "@chakra-ui/react";
import { HomepyMemberContext } from "../MiniHomepy";
import "../minihomepy-styles/font.css";
export function MemberRoleBadge() {
  const { member } = useContext(HomepyMemberContext);
  const roleName = member ? member.role_name : <Spinner />;
  return (
    <>
      {roleName === "아이언" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#663300"}
          color={"white"}
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          IRON
        </Badge>
      )}
      {roleName === "브론즈" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#996600"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          BRONZE
        </Badge>
      )}
      {roleName === "실버" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#CCCCCC"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          SILVER
        </Badge>
      )}
      {roleName === "골드" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#FFCC00"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          GOLD
        </Badge>
      )}
      {roleName === "플레티넘" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#33FF33"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          PLATINUM
        </Badge>
      )}
      {roleName === "다이아몬드" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#00FFFF"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          DIAMOND
        </Badge>
      )}
      {roleName === "마스터" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#CC66FF"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          MASTER
        </Badge>
      )}
      {roleName === "그랜드마스터" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"#FF3366"}
          color="white"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          GRANDMASTER
        </Badge>
      )}
      {roleName === "챌린저" && (
        <Badge
          fontFamily={"'Song Myung', serif;"}
          fontSize={"20px"}
          backgroundColor={"black"}
          color="red"
          borderRadius={"8px"}
        >
          CHALLENGER
        </Badge>
      )}
      {roleName === "운영자" && (
        <Badge
          fontSize={"20px"}
          backgroundColor={"black"}
          color="red"
          borderRadius={"8px"}
          fontFamily={"'Song Myung', serif;"}
        >
          ADMIN
        </Badge>
      )}
    </>
  );
}

export default MemberRoleBadge;
