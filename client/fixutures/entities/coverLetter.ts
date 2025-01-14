import {
  ICoverLetterDetail,
  ICoverLetters,
  IReviseCoverLetter,
  IWriteCoverLetter,
} from '@/src/entities/coverLetter/model/type';

/** 샘플 자소서 작성 목록 */
const sampleCoverLetters: IWriteCoverLetter = {
  title: '',
  qnaList: [
    { question: 'testQ', answer: 'testA' },
    { question: 'testQ', answer: 'testA' },
  ],
};

/** 샘플 자소서 수정 목록 */
const sampleReviseCoverLetter: { id: number; data: IReviseCoverLetter } = {
  id: 10000,
  data: sampleCoverLetters,
};

/** 샘플 자소서 API 반환 - 자소서목록 */
const responseCoverLetters: ICoverLetters[] = [
  {
    title: 'test',
    owner: true,
    essayId: 10000,
    questions: ['question1', 'question2', 'question3'],
  },
  {
    title: 'test2',
    owner: true,
    essayId: 10001,
    questions: ['question11', 'question22', 'question33'],
  },
  {
    title: 'test3',
    owner: true,
    essayId: 10002,
    questions: ['question111', 'question222', 'question333'],
  },
];

/** 샘플 자소서 API 반환 - 상세목록 */
const responseDetailCoverLetter: ICoverLetterDetail = {
  essayId: 10000,
  title: 'test coverLetter',
  owner: true,
  qnaList: [
    { qnaId: 10001, question: 'question1', answer: 'answer1' },
    { qnaId: 10002, question: 'question2', answer: 'answer2' },
    { qnaId: 10003, question: 'question3', answer: 'answer3' },
  ],
};

/** 샘플 자소서 리스트 목록 */
const sampleCoverLetter: ICoverLetters = {
  essayId: 10001,
  title: 'sampleCoverLetter',
  owner: true,
  questions: ['test1', 'test2', 'test3'],
};

/** 샘플 자소서 리스트 초기화 */
const emptyCoverLetter = {
  essayId: 0,
  title: '',
  owner: false,
  questions: [],
};

export {
  sampleCoverLetters,
  sampleReviseCoverLetter,
  responseCoverLetters,
  responseDetailCoverLetter,
  sampleCoverLetter,
  emptyCoverLetter,
};
