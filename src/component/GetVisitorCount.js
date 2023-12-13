import React from "react";
import axios from "axios";

function getVisitorCount() {
  // 방문자 수 가져오기
  return axios.get("/api/getVisitorCount");
}

export default getVisitorCount;
