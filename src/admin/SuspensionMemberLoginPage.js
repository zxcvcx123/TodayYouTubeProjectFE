import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Text,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Icon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import LoadingPage from "../component/LoadingPage";

function SuspensionMemberLoginPage(props) {
  const { member_id } = useParams();

  const [suspensionInfo, setSuspensionInfo] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/admin/suspensionMessage/" + member_id)
      .then((response) => setSuspensionInfo(response.data));
  }, []);

  if (suspensionInfo == null) {
    return <LoadingPage />;
  }

  return (
    <Box w={"80%"} m={"auto"}>
      <Alert
        // colorScheme="red"
        status="warning"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="700px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          정지된사용자 입니다!
        </AlertTitle>
        <Box w={"50%"} mt={10}>
          <Card>
            <CardHeader>
              <Heading size="md">
                <Box
                  h={"50px"}
                  lineHeight={"50px"}
                  backgroundColor={"red.200"}
                  colorScheme={"red"}
                >
                  정지 해제까지 남은 일자 : {suspensionInfo.remaindate + 1}
                </Box>
              </Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    정지사유
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {suspensionInfo.reason}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    정지 기간
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {suspensionInfo.period}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    정지시작 일자
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {suspensionInfo.start_date_only}
                  </Text>
                </Box>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    정지해제 일자
                  </Heading>
                  <Text pt="2" fontSize="sm">
                    {suspensionInfo.end_date_only}
                  </Text>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
        <Button mt={5} onClick={() => navigate("/")}>
          메인페이지로 가기
        </Button>
      </Alert>
    </Box>
  );
}

export default SuspensionMemberLoginPage;
