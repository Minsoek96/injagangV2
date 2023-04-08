import React, { useState } from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";

const AddQustionListStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    margin: auto 2px;
  }
`;
const Input = styled.input`
  height: 40px;
  width: 37.5%;
`;

interface AddQustionListProps {
  handleAddQuestion: (title:string) => void;
  handleCancelQuestion: () => void;
}
const AddQustionList = ({
  handleAddQuestion,
  handleCancelQuestion,
}: AddQustionListProps) => {
  const [title, setTitle] = useState<string>("");
  return (
    <AddQustionListStyle>
      <Input
        name="addTitle"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
      ></Input>
      <div>
        <CustomButton
          Size={{ width: "63px", font: "15px" }}
          onClick={()=>handleAddQuestion(title)}
          text={"확인"}
        />
        <CustomButton
          Size={{ width: "63px", font: "15px" }}
          onClick={handleCancelQuestion}
          text={"취소"}
        />
      </div>
    </AddQustionListStyle>
  );
};

export default AddQustionList;
