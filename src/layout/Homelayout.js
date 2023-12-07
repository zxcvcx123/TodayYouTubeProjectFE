import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import LoginProvider from "../component/LoginProvider";
import { createContext, useRef, useState } from "react";
import Socket from "../socket/Socket";

export function HomeLayout() {
  let test = "테스트1";
  return (
    <LoginProvider>
      <Box>
        <Socket>
          <Nav />
          <Outlet context={{ test }} />
        </Socket>
        {/* Footer를 바닥에 고정시키려고 빈 컨텐츠 넣었습니다 */}
        <Box height={"auto"} minHeight="100%" paddingBottom="1000px"></Box>
        <Footer height="400px" />
      </Box>
    </LoginProvider>
  );
}
