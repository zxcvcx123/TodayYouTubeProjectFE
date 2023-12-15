import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import LoginProvider, { DetectLoginContext } from "../component/LoginProvider";
import { createContext, useContext, useRef, useState } from "react";
import Socket from "../socket/Socket";
import MiniHomepy from "../member/minihomepy/MiniHomepy";

export function HomeLayout() {
  let test = "테스트1";

  return (
    // <Box bg="blackAlpha.200">
    <Box bg="rgb(242,242,242)">
      <LoginProvider>
        <Box>
          <Socket>
            <Nav />
            <Box w={"100%"} m={"0 auto"}>
              <Outlet context={{ test }} />
            </Box>
          </Socket>
          {/* Footer를 바닥에 고정시키려고 빈 컨텐츠 넣었습니다 */}
          <Box height={"auto"} minHeight="100%" paddingBottom="1px"></Box>
          <Footer height="400px" />
        </Box>
      </LoginProvider>
    </Box>
  );
}
