import React, { useState } from "react";
import { Box, Button, Center, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

function PageButton({ variant, children, pageNumber }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  function handleClick() {
    params.set("p", pageNumber);
    navigate("?" + params);
  }

  return (
    <Button variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
}

function Pagination({ pageInfo }) {
  const navigate = useNavigate();
  const pageNumbers = [];

  // if (pageInfo == null) {
  //   return <Spinner />;
  // }

  for (let i = pageInfo.startPageNumber; i <= pageInfo.endPageNumber; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center>
      <Box>
        {pageInfo.initialPage && (
          <PageButton variant="ghost" pageNumber={pageInfo.initialPage}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </PageButton>
        )}
        {pageInfo.prevPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.prevPageNumber}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageButton>
        )}

        {pageNumbers.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            variant={
              pageNumber === pageInfo.currentPageNumber ? "solid" : "ghost"
            }
            pageNumber={pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}

        {pageInfo.nextPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.nextPageNumber}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PageButton>
        )}

        {pageInfo.lastPageNumber && (
          <PageButton variant="ghost" pageNumber={pageInfo.lastPageNumber}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </PageButton>
        )}
      </Box>
    </Center>
  );
}

export default Pagination;
