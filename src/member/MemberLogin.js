import React, { useState } from "react";

/* 로그인 컴포넌트 */
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export function MemberLogin() {
  /* 아이디 */
  const [member_id, setMember_id] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    axios
      .post("/api/member/login", {
        member_id,
        password,
      })
      .then(function (response) {
        toast({
          description: "로그인 되었습니다.",
          status: "info",
        });
        const { grantType, accessToken, refreshToken } = response.data.token;
        const authority = response.data.authentication[0].toString();
        localStorage.setItem("grantType", grantType);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("authority", authority);
        localStorage.setItem("memberInfo", member_id);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        if (error.response && error.response.status === 400) {
          toast({
            description: "잘못된 접근입니다.",
            status: "warning",
          });
        } else if (error.response && error.response.status === 404) {
          toast({
            description: "아이디와 암호를 다시 입력해주세요",
            status: "warning",
          });
        } else {
          toast({
            description: "아이디와 암호를 다시 입력해주세요",
            status: "warning",
          });
        }
      });
  }
  return (
    <>
      <Box marginTop={"130px"}>
        <Center>
          <Flex flexDirection={"column"}>
            <Card w={"lg"}>
              <CardHeader>
                <Heading>로그인</Heading>
              </CardHeader>
              <CardBody>
                <FormControl mb={5}>
                  <FormLabel>아이디</FormLabel>
                  <Input
                    value={member_id}
                    onChange={(e) => setMember_id(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>암호</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </CardBody>
              <CardFooter>
                <Button colorScheme={"blue"} onClick={handleLogin}>
                  로그인
                </Button>
              </CardFooter>
            </Card>
            <Flex>
              <Button
                onClick={() => {
                  navigate("/member/signup");
                }}
                size="md"
                variant="ghost"
              >
                가입으로 이동 <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Flex>
          </Flex>
        </Center>
      </Box>
    </>
  );
}

export default MemberLogin;
