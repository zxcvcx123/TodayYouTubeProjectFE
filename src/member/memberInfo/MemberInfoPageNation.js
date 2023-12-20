import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Badge, Box, Button, Center, Flex, Kbd } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function PageButton({ variant, pageNumber, children }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  function handleClick() {
    params.set("pg", pageNumber);
    navigate("?" + params);
  }
  return (
    <>
      <Button
        variant={variant}
        onClick={handleClick}
        border={"1px solid rgb(226,228,232)"}
        borderRadius={"5px"}
      >
        {children}
      </Button>
    </>
  );
}

function MemberInfoPageNation({ pageNumberInformation }) {
  const pageNumbers = [];
  if (pageNumberInformation !== null) {
    for (
      let i = pageNumberInformation.startPageNumber;
      i <= pageNumberInformation.endPageNumber;
      i++
    ) {
      pageNumbers.push(i);
    }
  }
  return (
    <>
      <Center marginTop={"20px"} w={"100%"}>
        <Box>
          <Flex flexDirection={"column"}>
            <Flex justifyContent={"center"} mb={2}>
              {/* 이전 페이지 그룹이 있을 때만 출력 */}
              {pageNumberInformation !== null &&
                pageNumberInformation.nextPageNumber !== null && (
                  <PageButton
                    variant="ghost"
                    pageNumber={pageNumberInformation.prevPageNumber}
                  >
                    <FontAwesomeIcon icon={faAngleLeft} />
                  </PageButton>
                )}
              {/* 위 pageNumbers 배열에 저장된 번호를 map을 이용해 각각 UI를 그려주고 navigate 값을 설정한다. */}
              {pageNumberInformation !== null &&
                pageNumbers.map((pageNumber) => (
                  <PageButton
                    key={pageNumber}
                    // 현재페이지와 pageNumber요소가 일치할 경우 색 변경
                    variant={
                      pageNumber === pageNumberInformation.currentPageNumber
                        ? "solid"
                        : "ghost"
                    }
                    pageNumber={pageNumber}
                  >
                    {pageNumber}
                  </PageButton>
                ))}
              {/* 이후 페이지 그룹이 있을 때만 출력 */}
              {pageNumberInformation !== null &&
                pageNumberInformation.nextPageNumber !== null && (
                  <PageButton
                    variant="ghost"
                    pageNumber={pageNumberInformation.nextPageNumber}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </PageButton>
                )}
            </Flex>
            <Center>
              <span>
                <Kbd>
                  {" "}
                  {pageNumberInformation !== null &&
                    `총 ${pageNumberInformation.lastPageNumber}페이지 중
                  ${pageNumberInformation.currentPageNumber}페이지`}
                </Kbd>
              </span>
            </Center>
          </Flex>
        </Box>
      </Center>
    </>
  );
}

export default MemberInfoPageNation;
