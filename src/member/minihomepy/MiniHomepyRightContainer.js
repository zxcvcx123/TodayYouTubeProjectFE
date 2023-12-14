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
  Textarea,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Youtube from "react-youtube";
import YouTube from "react-youtube";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";

export function MiniHomepyRightContainer({
  videoId,
  bgmOpts,

  loginMember,
  member_id,
  setBgm,
  bgm,
  originBgmValue,
}) {
  let toast = useToast();
  const onPlayerReady = (event) => {
    if (event.target.getVolume() > 80) {
      event.target.setVolume(50);
    }
  };

  const [editBgm, setEditBgm] = useState(false);
  function handleEditBgm() {
    if (bgm.startsWith("https://") && bgm.includes("youtu")) {
      axios
        .patch("/api/member/minihomepy/edit/bgm", {
          member_id: loginMember,
          bgm_link: bgm,
        })
        .then(() => {
          setEditBgm(false);
        })
        .finally(() => {
          window.location.reload();
        });
    } else {
      setBgm(originBgmValue);
      toast({
        description: "올바르지 않은 형식입니다",
        status: "warning",
      });
    }
  }
  return (
    <>
      <Box w={"100%"} h={"100%"}>
        <Box w={"100%"} mt={"10px"}>
          <Flex alignItems={"center"}>
            <Text
              fontSize={"25px"}
              fontFamily={"'Song Myung', serif;"}
              color={"#dcdcdc"}
              mr={3}
            >
              BGM
            </Text>
            {member_id === loginMember ? (
              <EditIcon
                fontSize={"20px"}
                color={"#dcdcdc"}
                onClick={() => {
                  setEditBgm(true);
                }}
              />
            ) : (
              <></>
            )}
          </Flex>
          <Center>
            <Box w={"250px"} h={"250px"} borderRadius={"125px"} mt={"10px"}>
              <YouTube
                videoId={videoId}
                opts={bgmOpts}
                onReady={onPlayerReady}
              />
            </Box>
          </Center>
          {editBgm && (
            <FormControl>
              <Center>
                <Textarea
                  mt={3}
                  color={"#dcdcdc"}
                  w={"90%"}
                  h="30px"
                  pl={"10px"}
                  fontSize={"15px"}
                  placeholder="BGM으로 설정하실 youtube 링크를 넣어주세요"
                  _placeholder={{
                    fontFamily: "'Song Myung', serif;",
                    color: "#dcdcdc",
                  }}
                  onChange={(e) => {
                    setBgm(e.target.value);
                  }}
                />
              </Center>
              <Flex
                w={"100%"}
                justifyContent={"flex-end"}
                mt={2}
                pr={4}
                fontFamily={"'Song Myung', serif;"}
              >
                <Button
                  variant="link"
                  backgroundColor={"transparent"}
                  color={"#dcdcdc"}
                  onClick={handleEditBgm}
                >
                  저장
                </Button>
                <Button
                  variant="link"
                  backgroundColor={"transparent"}
                  color={"#dcdcdc"}
                  onClick={() => {
                    setEditBgm(false);
                  }}
                >
                  취소
                </Button>
              </Flex>
            </FormControl>
          )}
        </Box>
        <Box></Box>
      </Box>
    </>
  );
}
