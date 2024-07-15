import styled from 'styled-components';

import { styleMixin } from '@/src/shared/styles';
import UserQuestionPlayList from './PlayList/UserQuestionPlayList';
import ExpectedQuestionSelector from './ExpectedQuestion/ExpectedQuestionSelector';

function ExplanationContent() {
  return (
    <Explanation>
      <h2>자신만의 면접 질문 리스트를 만들어주세요.</h2>
      <p>(선택사항)샘플 리스트를 선택하여 추가하면 됩니다.</p>
      <p>(선택사항)자신이 원하는 질문도 추가하면 됩니다.</p>
      <p>
        랜덤셋팅도 있으니 넘어가셔도 됩니다. 자신만의 질문과
        랜덤셋팅을조합할수도있습니다.
      </p>
    </Explanation>
  );
}

function ExpectedQuestionLayout() {
  return (
    <InterViewListViewStyle>
      <ExplanationContent />
      <SwitchContainer>
        <LeftContainer>
          <ExpectedQuestionSelector />
        </LeftContainer>
        <UserQuestionPlayList />
      </SwitchContainer>
    </InterViewListViewStyle>
  );
}

export default ExpectedQuestionLayout;

const InterViewListViewStyle = styled.div`
  ${styleMixin.Column()}
  width: 100%;
  height: 90%;
  margin-bottom: 40px;
  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

const SwitchContainer = styled.div`
  ${styleMixin.Flex()}
  width: 90%;
  gap: 25px;
  @media screen and (max-width: 1200px) {
    ${styleMixin.Column()}
  }
`;

const LeftContainer = styled.div`
  width: 45%;
  @media screen and (max-width: 1200px) {
    width: 100%;
  }
`;

const Explanation = styled.div`
  margin: 30px;
`;
