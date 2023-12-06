import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

function MemberInfoMyInfoEdit(props) {
  return (
    <Card w={"80%"} p={"20px"} boxShadow={"none"}>
      <CardBody>
        <Stack mt="6" spacing="3">
          <Card mt={"5"}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="s" textTransform="uppercase">
                    아이디
                  </Heading>
                  <Text pl={2} mt={1} pt="2" fontSize="sm">
                    {loginInfo.member_id}
                  </Text>
                </Box>
                <Box>
                  <Heading size="s" textTransform="uppercase">
                    닉네임
                  </Heading>
                  <Text pl={2} mt={1} pt="2" fontSize="sm">
                    {loginInfo.nickname}
                  </Text>
                </Box>
                <Box>
                  <Heading size="s" textTransform="uppercase">
                    이메일
                  </Heading>
                  <Text pl={2} mt={1} pt="2" fontSize="sm">
                    {loginInfo.email}
                  </Text>
                </Box>
                <Box>
                  <Heading size="s" textTransform="uppercase">
                    등급
                  </Heading>
                  <Text pl={2} mt={1} pt="2" fontSize="sm">
                    {loginInfo.role_name}
                  </Text>
                </Box>
                <Box>
                  <Heading size="s" textTransform="uppercase">
                    내가 받은 좋아요
                  </Heading>
                  <Text pl={2} mt={1} pt="2" fontSize="sm">
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
          <Button
            variant="solid"
            colorScheme="blue"
            onClick={() => {
              setOverlay(<CustomOverlay />);
              onOpen();
            }}
          >
            변경
          </Button>
          <Button variant="ghost" colorScheme="blue">
            삭제
          </Button>
        </ButtonGroup>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          {overlay}
          <ModalContent>
            <ModalHeader>비밀번호</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>비밀번호</FormLabel>
                <Input
                  type="password"
                  ref={initialRef}
                  placeholder="비밀번호"
                  onChange={(e) => {
                    setEditMemberInfoPassword(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl
                mt={4}
                isRequired
                isInvalid={
                  editMemberInfoPassword === editMemberInfoPasswordCheck
                    ? false
                    : true
                }
              >
                <FormLabel>비밀번호 재확인</FormLabel>
                <Input
                  type="password"
                  placeholder="비밀번호 재확인"
                  onChange={(e) => {
                    setEditMemberInfoPasswordCheck(e.target.value);
                  }}
                />{" "}
                <FormErrorMessage>
                  비밀번호가 일치하지 않습니다
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={handleMemberInfoEditValidatePassword}
              >
                확인
              </Button>
              <Button
                onClick={() => {
                  setEditMemberInfoPassword("");
                  setEditMemberInfoPasswordCheck("");
                  onClose();
                }}
              >
                취소
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
}

export default MemberInfoMyInfoEdit;
