import React, { useEffect } from "react";

import styled from "styled-components";

import { ScrollBar } from "@/styles/GlobalStyle";
import CoverLetterItem from "./CoverLetterItem";

import { useFetchDetailCoverLetter } from "@/api/coverLetter/queries";

interface CoverLetterProps {
  essayId: number;
}

const CoverLetterDetail = ({ essayId = 0 }: CoverLetterProps) => {
  const { data: coverLetterDetail } = useFetchDetailCoverLetter(essayId);

  return (
    <CoverLetterDetailStyle>
      {coverLetterDetail && (
        <CoverLetterContainer key={coverLetterDetail.essayId}>
          <h2 className="essay_title">{coverLetterDetail.title}</h2>
          <>
            {coverLetterDetail.qnaList.map(qna => (
              <CoverLetterItem key={qna.qnaId} {...qna} />
            ))}
          </>
        </CoverLetterContainer>
      )}
    </CoverLetterDetailStyle>
  );
};

export default React.memo(CoverLetterDetail);

const CoverLetterDetailStyle = styled.div`
  ${ScrollBar}
  padding: 15px;
  background-color: #191919;
  border-radius: 10.5px;
  color: #dad6d1;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
`;
const CoverLetterContainer = styled.div`
  .essay_title {
    text-align: center;
    color: #fff;
  }
`;
