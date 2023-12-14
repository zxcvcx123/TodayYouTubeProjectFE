import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Input,
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
  Select,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Sidenav } from "./Sidenav";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

function AdminMemberInfoDetails({
  memberInfo,
  handleMyBoardList,
  handleMemberInfoMyInfo,
  handleMemberComment,
}) {
  const [suspensionReason, setSuspensionReason] = useState("");
  const [suspensionPeriod, setSuspensionPeriod] = useState(7);

  const { onClose, isOpen, onOpen } = useDisclosure();

  function handleSuspensionButton() {
    axios.put("/api/admin/member", {
      member_id: memberInfo.member_id,
      period: suspensionPeriod,
      reason: suspensionReason,
    });
  }

  return (
    <Box>
      <Card w={"80%"} p={"20px"} boxShadow={"none"} minWidth="1200px">
        b.is_show
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
                    <Flex w={"50%"} mr={4} borderRight={"1px solid #E2E4E8"}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          누른 좋아요
                        </Heading>
                        <Text
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                        >
                          {memberInfo.countlike}
                        </Text>
                      </Box>
                    </Flex>
                    <Flex w={"50%"} mr={4}>
                      <Box>
                        <Heading size="s" textTransform="uppercase">
                          활동 게시판
                        </Heading>
                        <Text
                          colorScheme="blue"
                          pl={2}
                          mt={1}
                          pt="2"
                          fontSize="sm"
                        >
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
          <Button ml="70%" colorScheme="red" onClick={onOpen}>
            회원정지
          </Button>
        </CardFooter>
      </Card>

      {/* 회원정지 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>회원 정지</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      정지사유
                    </Heading>
                    <Input
                      type="text"
                      pt="2"
                      fontSize="sm"
                      onChange={(e) => setSuspensionReason(e.target.value)}
                    ></Input>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      정지기간
                    </Heading>
                    <Select
                      defaultValue={7}
                      onChange={(e) => setSuspensionPeriod(e.target.value)}
                    >
                      <option value={7}>7</option>
                      <option value={30}>30</option>
                      <option value={999}>999</option>
                    </Select>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button variant={"ghost"} onClick={onClose}>
              닫기
            </Button>
            <Button colorScheme="red" onClick={handleSuspensionButton}>
              정지
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AdminMemberInfoDetails;
