import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function MemberSignup(props) {
  /* 회원 폼 상태 */
  const [member_id, setMember_id] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");
  const [gender, setGender] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");

  /* ChakraUI*/
  let toast = useToast();

  function handleSignupForm() {
    axios
      .post("/api/member/signup", {
        member_id,
        password,
        gender,
        birth_date,
        nickname,
        email,
        phone_number,
      })
      .then(
        toast({
          description: "회원가입에 성공했습니다",
          status: "success",
        }),
      )
      .catch((error) => {
        if (error.status === 400) {
          toast({
            description: "회원가입에 실패하셨습니다.",
            status: "warning",
          });
        } else {
          toast({
            description: "서버에 오류가 발생하였습니다.",
            status: "error",
          });
        }
      });
  }

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Input
            placeholder="아이디 입력"
            onChange={(e) => {
              setMember_id(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>닉네임</FormLabel>
          <Input
            placeholder="닉네임"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>비밀번호</FormLabel>
          <Input
            type="password"
            placeholder="최소"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>비밀번호 재확인</FormLabel>
          <Input
            type="password"
            placeholder="비밀번호 재입력"
            onChange={(e) => {
              console.log(e.target.value);
              setPassword_check(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>이메일</FormLabel>
          <Input
            placeholder="이메일"
            onChange={(e) => {
              console.log(e.target.value);
              setEmail(e.target.value);
            }}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>생년월일</FormLabel>
          <Input
            type="date"
            onChange={(e) => {
              console.log(e.target.value);
              setBirth_date(e.target.value);
            }}
          />
        </FormControl>
        <FormControl>
          <RadioGroup defaultValue="m" onChange={setGender}>
            <HStack spacing="24px">
              <Radio value="m">남자</Radio>
              <Radio value="w">여자</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>휴대폰 번호</FormLabel>
          <Input
            type="tel"
            placeholder="전화번호"
            maxLength={"15"}
            onChange={(e) => {
              setPhone_number(
                (e.target.value = e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(
                    /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
                    "$1-$2-$3",
                  )),
              );
            }}
          />
        </FormControl>
        <Button onClick={handleSignupForm}>가입</Button>
      </Box>
    </>
  );
}

export default MemberSignup;
