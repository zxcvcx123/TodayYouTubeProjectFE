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

export function MiniHomepyLeftContainer({ member, introduce, setIntroduce }) {
  const { loginInfo } = useContext(DetectLoginContext);

  const memberId = member ? member.member_id : <Spinner />;
  const nickname = member ? member.nickname : <Spinner />;
  const imageUrl = member ? member.image_url : <Spinner />;

  /*-----------------------------------------------------------*/
  const [editIntroduce, setEditIntroduce] = useState(false);
  const [introduceColors, setIntroduceColors] = useState([]);
  useEffect(() => {
    let nonSpaceCharCount = 0;

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
  }, [introduce]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntroduceColors((currentColors) =>
        currentColors.map(
          (color) => color && (color === "#41A541" ? "tomato" : "#41A541"),
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
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
        justifyContent={"space-around"}
      >
        <Box>
          <Avatar borderRadius="20px" boxSize="280px" src={imageUrl} />
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          fontFamily={"'Jua', sans-serif"}
          w={"100%"}
          flexDirection={"column"}
          justifyContent={"center"}
          mt={5}
          mb={5}
        >
          <MemberRoleBadge />
          <Text pt={"3px"} fontSize={"40px"} color={"#dcdcdc"}>
            {nickname}
          </Text>
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
                {introduce.split("").map((char, index) => (
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
