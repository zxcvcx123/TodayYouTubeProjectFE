import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";

export function FirstMain() {
  // 임시메인
  return (
    <Box bg="beige" w="100%" h="700px" p={4}>
      <Center w="60%" h="70%" border="3px solid black" m="auto">
        1
      </Center>
      <Center>
        <Flex
          w="70%"
          h="130px"
          border="3px solid red"
          m="auto"
          mt={2}
          justify="space-between"
        >
          <Box w="22%" border="3px solid blue">
            2
          </Box>
          <Box w="22%" border="3px solid blue">
            3
          </Box>
          <Box w="22%" border="3px solid blue">
            4
          </Box>
          <Box w="22%" border="3px solid blue">
            5
          </Box>
        </Flex>
      </Center>
    </Box>
  );
}
