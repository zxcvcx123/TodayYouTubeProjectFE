import {
  Box,
  Flex,
  Text,
  Center,
  CardHeader,
  Heading,
  CardBody,
  Card,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import YouTube from "react-youtube";
import { EditIcon } from "@chakra-ui/icons";

export function MiniHomepyRightContainer({
  videoId,
  bgmOpts,
  totalViews,
  todayViews,
}) {
  const onPlayerReady = (event) => {
    if (event.target.getVolume() > 60) {
      event.target.setVolume(40);
    }
  };
  return (
    <>
      <Box w={"100%"} h={"100%"}>
        <Box borderBottom={"1px solid black"}>
          <Flex p={"10px"}>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              fontFamily={"'Song Myung', serif;"}
            >
              <Text fontSize={"14px"} mr={2}>
                TODAY
              </Text>
              <Text>{todayViews}</Text>
            </Flex>
            <Flex
              ml={"5px"}
              mr={"5px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box h={"10px"} border={"1px solid black"}></Box>
            </Flex>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              fontFamily={"'Song Myung', serif;"}
            >
              <Text fontSize={"14px"} mr={2}>
                TOTAL
              </Text>
              <Text>{totalViews}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box w={"100%"} border={"1px solid black"}>
          <Flex alignItems={"center"}>
            <Text
              fontSize={"25px"}
              fontFamily={"'Song Myung', serif;"}
              color={"#dcdcdc"}
              mr={3}
            >
              BGM
            </Text>
            <EditIcon fontSize={"20px"} color={"#dcdcdc"} onClick={() => {}} />
          </Flex>
          <Center>
            <Box w={"80%"} border={"1px solid black"} h={"220px"}>
              <YouTube
                videoId={videoId}
                opts={bgmOpts}
                onReady={onPlayerReady}
              />
            </Box>
          </Center>
          <Flex w={"100%"} justifyContent={"flex-end"} mt={2} pr={4}>
            <Button
              variant="link"
              backgroundColor={"transparent"}
              color={"#dcdcdc"}
            >
              저장
            </Button>
            <Button
              variant="link"
              backgroundColor={"transparent"}
              color={"#dcdcdc"}
            >
              취소
            </Button>
          </Flex>
        </Box>
        <Box></Box>
      </Box>
    </>
  );
}
