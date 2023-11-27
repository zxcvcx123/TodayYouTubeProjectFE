import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

function BoardLike({ id, like, board, onClick }) {
  // 게시물 조회시 좋아요 출력

  return (
    <>
      <Flex>
        <Button onClick={onClick}>
          {like.like && <FontAwesomeIcon icon={fullHeart} />}
          {like.like || <FontAwesomeIcon icon={emptyHeart} />}
        </Button>
        <Heading>{board.countlike}</Heading>
      </Flex>
    </>
  );
}

export default BoardLike;
