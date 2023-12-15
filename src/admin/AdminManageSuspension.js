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
  Spinner,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";

function AdminManageSuspension(props) {
  const [suspensionList, setSuspensionList] = useState(null);
  const [releaseList, setReleaseList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/suspension")
      .then((response) => {
        setReleaseList(response.data.releaseList);
        setSuspensionList(response.data.suspensionList);
      })
      .catch(() => console.log("bad"));
  }, []);

  if (suspensionList == null || releaseList == null) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>
        <Heading mt={10}>정지가 끝난 회원(정지해제 처리 요망)</Heading>
        {releaseList &&
          releaseList.map((release) => (
            <Card w={"50%"} m={"auto"} mt={10}>
              <CardHeader>
                <Flex justifyContent={"space-between"}>
                  <Heading size="md">
                    정지 회원 이름 : {release.member_id}
                  </Heading>
                  <Button colorScheme="red">정지 해제!</Button>
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
      </Box>
      <Divider mt={20} />
      <Box>
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
    </Box>
  );
}

export default AdminManageSuspension;
