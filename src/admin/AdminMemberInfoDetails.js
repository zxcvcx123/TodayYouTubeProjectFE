import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

function AdminMemberInfoDetails({ memberInfo }) {
  return (
    <Box>
      <Card w={"80%"} p={"20px"} boxShadow={"none"} minWidth="1200px">
        <CardBody>
          <Stack mt="6" spacing="3">
            <Card mt={"5"}>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Heading>상세정보</Heading>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          아이디
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.member_id}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          닉네임
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.nickname}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          이메일
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.email}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          전화번호
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.phone_number}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          생년월일
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.birth_date}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          성별
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.gender === "m" ? "남자" : "여자"}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        {/* ---------------------------등급 ------------------------------*/}
                        <Flex alignItems={"center"}>
                          <Heading size="s" textTransform="uppercase">
                            등급
                          </Heading>
                        </Flex>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.role_name}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  {/* --------------------------- ------------------------------*/}
                  <Heading>활동내역</Heading>
                  <Flex w={"100%"}>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Flex alignItems={"center"}>
                          <Heading size="s" textTransform="uppercase">
                            작성한 게시글 수
                          </Heading>
                        </Flex>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.countboard}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          댓글 수
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.countcomment +
                            memberInfo.countcommentreply}{" "}
                          (댓글 {memberInfo.countcomment}, 대댓글
                          {memberInfo.countcommentreply})
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          누른 좋아요
                        </Heading>
                        <Text pl={2} mt={1} pt="2" fontSize="sm">
                          {memberInfo.countlike}
                        </Text>
                      </Box>
                    </Flex>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button ml="70%" colorScheme="red">
            회원정지
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}

export default AdminMemberInfoDetails;
