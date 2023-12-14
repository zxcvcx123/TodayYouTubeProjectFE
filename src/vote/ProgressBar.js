import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const ProgressBar = ({ optionOneVotes, optionTwoVotes }) => {
  let totalVotes = optionOneVotes + optionTwoVotes;
  let optionOnePercentage = "0.0";
  let optionTwoPercentage = "0.0";

  if (totalVotes > 0) {
    optionOnePercentage = ((optionOneVotes / totalVotes) * 100).toFixed(1);
    optionTwoPercentage = ((optionTwoVotes / totalVotes) * 100).toFixed(1);
  }

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
    <Flex style={{ width: "80%", backgroundColor: "#ddd", height: "40px" }}>
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
    </Flex>
  );
};

export default ProgressBar;
