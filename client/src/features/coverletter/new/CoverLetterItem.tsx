import { styled } from 'styled-components';

import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { BiX } from 'react-icons/bi';

import { coverLetterType } from '@/src/entities/coverLetter';

import { styleMixin, V } from '@/src/shared/styles';
import { HideSvg } from '@/src/shared/ui';
import { ResizeableTextarea } from '@/src/shared/ui/uncontrolled';

type Props = {
  errors: FieldErrors<coverLetterType.ICoverLetter>;
  register: UseFormRegister<coverLetterType.ICoverLetter>;
  index: number;
  remove: (index?: number | number[]) => void;
};

export default function CoverLetterItem({
  errors,
  index,
  register,
  remove,
}: Props) {
  return (
    <ItemsContainer>
      <HideSvg
        label="삭제"
        Logo={<BiX />}
        onClick={() => remove(index)}
        sx={{
          position: 'absolute',
          right: 2,
          top: 2,
          fontSize: '2em',
        }}
      />
      <ResizeableTextarea
        register={register(`qnaList.${index}.question`)}
        placeholder="내용을 작성해주세요."
        maxSize={10}
        style={{ resize: 'vertical' }}
      />
      <ResizeableTextarea
        register={register(`qnaList.${index}.answer`)}
        placeholder="내용을 작성해주세요."
        maxSize={30}
        style={{ minHeight: '15rem', resize: 'vertical' }}
      />
      {errors.qnaList?.[index]?.question && (
        <p style={{ color: 'red' }}>{errors.qnaList[index].question.message}</p>
      )}
    </ItemsContainer>
  );
}

const ItemsContainer = styled.div`
  ${styleMixin.Column()}
  position: relative;
  width: 100%;
  padding: 2.5em 0.8em 1em 0.8em;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${(props) => props.theme.colors.text};
  min-height: 25rem;
  border-radius: 8px;
  box-shadow: ${V.boxShadow3};
  margin: 2.5rem auto;
`;
