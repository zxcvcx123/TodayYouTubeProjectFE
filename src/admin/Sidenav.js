import { Button, Heading, VStack, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function Sidenav() {
  let navigate = useNavigate();

  return (
    <VStack
      bg={"black"}
      color={"white"}
      w={40}
      h={1000}
      border={"1px solid red"}
    >
      <Heading as="h4" size="md">
        관리자 페이지
      </Heading>
      <Button w={"70%"} onClick={() => navigate("/admin")}>
        메인
      </Button>
      <Button w={"70%"} onClick={() => navigate("/admin/member/list?p=1")}>
        회원목록
      </Button>
      <Button w={"70%"} onClick={() => navigate("/admin/suspension")}>
        회원정지관리
      </Button>
      <Button w={"70%"}>페이지2</Button>
    </VStack>
  );
}
