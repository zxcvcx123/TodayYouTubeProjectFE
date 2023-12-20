import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  border,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "../page/Pagination";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SearchComponent } from "../page/SearchComponent";
import { Sidenav } from "./Sidenav";
import LoadingPage from "../component/LoadingPage";
import { DetectLoginContext } from "../component/LoginProvider";

function AdminMemberList(props) {
  // 로그인 유저 정보
  const { token, handleLogout, loginInfo, validateToken } =
    useContext(DetectLoginContext);

  const [memberList, setMemberList] = useState(null);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchById, setSearchById] = useState("");
  const [isManaging, setIsManaging] = useState(false);
  let toast = useToast();
  const navigate = useNavigate();
  let [params] = useSearchParams();
  let location = useLocation();

  useEffect(() => {
    axios
      .post("/api/admin/member/list?" + params)
      .then((response) => {
        setMemberList(response.data.memberList);
        setPageInfo(response.data.pageInfo);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          toast({
            description: "접근 불가한 경로입니다.",
            status: "error",
          });
          navigate("/");
        }
      });
  }, [location, searchById]);

  if (pageInfo == null) {
    return <LoadingPage />;
  }

  function handleMemberIdSearch(e) {
    const newSearchBy = e.target.value;
    setSearchById(newSearchBy);
    params.set("p", 1);
    params.set("mid", newSearchBy);
  }

  if (!token.detectLogin || loginInfo.role_name !== "운영자") {
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
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            관리자페이지 입니다!
          </AlertTitle>
          <Button mt={5} onClick={() => navigate("/")}>
            메인페이지로 가기
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Flex>
      <Sidenav />
      <Box w={"80%"} ml={"3%"}>
        <Flex>
          <Heading mt={5} mb={5} mr={10}>
            회원 정보 리스트
          </Heading>
          <Input
            mt={5}
            mb={5}
            type="text"
            w={"30%"}
            placeholder="회원 ID입력"
            onChange={(e) => handleMemberIdSearch(e)}
          />
          <Button
            onClick={() => navigate("/admin/suspension")}
            colorScheme="blue"
            mt={5}
            mb={5}
            ml={"25%"}
          >
            정지회원 관리
          </Button>
        </Flex>
        <Table>
          <Thead>
            <Tr>
              <Td></Td>
              <Td
                fontWeight={"bold"}
                borderColor={"black"}
                textAlign={"center"}
              >
                번호
              </Td>
              <Td
                fontWeight={"bold"}
                borderColor={"black"}
                textAlign={"center"}
              >
                아이디
              </Td>
              <Td
                fontWeight={"bold"}
                borderColor={"black"}
                textAlign={"center"}
              >
                등급
              </Td>
              <Td
                fontWeight={"bold"}
                borderColor={"black"}
                textAlign={"center"}
              >
                이메일
              </Td>
              <Td
                fontWeight={"bold"}
                borderColor={"black"}
                textAlign={"center"}
              >
                가입일시
              </Td>
            </Tr>
          </Thead>
          <Tbody>
            {memberList &&
              memberList.map((member) => (
                <Tr
                  key={member.member_id}
                  _hover={{ backgroundColor: "red.100", cursor: "pointer" }}
                  onClick={() => navigate("/admin/member/" + member.member_id)}
                >
                  <Td
                    w={"5%"}
                    textAlign={"center"}
                    onClick={(e) => e.stopPropagation(e)}
                  >
                    {member.role_name === "정지회원" && (
                      <Button size={"sm"} colorScheme="red">
                        정지회원
                      </Button>
                    )}
                  </Td>
                  <Td textAlign={"center"}>
                    {memberList.indexOf(member) +
                      1 +
                      (params.get("p") - 1) * 20}
                  </Td>
                  <Td textAlign={"center"}>{member.member_id}</Td>
                  {member.role_name === "운영자" && (
                    <Td color={"blue"} textAlign={"center"}>
                      {member.role_name}
                    </Td>
                  )}
                  {member.role_name === "운영자" || (
                    <Td textAlign={"center"}>일반[{member.role_name}]</Td>
                  )}
                  <Td textAlign={"center"}>{member.email}</Td>
                  <Td textAlign={"center"}>{member.created_at}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <Pagination pageInfo={pageInfo} />
      </Box>
    </Flex>
  );
}

export default AdminMemberList;
