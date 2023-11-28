import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as fullThumb } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as emptyThumb } from "@fortawesome/free-regular-svg-icons";

function CommentLike({ id }) {
  // TODO: id prop 아직 안넘김

  const [commentlike, setCommentlike] = useState(0);

  useEffect(() => {
    axios
      .get("/api/like/comment/" + id)
      .then((response) => setCommentlike(response.data))
      .catch(() => console.log("bad"))
      .finally(() => console.log("done"));
  }, []);

  return (
    <Flex>
      <Button>
        {commentlike.like && <FontAwesomeIcon icon={fullThumb} />}
        {commentlike.like || <FontAwesomeIcon icon={emptyThumb} />}
      </Button>
      {commentlike.countlike}
    </Flex>
  );
}

export default CommentLike;
