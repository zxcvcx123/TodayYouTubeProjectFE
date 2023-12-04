import React, { useContext } from "react";
import { DetectLoginContext } from "../component/LoginProvider";
import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";

function MemberProfile(props) {
  const { loginInfo } = useContext(DetectLoginContext);
  return (
    <>
      <HStack>
        <Flex width={"150px"}>
          <Avatar src="https://bit.ly/sage-adebayo" />
          <Box ml="3">
            <Text fontWeight="bold">{loginInfo.nickname}</Text>
            <Text fontSize="sm">{loginInfo.role_name}</Text>
          </Box>
        </Flex>
      </HStack>
    </>
  );
}

export default MemberProfile;
