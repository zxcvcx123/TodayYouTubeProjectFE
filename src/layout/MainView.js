import { Box, Center, Flex } from "@chakra-ui/react";
import React from "react";
import { MainBoardList } from "./MainBoardList";

export function MainView() {
  // 임시메인
  return (
    <Box bg="black" w="100%" h="700px" p={4}>
      <Center w="60%" h="70%" m="auto">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/WGeompsRtNA?si=I0e87MfxCU3n8-Hn"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </Center>
      <Center mt={5}>
        <Flex w="70%" h="100%" m="auto" mt={2} justify="space-between">
          <Box w="22%">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/zmtjzu-bBzk?si=ORvu1rMERBKxGtzv"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
          <Box w="22%">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/vDdTWk1NZkg?si=GNMPrau7L96K-do8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
          <Box w="22%">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/_OhCPX0eBI4?si=i4tljU3jvdK-xMBh"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
          <Box w="22%">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5SxYmDQgaJ4?si=_L2v9L-fG5hFY8WU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </Box>
        </Flex>
      </Center>
      {/*<MainBoardList />*/}
    </Box>
  );
}
