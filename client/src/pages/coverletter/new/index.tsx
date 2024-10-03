import { Suspense, useEffect } from 'react';

import { styled } from 'styled-components';

import { CoverLetterCreator } from '@/src/features/coverletter/new';
import useTemplateStoreManager from '@/src/features/template/hooks/useTemplateStoreManager';

import { styleMixin } from '@/src/shared/styles';
import { Spinner } from '@/src/shared/ui';

function CoverLetterEditorPage() {
  const { clearCurTemplate } = useTemplateStoreManager();

  useEffect(
    () => () => {
      clearCurTemplate();
    },
    [],
  );
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
