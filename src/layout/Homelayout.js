import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function HomeLayout() {
  return (
    <Box>
      <Nav />
      <Outlet />
      <Footer />
    </Box>
  );
}
