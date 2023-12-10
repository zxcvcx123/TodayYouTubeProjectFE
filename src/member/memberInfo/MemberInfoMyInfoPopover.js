import React from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

function MemberInfoMyInfoPopover(props) {
  const roleTip = useDisclosure();
  return (
    <Popover
      isLazy
      returnFocusOnClose={false}
      isOpen={roleTip.isOpen}
      onClose={roleTip.onClose}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Tooltip label="등급" placement="auto-start">
          <Icon
            ml={1}
            color={"tomato"}
            fontSize={"14px"}
            fontWeight={"bold"}
            onClick={roleTip.onToggle}
          />
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent w={"500px"} position={"fixed"}>
        <PopoverHeader fontWeight="semibold" p={"20px"} fontSize={"20px"}>
          회원 등급표
        </PopoverHeader>
        <PopoverArrow />
        <PopoverBody>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>배지</Th>
                  <Th>등급</Th>
                  <Th>누적 조건</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#663300"}
                      color={"white"}
                      borderRadius={"8px"}
                    >
                      IRON
                    </Badge>
                  </Td>
                  <Td color={"#663300"} fontWeight={"bold"}>
                    아이언
                  </Td>
                  <Td p={0}>
                    <Text fontSize={"16px"}>
                      <div className="levelUpCondition">회원가입</div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#996600"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      BRONZE
                    </Badge>
                  </Td>
                  <Td color="#996600" fontWeight={"bold"}>
                    브론즈
                  </Td>
                  <Td p={0}>
                    {" "}
                    <Text fontSize={"16px"}>
                      <div className="levelUpCondition">게시글 2, 댓글 5</div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#CCCCCC"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      SILVER
                    </Badge>
                  </Td>
                  <Td color="#CCCCCC" fontWeight={"bold"}>
                    실버
                  </Td>
                  <Td p={0}>
                    {" "}
                    <Text fontSize={"16px"}>
                      <div className="levelUpCondition">게시글 5, 댓글 10</div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#FFCC00"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      GOLD
                    </Badge>
                  </Td>
                  <Td color="#FFCC00" fontWeight={"bold"}>
                    골드
                  </Td>
                  <Td p={0}>
                    {" "}
                    <Text fontSize={"16px"}>
                      <div
                        className="levelUpCondition"
                        style={{ marginBottom: "5px" }}
                      >
                        게시글 20, 댓글 40
                      </div>
                      <div className="levelUpCondition">좋아요 10</div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#33FF33"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      PLATINUM
                    </Badge>
                  </Td>
                  <Td color="#33FF33" fontWeight={"bold"}>
                    플레티넘
                  </Td>
                  <Td p={0}>
                    {" "}
                    <Text fontSize={"16px"}>
                      <div
                        className="levelUpCondition"
                        style={{ marginBottom: "5px" }}
                      >
                        게시글 50, 댓글 75
                      </div>
                      <div className="levelUpCondition">
                        좋아요 50, 조회수 1000
                      </div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#00FFFF"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      DIAMOND
                    </Badge>
                  </Td>
                  <Td color="#00FFFF" fontWeight={"bold"}>
                    다이아
                  </Td>
                  <Td p={0}>
                    <Text fontSize={"16px"}>
                      <div
                        className="levelUpCondition"
                        style={{ marginBottom: "5px" }}
                      >
                        게시글 75, 댓글 100
                      </div>
                      <div className="levelUpCondition">
                        좋아요 100, 조회수 5000
                      </div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#CC66FF"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      MASTER
                    </Badge>
                  </Td>
                  <Td color="#CC66FF" fontWeight={"bold"}>
                    마스터
                  </Td>
                  <Td p={0}>
                    <Text fontSize={"16px"}>
                      <div
                        className="levelUpCondition"
                        style={{ marginBottom: "5px" }}
                      >
                        게시글 300, 댓글 500
                      </div>
                      <div className="levelUpCondition">
                        좋아요 1000, 조회수 20000
                      </div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"#FF3366"}
                      color="white"
                      borderRadius={"8px"}
                    >
                      GRANDMASTER
                    </Badge>
                  </Td>
                  <Td color="#FF3366" fontWeight={"bold"}>
                    그랜드마스터
                  </Td>
                  <Td p={0}>
                    <Text fontSize={"16px"}>
                      <div
                        className="levelUpCondition"
                        style={{ marginBottom: "5px" }}
                      >
                        게시글 500, 댓글 1000
                      </div>
                      <div className="levelUpCondition">
                        좋아요 5000, 조회수 100000
                      </div>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge
                      backgroundColor={"black"}
                      color="red"
                      borderRadius={"8px"}
                    >
                      CHALLENGER
                    </Badge>
                  </Td>
                  <Td color="red" fontWeight={"bold"}>
                    챌린저
                  </Td>
                  <Td p={0}>
                    <Text fontSize={"16px"}>
                      <div
                        className="levelUpCondition"
                        style={{ marginBottom: "5px" }}
                      >
                        게시글 500, 댓글 1000
                      </div>
                      <div className="levelUpCondition">
                        좋아요 10000, 조회수 500000
                      </div>
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </PopoverBody>
        <PopoverFooter display="flex" justifyContent="flex-end">
          <ButtonGroup size="sm">
            <Button variant="outline">등업신청</Button>
            <PopoverCloseButton />
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default MemberInfoMyInfoPopover;
