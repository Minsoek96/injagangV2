import { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';

import styled from 'styled-components';

import { MdOutlineModeEditOutline } from 'react-icons/md';

import { boardQueries, useBoardStore } from '@/src/entities/qnaboard';

import { MainButton } from '@/src/shared/components/button';
import { styleMixin } from '@/src/shared/styles';

import {
  HEAD_ITEM,
  ID_KEY,
  ROUTE_TEMPLATE,
  TABLE_KEYS,
} from '@/src/pages/qna/list/const';
import { Container } from '@/src/shared/components';

const BoardListView = dynamic(
  () => import('@/src/widgets/board/BoardListLayout'),
  { ssr: false },
);

const PageNation = dynamic(() => import('@/src/features/qna/PageNation'), {
  ssr: false,
});

const BoardSearch = dynamic(() => import('@/src/features/qna/BoardSearch'), {
  ssr: false,
});

type ListProps = {
  dehydratedState: DehydratedState;
};

function List({ dehydratedState }: ListProps) {
  const router = useRouter();
  const { data } = boardQueries.useFetchBoardList();
  const { initBoardSearch, setTotalPage } = useBoardStore();

  useEffect(() => {
    if (data?.boardInfos) {
      const total = data.totalPage;
      setTotalPage(total);
    }
  }, [data]);

  useEffect(
    () => () => {
      initBoardSearch();
    },
    [],
  );

  return (
    <ListStyle>
      <BoardHeader>
        <MainButton
          label={(
            <span>
              <MdOutlineModeEditOutline />
              글쓰기
            </span>
          )}
          onAction={() => router.push('/qna/question')}
          sx={{
            fontSize: '1.5rem',
            padding: '1rem 2rem',
          }}
        />
      </BoardHeader>
      <HydrationBoundary state={dehydratedState}>
        <BoardListView
          boardInfos={data?.boardInfos || []}
          idKey={ID_KEY}
          headItem={HEAD_ITEM}
          tableKey={TABLE_KEYS}
          route={ROUTE_TEMPLATE}
        />
        <PageNation />
        <BoardSearch />
      </HydrationBoundary>
    </ListStyle>
  );
}

export default List;

const ListStyle = styled.div`
  ${styleMixin.Column('flex-start')}
  width: 100%;
`;

const BoardHeader = styled(Container.ItemBase)`
  ${styleMixin.Flex('flex-end')}
  width: 100%;
`;
