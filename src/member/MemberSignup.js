import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function MemberSignup(props) {
  /* 회원 폼 상태 */
  const [member_id, setMember_id] = useState("");
  const [password, setPassword] = useState("");
  const [password_check, setPassword_check] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");

  /*  */

  return (
    <>
      <Box>
        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>비밀번호 재확인</FormLabel>
          <Input type="password" />
        </FormControl>
        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>휴대폰 번호</FormLabel>
          <Input type="tel" />
        </FormControl>
        <Button>가입</Button>
      </Box>
    </>
  );
}

export default MemberSignup;
