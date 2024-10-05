import { Suspense } from 'react';

import { styled } from 'styled-components';

import { CoverLetterCreator } from '@/src/features/coverletter/new';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui';

function CoverLetterEditorPage() {
  return (
    <CoverLetterStyle>
      <Suspense fallback={<Spinner />}>
        <CoverLetterCreator />
      </Suspense>
    </CoverLetterStyle>
  );
}

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;
