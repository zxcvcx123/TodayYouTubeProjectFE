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
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function MemberLogin() {
  /* 아이디 */
  const [member_id, setMember_id] = useState("");
  const [password, setPassword] = useState("");
  const [role_id, setRole_id] = useState(2);
  const [role_name, setRole_name] = useState("general_member");
  const navigate = useNavigate();
  const toast = useToast();

  function handleLogin() {
    axios
      .post(
        "/member/login",
        {
          member_id,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      )
      .then(() => {
        toast({
          description: "로그인 되었습니다.",
          status: "info",
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);

        if (error.response.status === 302) {
          toast({
            description: "로그인 되었습니다.",
            status: "info",
          });
          navigate("/");
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
        </Center>
      </Box>
    </>
  );
}

export default MemberLogin;
