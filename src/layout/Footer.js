import { Box, Button, Flex, Image, Spacer } from "@chakra-ui/react";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Logo1WithText2 } from "../assets/Image";

export function Footer() {
  return (
    // position, transform 코드는 footer를 바닥에 고정시키려쓴 코드
    <Box
      position="relative"
      transform="translateY(0%)"
      height="300px"
      mt={20}
      backgroundColor="gray.700"
      justifyContent={"space-between"}
    >
      <Flex
        height="100px"
        width="70%"
        m="auto"
        textAlign="center"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Button color="white" size="lg" variant="link">
          <Image src={Logo1WithText2} minW={"150px"} maxW={"150px"} />
        </Button>
        <Button color="white" size="md" variant="link">
          이용약관
        </Button>
        <Button color="white" variant="link">
          개인정보 처리방침
        </Button>
        <Button color="white" variant="link">
          회사소개
        </Button>
        <Button color="white" variant="link">
          제휴안내
        </Button>
        <Button
          size="lg"
          ml="300px"
          color="white"
          variant="link"
          leftIcon={<FontAwesomeIcon icon={faInstagram} />}
        ></Button>
        <Button
          size="lg"
          color="white"
          variant="link"
          leftIcon={<FontAwesomeIcon icon={faYoutube} />}
        ></Button>
        <Button
          size="lg"
          color="white"
          variant="link"
          leftIcon={<FontAwesomeIcon icon={faBlog} />}
        ></Button>
        <Button
          size="lg"
          color="white"
          variant="link"
          leftIcon={<FontAwesomeIcon icon={faFacebook} />}
        ></Button>
        <Button
          size="lg"
          color="white"
          variant="link"
          leftIcon={<FontAwesomeIcon icon={faCommentDots} />}
        ></Button>
      </Flex>
      <Box width="70%" ml="15%" color="white">
        <Box>※ 고객센터</Box>
        <Box>전화번호 : 1588-1234</Box>
        <Box>메일 : help@tdyoutube.com</Box>
      </Box>
      <Box width="70%" ml="15%" color="gray.500" mt={"50px"} fontSize="0.9rem">
        무슨무슨 문구들 ~~~~~~ All rights Reserved
      </Box>
    </Box>
  );
}
