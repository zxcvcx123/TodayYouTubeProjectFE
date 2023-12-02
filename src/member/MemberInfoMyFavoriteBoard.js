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

            <Card mt={"5"}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      아이디
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {loginInfo.member_id}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      닉네임
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {loginInfo.nickname}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      이메일
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {loginInfo.email}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      등급
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {loginInfo.role_name}
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      내가 받은 좋아요
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {loginInfo.total_like}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </CardBody>
        <Divider color={"gray"} />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              변경
            </Button>
            <Button variant="ghost" colorScheme="blue">
              삭제
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
