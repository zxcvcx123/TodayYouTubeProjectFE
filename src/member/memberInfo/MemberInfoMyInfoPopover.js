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
      <PopoverContent w={"500px"}>
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
                  <Th>조건</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#663300"} color={"white"}>
                      IRON
                    </Badge>
                  </Td>
                  <Td color={"#663300"} fontWeight={"bold"}>
                    아이언
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#996600"} color="white">
                      BRONZE
                    </Badge>
                  </Td>
                  <Td color="#996600" fontWeight={"bold"}>
                    브론즈
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#CCCCCC"} color="white">
                      SILVER
                    </Badge>
                  </Td>
                  <Td color="#CCCCCC" fontWeight={"bold"}>
                    실버
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#FFCC00"} color="white">
                      GOLD
                    </Badge>
                  </Td>
                  <Td color="#FFCC00" fontWeight={"bold"}>
                    골드
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#33FF33"} color="white">
                      PLATINUM
                    </Badge>
                  </Td>
                  <Td color="#33FF33" fontWeight={"bold"}>
                    플레티넘
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#00FFFF"} color="white">
                      DIAMOND
                    </Badge>
                  </Td>
                  <Td color="#00FFFF" fontWeight={"bold"}>
                    다이아
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#CC66FF"} color="white">
                      MASTER
                    </Badge>
                  </Td>
                  <Td color="#CC66FF" fontWeight={"bold"}>
                    마스터
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"#FF3366"} color="white">
                      GRANDMASTER
                    </Badge>
                  </Td>
                  <Td color="#FF3366" fontWeight={"bold"}>
                    그랜드마스터
                  </Td>
                  <Td>아직 안정함</Td>
                </Tr>
                <Tr>
                  <Td>
                    <Badge backgroundColor={"black"} color="red">
                      CHALLENGER
                    </Badge>
                  </Td>
                  <Td color="red" fontWeight={"bold"}>
                    챌린저
                  </Td>
                  <Td>아직 안정함</Td>
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
