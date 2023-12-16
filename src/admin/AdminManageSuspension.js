import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Flex,
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { Sidenav } from "./Sidenav";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingPage from "../component/LoadingPage";

function AdminManageSuspension(props) {
  const [suspensionList, setSuspensionList] = useState(null);
  const [releaseList, setReleaseList] = useState(null);
  const [isReleasing, setIsReleasing] = useState(false);
  const [sendingRelease, setSendingRelease] = useState(null);

  const { onClose, isOpen, onOpen } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/suspension")
      .then((response) => {
        setReleaseList(response.data.releaseList);
        setSuspensionList(response.data.suspensionList);
      })
      .catch(() => console.log("bad"));
  }, [isReleasing]);

  if (suspensionList == null || releaseList == null) {
    return <LoadingPage />;
  }

  function handleReleaseSuspension(sendingRelease) {
    setIsReleasing(true);
    axios
      .put("/api/admin/suspension", {
        id: sendingRelease.id,
        member_id: sendingRelease.member_id,
      })
      .then(onClose)
      .catch((error) => console.log(error))
      .finally(() => setIsReleasing(false));
  }

  function handleModalClick(release) {
    setSendingRelease(release);
    onOpen();
  }

  return (
    <Flex>
      <Sidenav />
      <Box w={"80%"}>
        <Box ml={10}>
          <Heading mt={10}>정지가 끝난 회원(정지해제 처리 요망)</Heading>
          {releaseList &&
            releaseList.map((release) => (
              <Card w={"50%"} m={"auto"} mt={10}>
                <CardHeader>
                  <Flex justifyContent={"space-between"}>
                    <Heading size="md">
                      정지 회원 이름 : {release.member_id}
                    </Heading>
                    <Button
                      colorScheme="red"
                      onClick={() => handleModalClick(release)}
                    >
                      정지 해제!
                    </Button>
                  </Flex>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        정지사유
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {release.reason}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        정지시작 일짜
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {release.start_date}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        정지해제 일자
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {release.end_date}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          {releaseList == "" && (
            <Center mt={10}>
              <Text fontWeight={"bold"}>
                현재 정지해제 해야할 회원들은 없습니다.
              </Text>
            </Center>
          )}
        </Box>
        <Divider mt={20} />
        <Box ml={10}>
          <Heading mt={90}>정지중인 회원들</Heading>
          {suspensionList &&
            suspensionList.map((suspension) => (
              <Card w={"50%"} m={"auto"} mt={10}>
                <CardHeader>
                  <Flex justifyContent={"space-between"}>
                    <Heading size="md">
                      정지 회원 이름 : {suspension.member_id}
                    </Heading>
                    <Button colorScheme="blue">
                      정지 해제 : {suspension.remaindate}일 +{" "}
                      {suspension.remaintime}
                    </Button>
                  </Flex>
                </CardHeader>

                <CardBody>
                  <Stack divider={<StackDivider />} spacing="4">
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        정지사유
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {suspension.reason}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        정지시작 일짜
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {suspension.start_date}
                      </Text>
                    </Box>
                    <Box>
                      <Heading size="xs" textTransform="uppercase">
                        정지해제 일자
                      </Heading>
                      <Text pt="2" fontSize="sm">
                        {suspension.end_date}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
        </Box>
        {/* 삭제 모달 */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>정지를 해제시키시겠습니까?</ModalBody>
            <ModalFooter>
              <Button variant={"ghost"} onClick={onClose}>
                닫기
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => handleReleaseSuspension(sendingRelease)}
              >
                정지해제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default AdminManageSuspension;