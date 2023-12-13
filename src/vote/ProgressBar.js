import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const ProgressBar = ({ optionOnePercentage, optionTwoPercentage }) => {
  const styleOne = {
    width: `${optionOnePercentage}%`,
    backgroundColor: "#4299E1",
    height: "100%",
    display: "inline-block",
    textAlign: "center",
  };

  const styleTwo = {
    width: `${optionTwoPercentage}%`,
    backgroundColor: "#F56565",
    height: "100%",
    display: "inline-block",
    textAlign: "center",
  };

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between">
        <Box style={{ width: "100%", backgroundColor: "#ddd", height: "40px" }}>
          <Box style={styleOne}>
            <Text fontWeight="bold" fontSize="2xl">
              {optionOnePercentage}%
            </Text>
          </Box>
          <Box style={styleTwo}>
            <Text fontWeight="bold" fontSize="2xl">
              {optionTwoPercentage}%
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProgressBar;
