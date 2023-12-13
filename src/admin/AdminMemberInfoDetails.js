import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function AdminMemberInfoDetails({
  memberInfo,
  handleMyBoardList,
  handleMemberInfoMyInfo,
  handleMemberComment,
}) {
  const { onClose, isOpen, onOpen } = useDisclosure();

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
                        <Button
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                          variant={"link"}
                          onClick={handleMyBoardList}
                        >
                          {memberInfo.countboard}
                        </Button>
                      </Box>
                    </Flex>
                    <Flex w={"50%"} borderRight={"1px solid #E2E4E8"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          댓글 수
                        </Heading>
                        <Button
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                          variant={"link"}
                          onClick={handleMemberComment}
                        >
                          {memberInfo.countcomment +
                            memberInfo.countcommentreply}{" "}
                          (댓글 {memberInfo.countcomment}, 대댓글
                          {memberInfo.countcommentreply})
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          누른 좋아요
                        </Heading>
                        <Button
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                          variant={"link"}
                        >
                          {memberInfo.countlike}
                        </Button>
                      </Box>
                    </Flex>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Stack>
        </CardBody>
        <CardFooter>
          <Button ml="70%" colorScheme="red" onClick={onOpen}>
            회원정지
          </Button>
        </CardFooter>
      </Card>

      {/* 회원정지 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>회원을 정지시키시겠습니까?</ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              닫기
            </Button>
            <Button colorScheme="blue">삭제</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminMemberInfoDetails;
