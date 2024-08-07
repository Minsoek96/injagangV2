import dynamic from 'next/dynamic';

import { useEffect } from 'react';

import styled from 'styled-components';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import { useFeedStore } from '@/src/entities/qnaboard';

import { Spinner } from '@/src/shared/components';
import { styleMixin } from '@/src/shared/styles';

const QuestionDetailView = dynamic(
  () => import('@/src/features/qna/detail/QuestionDetailView'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const FeedBackComposer = dynamic(
  () => import('@/src/features/feedback-composer/FeedBackComposer'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

const TargetFeedBackView = dynamic(
  () => import('@/src/features/qna/feedback/TargetFeedBackView'),
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

type AnswerProps = {
  dehydratedState: DehydratedState;
};

function Answer({ dehydratedState }: AnswerProps) {
  const { initTargetFeed } = useFeedStore();

  useEffect(
    () => () => {
      initTargetFeed();
    },
    [],
  );

  return (
    <ViewStyle>
      <HydrationBoundary state={dehydratedState}>
        <QuestionDetailView />
        <FeedBackComposer />
        <TargetFeedBackView />
      </HydrationBoundary>
    </ViewStyle>
  );
}

export default Answer;

const ViewStyle = styled.div`
  ${styleMixin.Column()}
  color: ${(props) => props.theme.colors.boardText};
  width: 100%;
`;
