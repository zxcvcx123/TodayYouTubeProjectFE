import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import MemberInfo from "../member/memberInfo/MemberInfo";

function AdminMemberInfo(props) {
  const { member_id } = useParams();
  const [memberInfoList, setMemberInfoList] = useState(null);

  useEffect(() => {
    axios
      .get("/api/admin/member/" + member_id)
      .then((response) => setMemberInfoList(response.data));
  }, []);

  return;
  <Box>123</Box>;
}

export default AdminMemberInfo;
