import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";

export function MemberInfoMyFavoriteBoard({ loginInfo }) {
  return (
    <>
      <Card w={"80%"} p={"20px"} boxShadow={"none"}>
        <CardBody>
          <Stack mt="6" spacing="3">
            <Heading size="xl">내가 좋아요 한 글</Heading>
          </Stack>
        </CardBody>
        <Divider color={"gray"} />
        <CardFooter></CardFooter>
      </Card>
    </>
  );
}
