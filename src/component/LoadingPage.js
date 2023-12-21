import React from "react";
import "../css/loadingPage.css";
import { Center } from "@chakra-ui/react";
function LoadingPage(props) {
  const text = "페이지 불러오는 중...";
  return (
    <Center h={"900px"} bg={"#f2f2f2"}>
      <div className="header-text">
        <span>페</span>
        <span>이</span>
        <span>지</span>
        <span>&nbsp;</span>
        <span>로</span>
        <span>딩</span>
        <span>&nbsp;</span>
        <span>중</span>
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </div>
    </Center>
  );
}

export default LoadingPage;
