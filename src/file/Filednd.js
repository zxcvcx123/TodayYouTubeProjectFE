import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  Box,
  FormControl,
  FormLabel,
  Img,
  Input,
  Text,
} from "@chakra-ui/react";

export function Filednd({ uploadFiles, setUploadFiles }) {
  const [isActive, setIsActive] = useState(false);
  // const [uploadFiles, setUploadFiles] = useState([]);
  const [preViews, setPreviews] = useState([]);

  // 파일 미리보기
  // re-render 시켜야 첨부한 파일을 인식 (Drop 이벤트 경우)
  useEffect(() => {
    // 파일이 있으면 동작 실행
    if (uploadFiles.length !== 0) {
      // 새 배열 선언
      const newPreviews = [];
      // 반복문
      for (let i = 0; i < uploadFiles.length; i++) {
        // 파일리더 객체 선언
        const reader = new FileReader();
        // 파일리더의 onloadend 메소드 실행
        reader.onloadend = () => {
          // 파일을 읽은 값(reader.result)를 새 배열(newPreviews)에 추가
          newPreviews.push(reader.result);
          // 배열에 추가된 파일이랑 기존 파일이 같으면
          if (newPreviews.length === uploadFiles.length) {
            // 가공된 파일 배열을 새 state에 추가
            setPreviews(newPreviews);
          }
        };
        // html에 이미지를 미리보기 할 수 있게 url주소로 나옴
        reader.readAsDataURL(uploadFiles[i]);
      }
    }
  }, [uploadFiles]);

  // 파일 제거
  function removeUploadFile(index) {
    const newUploadFile = [...uploadFiles];
    newUploadFile.splice(index, 1);
    setUploadFiles(newUploadFile);
    setPreviews(preViews.filter((_, i) => i !== index));
  }

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
    setUploadFiles(Array.from(e.dataTransfer.files));
  }

  function handleUploadFile(e) {
    setUploadFiles(e.target.files);
    setUploadFiles([...uploadFiles, ...e.target.files]);
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

          {uploadFiles.length === 0 && (
            <Text lineHeight={"150px"}>Click and Drag File.</Text>
          )}
          {uploadFiles.length === 0 || (
            <Box id="image_container" display={"flex"} gap={2} h={"80%"}>
              {preViews.map((preview, index) => (
                <Box key={index} display={"inline-block"} h={"80%"}>
                  <Img src={preview} alt={`미리보기 ${index + 1}`} h={"100%"} />
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
