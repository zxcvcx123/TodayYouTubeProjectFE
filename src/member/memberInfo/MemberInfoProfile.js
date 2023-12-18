import { Avatar, Box, Button, Image, Input, useToast } from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { DetectLoginContext } from "../../component/LoginProvider";

export function MemberInfoProfile() {
  const { loginInfo, token } = useContext(DetectLoginContext);
  const [profileImageSrc, setProfileImageSrc] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();
  const handleProfileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const render = new FileReader();
      render.onload = (e) => {
        setProfileImageSrc(e.target.result);
      };
      render.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append("updateProfileFiles", file);
    formData.append("member_id", loginInfo.member_id);

    axios
      .postForm("/api/member/info/updateProfileImage", formData)
      .then(() => {
        toast({
          description: "프로필이 저장되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          description: "저장 중에 문제가 발생했습니다",
          status: "error",
        });
      });
  };
  return (
    <>
      {profileImageSrc !== null ? (
        <Image
          borderRadius="full"
          boxSize="250px"
          src={profileImageSrc}
          alt=""
        />
      ) : loginInfo !== null ? (
        <Avatar borderRadius="full" boxSize="250px" src={loginInfo.image_url} />
      ) : (
        <Avatar
          borderRadius="full"
          boxSize="250px"
          src="https://bit.ly/broken-link"
        />
      )}
      <Box
        backgroundColor={"#d2d2d2"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        w={"40px"}
        h={"40px"}
        borderRadius={"20px"}
        position={"absolute"}
        top={"240px"}
        left={"230px"}
      >
        <Button borderRadius={"25px"}>
          <AttachmentIcon
            color="black"
            fontSize={"18px"}
            onClick={handleProfileButtonClick}
          />
        </Button>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleProfileChange}
        />
      </Box>
    </>
  );
}
