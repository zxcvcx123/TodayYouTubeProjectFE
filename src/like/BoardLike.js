import React, { useEffect, useState } from "react";
import axios from "axios";

function BoardLike(props) {
  useEffect(() => {
    const [Like, setLike] = useState(null);
    axios
      .get("/api/board/like" + id)
      .then((response) => setLike(response.data))
      .catch(() => console.log("error"))
      .finally(() => console.log("완료"));
  }, []);

  return <></>;
}

export default BoardLike;
