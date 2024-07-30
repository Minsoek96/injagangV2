import styled from 'styled-components';
import { styleMixin } from '@/src/shared/styles';
import { useFetchFeedBackList } from '@/src/entities/feedback/queries';
import { useReviseFeed } from '@/src/entities/feedback/mutation';
import TargetFeedBackItems from './TargetFeedBackItems';

import userQnaManager from '../../hooks/userQnaManager';

function TargetFeedBackView() {
  const { targetFeed } = userQnaManager();
  const { data: feedbackList } = useFetchFeedBackList(targetFeed);
  const { mutate: updateFeed } = useReviseFeed(targetFeed);

  return (
    <FeedBackViewStyle>
      {feedbackList?.map((feedback) => (
        <TargetFeedBackItems
          key={feedback.feedbackId}
          handleUpdateFeedBack={updateFeed}
          target={feedback.target}
          owner={feedback.owner}
          content={feedback.content}
          feedbackId={feedback.feedbackId}
        />
      ))}
    </FeedBackViewStyle>
  );
}

export default TargetFeedBackView;

const FeedBackViewStyle = styled.div`
  ${styleMixin.Column()}
  height: 100%;
  width: 100%;
  margin-top: 5vh;
`;