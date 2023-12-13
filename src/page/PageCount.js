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
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";
import axios from "axios";

function PageCount({ params }) {
  const [pageCount, setPageCount] = useState(10);
  const navigate = useNavigate();
  const [params1] = useSearchParams(params);

  // useEffect(() => {
  //   axios.get("/api/board/list?" + params);
  // }, [pageCount]);

  function handlePageCount(e) {
    const newPageCount = e.target.value;
    setPageCount(newPageCount);

    params1.set("s", newPageCount);
    params1.set("p", 1);
    navigate("?" + params1);
  }

  return (
    <Box>
      <Select defaultValue={10} onChange={(e) => handlePageCount(e)}>
        <option value={5}>5개씩 보기</option>
        <option value={10}>10개씩 보기</option>
        <option value={20}>20개씩 보기</option>
      </Select>
    </Box>

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
