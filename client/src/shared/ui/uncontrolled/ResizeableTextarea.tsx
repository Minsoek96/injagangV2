import { ComponentPropsWithRef, FormEventHandler } from 'react';

import { styled } from 'styled-components';

import { UseFormRegisterReturn } from 'react-hook-form';

import { styleMixin, V } from '@/src/shared/styles';

type Props = ComponentPropsWithRef<'textarea'> & {
  maxSize: number;
  minSize?: number;
  register: UseFormRegisterReturn;
};
export default function ResizeableTextarea({
  minSize = 5,
  maxSize,
  register,
  ...props
}: Props) {
  const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    const textarea = e.target as HTMLTextAreaElement;
    const maxRemSize = maxSize * 10;
    const minRemSize = minSize * 10;

    // 최소 높이를 적용하기 위해 초기화 및 제한
    textarea.style.height = `${minRemSize}px`;
    const newHeight = Math.max(
      Math.min(textarea.scrollHeight, maxRemSize),
      minRemSize,
    );

    textarea.style.height = `${newHeight}px`;
    textarea.style.overflowY = newHeight >= maxRemSize ? 'auto' : 'hidden';
  };

  return (
    <StyledTextarea
      $minSize={minSize}
      onInput={handleInput}
      {...register}
      {...props}
    />
  );
}

type StyleProps = {
  $minSize: number;
};
const StyledTextarea = styled.textarea<StyleProps>`
  ${styleMixin.ScrollBar}
  resize: none;
  outline: none;

  font-size: 1.6rem;
  font-family: ${V.malgunGothic};
  font-weight: normal;
  line-height: 2;
  border: 1px solid ${(props) => props.theme.colors.mainLine};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;

  height: ${(props) => `${props.$minSize}rem`};
  background-color: ${(props) => props.theme.colors.textArea};
  color: ${(props) => props.theme.colors.text};
  margin: 0.8rem auto;
`;
