import React, { useContext, useEffect } from "react";
import { DetectLoginContext } from "../component/LoginProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Image,
  Text,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Stack,
  useToast,
  CardHeader,
  StackDivider,
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabIndicator,
} from "@chakra-ui/react";

function MemberInfo(props) {
  const { loginInfo } = useContext(DetectLoginContext);
  let navigate = useNavigate("");
  let toast = useToast();
  useEffect(() => {
    axios
      .get("/api/member/info", {
        member_id: loginInfo.member_id,
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          toast({
            description: "비정상적인 접근입니다. 로그인 후 이용바랍니다.",
            status: "warning",
          });
          navigate("/member/login");
        }
      });
  }, []);

  return (
    <>
      <Box w={"100%"} h={"100%"}>
        <Flex w={"100%"}>
          <Tabs variant="enclosed">
            <Card bg={"gray.800"} color={"white"} h={"100%"}>
              <Center>
                <Image
                  mt={"10"}
                  borderRadius="full"
                  boxSize="200px"
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
              </Center>
              <Flex>
                <TabList mt={"5"}>
                  <Tab>내 정보</Tab>
                  <Tab>2정보</Tab>
                  <Tab>3정보</Tab>
                </TabList>
                <TabIndicator
                  mt="-1.5px"
                  height="2px"
                  bg="blue.500"
                  borderRadius="1px"
                />
              </Flex>
            </Card>
            <Card w={"100%"} p={"20px"}>
              <CardBody>
                <Stack mt="6" spacing="3">
                  <Heading size="xl">내 정보</Heading>

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
          </Tabs>
        </Flex>
      </Box>
    </>
  );
}

export default MemberInfo;
