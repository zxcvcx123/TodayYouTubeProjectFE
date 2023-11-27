import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Box, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export function Filednd({ setUploadFile, uploadFile }) {
  const [isActive, setIsActive] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [previews, setPreviews] = useState([]);

  function handleDragStart(e) {
    setIsActive(true);
    e.preventDefault();
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDragEnd(e) {
    setIsActive(false);
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    setUploadFile(Array.from(e.dataTransfer.files));
  }

  function handleUploadFile(e) {
    setUploadFile(Array.from(e.target.files));
    setIsImg(true);
  }

  // 파일 미리보기
  useEffect(() => {
    if (uploadFile) {
      const newPreviews = [];
      for (let i = 0; i < uploadFile.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === uploadFile.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(uploadFile[i]);
      }
    }
  }, [uploadFile]);

  // 파일 제거
  function removeUploadFile(index) {
    const newUploadFile = [...uploadFile];
    newUploadFile.splice(index, 1);
    setUploadFile(newUploadFile);
  }

  return (
    <Box>
      <FormControl w={"100%"} h={"200px"} border={"3px dashed black"}>
        <FormLabel
          textAlign={"center"}
          w={"100%"}
          h={"100%"}
          _hover={{
            backgroundColor: "#efeef3",
            color: "darkgray",
          }}
          style={
            isActive
              ? {
                  backgroundColor: "#efeef3",
                  color: "darkgray",
                }
              : {}
          }
          onDragEnter={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
        >
          <Input
            display={"none"}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadFile}
          />

          {isImg || <Text lineHeight={"150px"}>Click and Drag File.</Text>}
          {isImg && (
            <Box id="image_container" display={"flex"} gap={2} h={"80%"}>
              {previews.map((preview, index) => (
                <Box key={index} display={"inline-block"} h={"80%"}>
                  <img src={preview} alt={`미리보기 ${index + 1}`} h={"100%"} />
                  <button onClick={() => removeUploadFile(index)}>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      color="red"
                      mt={"0%"}
                    />
                  </button>
                </Box>
              ))}
            </Box>
          )}

          <Text lineHeight={"50px"}>
            파일 용량은 최대 10MB, 1개당 1MB 까지 가능 합니다.
          </Text>
        </FormLabel>
      </FormControl>
    </Box>
  );
}
