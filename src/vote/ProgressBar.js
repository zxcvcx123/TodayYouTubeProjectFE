import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const ProgressBar = ({
  optionOnePercentage,
  optionTwoPercentage,
  listTotalVotes,
  listOptionOneVotes,
  listOptionTwoVotes,
  isList,
}) => {
  let styleOne;
  let styleTwo;

  let listOptionOnePercentage;
  let listOptionTwoPercentage;

  if (isList === 1) {
    // 리스트에서 보여줄때
    listOptionOnePercentage =
      listTotalVotes > 0
        ? ((listOptionOneVotes / listTotalVotes) * 100).toFixed(1)
        : "0.0";

    // 전체 투표 중 나머지 비율을 계산
    listOptionTwoPercentage = (
      100 - parseFloat(listOptionOnePercentage)
    ).toFixed(1);

    styleOne = {
      width: `${listOptionOnePercentage}%`,
      backgroundColor: "#4299E1",
      height: "100%",
      display: "inline-block",
      textAlign: "center",
    };

    styleTwo = {
      width: `${listOptionTwoPercentage}%`,
      backgroundColor: "#F56565",
      height: "100%",
      display: "inline-block",
      textAlign: "center",
    };
  } else {
    styleOne = {
      width: `${optionOnePercentage}%`,
      backgroundColor: "#4299E1",
      height: "100%",
      display: "inline-block",
      textAlign: "center",
    };

    styleTwo = {
      width: `${optionTwoPercentage}%`,
      backgroundColor: "#F56565",
      height: "100%",
      display: "inline-block",
      textAlign: "center",
    };
  }

  return (
    <Box style={{ width: "100%", backgroundColor: "#ddd", height: "40px" }}>
      <Box style={styleOne}>
        <Text fontWeight="bold" fontSize="2xl">
          {isList === 1 ? listOptionOnePercentage : optionOnePercentage}%
        </Text>
      </Box>
      <Box style={styleTwo}>
        <Text fontWeight="bold" fontSize="2xl">
          {isList === 1 ? listOptionTwoPercentage : optionTwoPercentage}%
        </Text>
      </Box>
    </Box>
  );
};

export default ProgressBar;
