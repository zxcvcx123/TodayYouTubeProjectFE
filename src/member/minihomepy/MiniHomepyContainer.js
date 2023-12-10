import React from "react";
import LoginProvider from "../../component/LoginProvider";
import { Box } from "@chakra-ui/react";
import Socket from "../../socket/Socket";
import { Nav } from "../../layout/Nav";
import { Outlet } from "react-router-dom";
import { Footer } from "../../layout/Footer";

function MiniHomepyContainer(props) {
  return (
    <>
      <LoginProvider>
        <Outlet />
      </LoginProvider>
    </>
  );
}

export default MiniHomepyContainer;
