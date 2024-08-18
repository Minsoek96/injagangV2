import { useState, useEffect, useCallback } from 'react';

import { useAuthStore } from '@/src/entities/auth';
import { useQuestionStore } from '@/src/entities/interview_question';
import { useModal } from '@/src/shared/hooks';
import { ERROR_MESSAGES, MODAL_MESSAGES } from '@/src/shared/const';

import { useAddInterViewQ } from '@/src/entities/interview_question/mutations';

const useExpetedPlayListLogic = () => {
  const {
    selectedType, userPlayList, initUserPlayList, setConfirmQuestions,
  } = useQuestionStore();

  const { mutate: dispatchAddQuestions } = useAddInterViewQ();

  const { role } = useAuthStore();
  const { setModal } = useModal();
  const [userQuestion, setUserQuestion] = useState<string[]>([]);

  // 유저가 추가한 리스트를 입력
  useEffect(() => {
    if (userPlayList) {
      setUserQuestion((cur) => [...cur, ...userPlayList]);
    }
  }, [userPlayList]);

  /** 입력한 텍스트 리스트에 추가 */
  const handleAddText = useCallback(
    (text: string) => {
      if (text === '') {
        setModal({
          contents: {
            title: MODAL_MESSAGES.WARNING,
            message: ERROR_MESSAGES.FILL_BLANKS,
          },
        });
        return;
      }
      setUserQuestion((cur) => [...cur, text]);
    },
    [setModal],
  );

  /** 현재 리스트에서 삭제 */
  const handleRemoveText = useCallback(
    (index: number) => {
      const filterItem = [...userQuestion];
      filterItem.splice(index, 1);
      setUserQuestion(filterItem);
    },
    [userQuestion],
  );

  /** ADMIN 인터뷰리스트 추가 */
  const handleSubmit = useCallback(() => {
    if (selectedType === 'ALL') {
      setModal({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          message: ERROR_MESSAGES.DOESN_T_TYPE,
        },
      });
      return;
    }
    const addList = {
      questions: userQuestion,
      questionType: selectedType,
    };
    dispatchAddQuestions(addList);
    initUserPlayList();
    setUserQuestion([]);
  }, [setModal, userQuestion, selectedType]);

  /** 인터뷰촬영시 질문리스트 확정 */
  const handleSetInterViewQuestions = useCallback(() => {
    if (userQuestion.length < 1) {
      setModal({
        contents: {
          title: MODAL_MESSAGES.WARNING,
          message: ERROR_MESSAGES.EMPTY_LIST,
        },
      });
      return;
    }
    setConfirmQuestions(userQuestion);
    initUserPlayList();
    setModal({
      contents: {
        title: MODAL_MESSAGES.MSG,
        message: '리스트 설정이 완료되었습니다.',
      },
    });
  }, [userQuestion, setModal]);

  const roleAction = role === 'ADMIN' ? handleSubmit : handleSetInterViewQuestions;

  return {
    userQuestion,
    handleRemoveText,
    handleAddText,
    roleAction,
  };
};

export default useExpetedPlayListLogic;
