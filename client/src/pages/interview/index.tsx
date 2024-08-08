import dynamic from 'next/dynamic';

import Image from 'next/image';
import roomout from '@/public/assets/roomout.svg';

import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { BiArrowBack } from 'react-icons/bi';

import InterViewListView from '@/src/features/interview-question/ExpectedQuestionLayout';

import {
  MainButton,
  Container,
  StepProgressBar,
} from '@/src/shared/components';
import { V, styleMixin } from '@/src/shared/styles';
import ArrowAnimation from '@/src/features/interview-record/InterViewMenual';
import { useInterViewStore } from '@/src/entities/interview_question';

const InterViewRandomSetting = dynamic(
  () => import('@/src/features/interview-record/InterViewRandomSetting'),
  {
    ssr: false,
  },
);

const InterviewRecord = dynamic(
  () => import('@/src/features/interview-record/interviewRecord'),
  {
    ssr: false,
  },
);

const renderComponent = [
  { render: null, title: '면접영상촬영시작' },
  { render: <InterViewListView />, title: 'Next Step...' },
  { render: <InterViewRandomSetting />, title: 'Next Step...' },
  { render: <h1>준비중...</h1>, title: 'Next Step ...' },
  { render: <InterviewRecord />, title: '면접 준비 완료' },
];

const steps = [
  { title: '약관 동의', id: 'Step_01' },
  { title: '면접 질문 선택', id: 'Step_02' },
  { title: '랜덤 질문 선택', id: 'Step_03' },
  { title: '녹화 설정', id: 'Step_04' },
  { title: '영상 촬영', id: 'Step_05' },
];

const START_SCREEN = 0;
const END_SCREEN = renderComponent.length - 1;
const SECOND_SCREEN = 1;

function Interview() {
  const [curIndex, setCurIndex] = useState<number>(START_SCREEN);
  const { initConfirmQuestions } = useInterViewStore();

  const moveToNextPage = () => {
    setCurIndex((prevIndex) =>
      (prevIndex >= END_SCREEN ? SECOND_SCREEN : prevIndex + 1));
  };

  const moveToPrevPage = () => {
    setCurIndex((prevIndex) =>
      (prevIndex <= START_SCREEN ? START_SCREEN : prevIndex - 1));
  };

  useEffect(
    () => () => {
      initConfirmQuestions();
    },
    [],
  );

  return (
    <InterViewStyle>
      <StepProgressBar stepList={steps} currentStep={curIndex} />
      <RecordComponent>{renderComponent[curIndex].render}</RecordComponent>
      {curIndex === START_SCREEN && (
        <Menual>
          <ImageContainer>
            <Image
              src={roomout}
              alt="roomout"
              width={500}
              height={500}
              quality={100}
            />
          </ImageContainer>
          <ArrowAnimation targetId="Arrow_btn" />
        </Menual>
      )}
      <ControlBtn>
        {curIndex > SECOND_SCREEN && (
          <MainButton
            label={<BiArrowBack />}
            onAction={moveToPrevPage}
            sx={{ width: '50px', font: '3rem' }}
          />
        )}
        <MainButton
          className="Arrow_btn"
          label={renderComponent[curIndex].title}
          onAction={moveToNextPage}
          sx={{
            width: '100%',
            font: '2rem',
            padding: '1em',
          }}
          disabled={curIndex === renderComponent.length - 1}
        />
      </ControlBtn>
    </InterViewStyle>
  );
}

export default Interview;

const InterViewStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 3rem;
  width: 100%;
  height: 60rem;
  min-height: 30rem;

  &:hover {
    transform: scale(1.05);
  }

  @media screen and (max-width: ${V.mediaMobile}) {
    height: 100%;
  }
`;

const Menual = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  height: 50rem;

  @media screen and (max-width: 800px) {
    .interViewImg_box {
      width: 85%;
      height: 100%;
    }
  }
`;

const ControlBtn = styled.div`
  ${styleMixin.Flex()}
  margin-top: 3rem;
  width: ${V.lgItemWidth};
  gap: 8px;
  @media screen and (max-width: 800px) {
    width: ${V.smItemWidth};
  }

  button {
    height: 4rem;
  }
`;

const RecordComponent = styled(Container.ItemBase)`
  ${styleMixin.Column('flex-start')}
  width: 100%;
  font-family: ${V.malgunGothic};
  margin-top: 5rem;
`;
