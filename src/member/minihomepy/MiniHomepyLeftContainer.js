import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Spinner,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DetectLoginContext } from "../../component/LoginProvider";
import { HomepyMemberContext } from "./MiniHomepy";
import MemberRoleBadge from "./minihomepy-util/MemberRoleBadge";
import "./minihomepy-styles/font.css";
import { EditIcon } from "@chakra-ui/icons";
import axios from "axios";

export function MiniHomepyLeftContainer({
  member,
  introduce,
  setIntroduce,
  todayViews,
  totalViews,
}) {
  const { loginInfo } = useContext(DetectLoginContext);

  const memberId = member ? member.member_id : <Spinner />;
  const nickname = member ? member.nickname : <Spinner />;
  const imageUrl = member ? member.image_url : <Spinner />;

  /*-----------------------------------------------------------*/
  const [editIntroduce, setEditIntroduce] = useState(false);
  const [introduceColors, setIntroduceColors] = useState([]);
  useEffect(() => {
    let nonSpaceCharCount = 0;
    if (introduce !== null) {
      setIntroduceColors(
        Array.from(introduce).map((char, index) => {
          if (char !== " ") {
            const color = nonSpaceCharCount % 2 === 0 ? "#41A541" : "tomato";
            nonSpaceCharCount++;
            return color;
          }
          return null;
        }),
      );
    }
  }, [introduce]);

  useEffect(() => {
    if (introduce !== null) {
      const interval = setInterval(() => {
        setIntroduceColors((currentColors) =>
          currentColors.map(
            (color) => color && (color === "#41A541" ? "tomato" : "#41A541"),
          ),
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  function handleIntroduceEdit() {
    const loginMemberId = loginInfo.member_id;
    axios
      .patch("/api/member/minihomepy/edit/introduce", {
        member_id: loginMemberId,
        introduce: introduce,
      })
      .then(() => {
        setEditIntroduce(false);
      });
  }
  return (
    <>
      <Box
        w={"100%"}
        h={"100%"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        pt={5}
      >
        <Box>
          <Box borderBottom={"1px solid #dcdcdc"} color={"#dcdcdc"} mb={10}>
            <Flex>
              <Flex alignItems={"center"} fontFamily={"'Song Myung', serif;"}>
                <Text fontSize={"16px"} mr={2} textAlign={"center"}>
                  TODAY
                </Text>
                <Text fontSize={"16px"} color={"tomato"}>
                  {todayViews}
                </Text>
              </Flex>
              <Flex
                ml={"10px"}
                mr={"10px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Box h={"12px"} border={"1px solid #dcdcdc"}></Box>
              </Flex>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                fontFamily={"'Song Myung', serif;"}
              >
                <Text fontSize={"16px"} mr={2}>
                  TOTAL
                </Text>
                <Text fontSize={"16px"}>{totalViews}</Text>
              </Flex>
            </Flex>
          </Box>
          <Box
            bg=" rgba( 255, 255, 255, 0.1 )"
            p={5}
            borderRadius={"10px"}
            mb={10}
          >
            <Box>
              <Avatar borderRadius="50px" boxSize="200px" src={imageUrl} />
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              fontFamily={"'Jua', sans-serif"}
              w={"100%"}
              justifyContent={"center"}
              mt={5}
              mb={3}
            >
              <Text fontSize={"30px"} color={"#dcdcdc"} mr={3}>
                {nickname}
              </Text>
              <MemberRoleBadge />
            </Box>
          </Box>
        </Box>
        <Box
          backgroundColor={"transparent"}
          w={"70%"}
          h={"250px"}
          borderRadius={"10px"}
        >
          <Box fontFamily={"'Song Myung', serif;"}>
            <Flex
              alignItems={"center"}
              borderBottom={"1px solid #dcdcdc"}
              pb={3}
              mb={3}
            >
              <Text fontSize={"25px"} mr={3} color={"#dcdcdc"}>
                Introduce
              </Text>
              {loginInfo !== null &&
                (loginInfo.member_id === memberId ? (
                  <EditIcon
                    fontSize={"20px"}
                    color={"#dcdcdc"}
                    onClick={() => {
                      setEditIntroduce(true);
                    }}
                  />
                ) : (
                  <></>
                ))}
            </Flex>
            {editIntroduce ? (
              <>
                <FormControl>
                  <Textarea
                    color={"#dcdcdc"}
                    w={"100%"}
                    h="150px"
                    pl={"10px"}
                    fontSize={"20px"}
                    value={introduce}
                    onChange={(e) => {
                      setIntroduce(e.target.value);
                      console.log(introduce);
                    }}
                  />
                  <Flex w={"100%"} justifyContent={"flex-end"} mt={3}>
                    <Button
                      variant="link"
                      backgroundColor={"transparent"}
                      color={"#dcdcdc"}
                      onClick={handleIntroduceEdit}
                    >
                      저장
                    </Button>
                    <Button
                      variant="link"
                      backgroundColor={"transparent"}
                      color={"#dcdcdc"}
                      onClick={() => {
                        setEditIntroduce(false);
                      }}
                    >
                      취소
                    </Button>
                  </Flex>
                </FormControl>
              </>
            ) : (
              <Box
                w={"100%"}
                h="200px"
                pl={"10px"}
                fontSize={"20px"}
                color={"#dcdcdc"}
              >
                {introduce !== null &&
                  introduce.split("").map((char, index) => (
                    <span
                      style={{ color: introduceColors[index] || "inherit" }}
                      key={index}
                    >
                      {char}
                    </span>
                  ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
