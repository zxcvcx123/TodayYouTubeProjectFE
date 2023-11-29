import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useRadioGroup,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

function PageCount(props) {
  const [pageCount, setPageCount] = useState("10");
  const navigate = useNavigate();

  const [params] = useSearchParams();

  useEffect(() => {
    params.set("s", pageCount);
    navigate("?" + params);
  }, [pageCount]);

  function handleCountClick(e) {
    setPageCount(e.target.value);
  }

  return (
    <Select
      border={"1px"}
      borderColor={"gray.200"}
      padding={1}
      width={"20%"}
      size={"sm"}
      defaultValue={10}
      onChange={(e) => handleCountClick(e)}
    >
      <option fontSize={"0.9rem"} mr={5} ml={3} value={5}>
        5개씩 보기
      </option>
      <option fontSize={"0.9rem"} mr={5} ml={3} value={10}>
        10개씩 보기
      </option>
      <option fontSize={"0.9rem"} mr={5} ml={3} value={20}>
        20개씩 보기
      </option>
    </Select>

    // radio로 해본것
    // <Box>
    //   <RadioGroup
    //     border="1px"
    //     borderColor="gray.200"
    //     padding={1}
    //     size={"sm"}
    //     value={pageCount}
    //     onChange={setPageCount}
    //   >
    //     <Stack spacing={4} direction="row">
    //       <Radio value="5">5개씩 보기</Radio>
    //       <Radio value="10">10개씩 보기</Radio>
    //       <Radio value="20">20개씩 보기</Radio>
    //     </Stack>
    //   </RadioGroup>
    // </Box>

    // <Flex border={"1px"} borderColor={"gray.200"} padding={1}>
    //   <Box
    //     fontSize={"0.9rem"}
    //     mr={5}
    //     ml={3}
    //     cursor={"pointer"}
    //     style={{ fontWeight: isCount ? "bold" : "" }}
    //     onClick={() => {
    //       handleCountClick(setPageCount(5));
    //
    //     }}
    //   >
    //     5개씩 보기
    //   </Box>
    //   <Box
    //     fontSize={"0.9rem"}
    //     mr={5}
    //     cursor={"pointer"}
    //     style={{ fontWeight: isCount ? "bold" : "" }}
    //     onClick={() => handleCountClick(setPageCount(10))}
    //   >
    //     10개씩 보기
    //   </Box>
    //   <Box
    //     fontSize={"0.9rem"}
    //     cursor={"pointer"}
    //     style={{ fontWeight: isCount ? "bold" : "" }}
    //     onClick={() => handleCountClick(setPageCount(20))}
    //   >
    //     20개씩 보기
    //   </Box>
    // </Flex>
  );
}

export default PageCount;
