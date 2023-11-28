import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import axios from "axios";

function Pagination(props) {
  const pageNumbers = [];

  function handlePage() {
    axios.get("/api/paging/");
  }

  return (
    <Box>
      <Button onClick={handlePage} value={1}>
        1
      </Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <Button>5</Button>
    </Box>
  );
}

export default Pagination;
