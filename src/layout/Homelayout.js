import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import LoginProvider from "../component/LoginProvider";

export function HomeLayout() {
  return (
    <LoginProvider>
      <Box>
        <Nav />

        <Outlet />
        {/* Footer를 바닥에 고정시키려고 빈 컨텐츠 넣었습니다 */}
        <Box height={"auto"} minHeight="100%" paddingBottom="400px"></Box>
        <Footer height="400px" />
      </Box>
    </LoginProvider>
  );
}
