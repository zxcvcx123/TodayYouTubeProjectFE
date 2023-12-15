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

  console.log("option: " + optionOnePercentage);

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
    <>
      {optionOnePercentage === "0.0" && optionTwoPercentage === "0.0" ? (
        <Flex
          style={{
            width: "100%",
            backgroundColor: "#ddd",
            height: "40px",
            justifyContent: "center",
          }}
        >
          <Text fontWeight="bold" fontSize="2xl">
            0.0%
          </Text>
        </Flex>
      ) : (
        <Flex
          style={{ width: "100%", backgroundColor: "#ddd", height: "40px" }}
        >
          {optionTwoPercentage === "100.0" || (
            <Box style={styleOne}>
              <Text fontWeight="bold" fontSize="2xl">
                {optionOnePercentage}%
              </Text>
            </Box>
          )}
          {optionOnePercentage === "100.0" || (
            <Box style={styleTwo}>
              <Text fontWeight="bold" fontSize="2xl">
                {optionTwoPercentage}%
              </Text>
            </Box>
          )}
        </Flex>
      )}
    </>
  );
};

export default ProgressBar;
