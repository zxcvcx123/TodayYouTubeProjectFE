import React, { useEffect } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

function VotePage({ page }) {
  const pageNumbers = [];

  for (let i = page.startPage; i <= page.endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Center>
      <Box>
        {page.initialPage && page.startPage > 5 && (
          <PageButton variant="ghost" pageNumber={page.initialPage}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </PageButton>
        )}
        {page.prevPageNumber && page.startPage > 5 && (
          <PageButton variant="ghost" pageNumber={page.prevPageNumber}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </PageButton>
        )}

        {pageNumbers.map((pageNumber) => (
          <PageButton
            key={pageNumber}
            variant={pageNumber === page.currentPageNumber ? "solid" : "ghost"}
            pageNumber={pageNumber}
          >
            {pageNumber}
          </PageButton>
        ))}

        {page.nextPageNumber && page.endPage > 5 && (
          <PageButton variant="ghost" pageNumber={page.nextPageNumber}>
            <FontAwesomeIcon icon={faAngleRight} />
          </PageButton>
        )}

        {page.lastPageNumber && page.endPage > 5 && (
          <PageButton variant="ghost" pageNumber={page.lastPageNumber}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </PageButton>
        )}
      </Box>
    </Center>
  );
}

export default VotePage;
