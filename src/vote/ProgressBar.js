import React from "react";

const ProgressBar = ({ optionOnePercentage, optionTwoPercentage }) => {
  const styleOne = {
    width: `${optionOnePercentage}%`,
    backgroundColor: "blue",
    height: "100%",
    display: "inline-block",
  };

  const styleTwo = {
    width: `${optionTwoPercentage}%`,
    backgroundColor: "red",
    height: "100%",
    display: "inline-block",
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#ddd", height: "20px" }}>
      <div style={styleOne}></div>
      <div style={styleTwo}></div>
    </div>
  );
};

export default ProgressBar;
