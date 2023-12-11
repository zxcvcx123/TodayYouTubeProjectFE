import {Button, Heading, VStack} from "@chakra-ui/react";
import React from "react";

export function Sidenav() {
  return (
    <VStack bg={"black"} color={"white"} w={40} h={500} border={"1px solid red"}>
      <Heading as='h4' size='md'>관리자 페이지</Heading>
      <Button>메인</Button>
      <Button>페이지1</Button>
      <Button>페이지2</Button>
    </VStack>
  );
}