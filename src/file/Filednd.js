import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";

export function Filednd({
  editUploadFiles,
  setEditUploadFiles,
  mode,
  setUploadFiles,
  uploadFiles,
}) {
  const [isActive, setIsActive] = useState(false);
  const [preViews, setPreviews] = useState([]);

  let fileCheck = 0;

  // BoardEdit에서 넘어오는 값들
  const [fileKey, setFileKey] = useState("");
  const [boardId, setBoardId] = useState("");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 파일 미리보기
  // re-render 시켜야 첨부한 파일을 인식 (Drop 이벤트 경우)
  useEffect(() => {
    // 파일이 있으면 동작 실행
    if (uploadFiles.length !== 0) {
      // 수정할 파일 개수와 새로 첨부할 파일 개수가 5개 초과 방지
      if (editUploadFiles && editUploadFiles.length > 0) {
        let max = editUploadFiles.length + uploadFiles.length;
        if (max > 5) {
          alert("파일은 최대 5개까지 첨부 가능합니다.");
          let startIndex = 5 - editUploadFiles.length;

          // 만약 수정할 파일 + 업로드할 파일 수 5개 이상 넘길시 splice로 잘라버리기
          if (uploadFiles.length === 1) {
            uploadFiles.splice(startIndex, 1);
          }
          uploadFiles.splice(startIndex, uploadFiles.length - 1);
          setUploadFiles(uploadFiles);
        }
      }

      // 첨부할 파일 개수가 5개 초과 방지
      if (uploadFiles.length > 5) {
        alert("파일은 최대 5개까지 첨부 가능합니다.");
        let num = uploadFiles.length - 5;
        uploadFiles.splice(5, num);
        setUploadFiles(uploadFiles);
      }

      // 첨부파일 개수 5개까지
      if (uploadFiles.length < 6) {
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
              console.log("new파일길이: " + newPreviews.length);
              console.log("upload파일길이: " + uploadFiles.length);
              setPreviews(newPreviews);
            }
          };
          // html에 이미지를 미리보기 할 수 있게 url주소로 나옴
          reader.readAsDataURL(uploadFiles[i]);
        }
      }
    }
  }, [uploadFiles]);

  // 첨부한 파일 제거
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

  // 파일을 드래그해서 놓을 때
  function handleDrop(e) {
    e.preventDefault();
    setUploadFiles([...uploadFiles, ...Array.from(e.dataTransfer.files)]);
  }

  // 파일창 열려서 첨부할 때
  function handleUploadFile(e) {
    setUploadFiles([...uploadFiles, ...e.target.files]);
  }

  // 수정 게시판에서 기존 파일 제거
  function handleDeleteFile() {
    axios
      .delete("/api/file/delete/" + boardId + "/" + fileKey)
      .then((res) => {
        if (res.status === 200) {
          toast({
            position: "top",
            description: "삭제 완료 됐습니다.",
            status: "success",
          });
          setEditUploadFiles(res.data);
        } else {
          toast({
            position: "top",
            description: "삭제 중 문제가 발생하였습니다.",
            status: "warning",
          });
        }
      })
      .catch()
      .finally(() => onClose());
  }

  return (
    <>
      {/* 파일 리스트 */}
      {mode === "Update" && (
        <Box h={"200px"}>
          <Text>기존 파일</Text>
          <Box
            border={"1px solid #edf1f6"}
            display={"flex"}
            h={"100%"}
            alignItems={"center"}
            gap={5}
          >
            {editUploadFiles.map((fileList) => (
              <Card key={fileList.id} h={"100%"} w={"25%"}>
                <CardBody
                  w={"100%"}
                  h={"100%"}
                  backgroundImage={fileList.fileurl}
                  backgroundSize={"100%"}
                ></CardBody>
                <CardFooter>
                  <Box display={"flex"} alignItems={"center"}>
                    <Link
                      style={{
                        display: "flex",
                        color: "blue",
                        marginRight: "2px",
                      }}
                      to={fileList.fileurl}
                    >
                      {fileList.filename}
                    </Link>
                    <Box
                      _hover={{ cursor: "pointer" }}
                      onClick={() => {
                        onOpen();
                        setFileKey(fileList.id);
                        setBoardId(fileList.board_id);
                      }}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Box>
                  </Box>
                </CardFooter>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      <Box pt={9}>
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
                  <Box key={index} display={"inline-block"} h={"80%"} w={"25%"}>
                    <Img
                      src={preview}
                      alt={`미리보기 ${index + 1}`}
                      h={"100%"}
                      w={"100%"}
                    />
                    <button
                      style={{ width: "15%" }}
                      onClick={() => removeUploadFile(index)}
                    >
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
              파일 용량은 최대 10MB, 1개당 1MB, 최대 5개까지 가능 합니다.
            </Text>
          </FormLabel>
        </FormControl>
      </Box>
      {/* 삭제 모달 */}
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>첨부파일 삭제</ModalHeader>
            <ModalCloseButton />
            <ModalBody>첨부파일을 삭제 하시겠습니까? (복구 불가)</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                취소
              </Button>
              <Button variant="ghost" onClick={handleDeleteFile}>
                삭제
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
