import { Box, Button, Flex, Heading, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";

export function Sidenav() {
  let navigate = useNavigate();

  const buttonStyles = {
    w: "100%",
    mb: 2,
    borderRadius: 0,
    backgroundColor: "rgb(53,53,53)",
    color: "white",
    _hover: {
      backgroundColor: "rgb(255,255,255)",
      color: "black",
    },
  };

  return (
    <VStack
      bg={"rgb(53,53,53)"}
      color={"white"}
      w={40}
      h={1000}
      border={"1px solid red"}
    >
      <Heading as="h4" size="md" my={"15px"}>
        관리자 페이지
      </Heading>
      <Button
        {...buttonStyles}
        leftIcon={<FontAwesomeIcon icon={faHouse} />}
        onClick={() => navigate("/admin")}
      >
        메인
      </Button>
      <Button
        {...buttonStyles}
        leftIcon={<FontAwesomeIcon icon={faUsers} />}
        onClick={() => navigate("/admin/member/list?p=1")}
      >
        회원목록
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => navigate("/admin/suspension/?p=1")}
      >
        회원정지관리
      </Button>
    </VStack>
  );
}
