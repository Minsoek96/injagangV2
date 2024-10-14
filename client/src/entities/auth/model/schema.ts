import { z } from 'zod';

export const password = z
  .object({
    nowPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    changePassword: z
      .string()
      .min(8, '비밀번호는 최소 8자리여야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.',
      ),
    changePasswordCheck: z
      .string()
      .min(8, '비밀번호는 최소 8자리여야 합니다.')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        '비밀번호는 대문자, 소문자, 숫자를 포함해야 합니다.',
      ),
  })
  .refine((data) => data.changePassword === data.changePasswordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['changePasswordCheck'],
  });

export const signin = z.object({
  loginId: z
    .string()
    .min(1, '아이디를 입력해주세요.'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 최소 8자리 이상이어야 합니다.')
    .regex(
      /[a-zA-Z]/,
      '비밀번호에는 최소 하나의 알파벳 문자가 포함되어야 합니다.',
    )
    .regex(/[0-9]/, '비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.')
    .regex(
      /[^a-zA-Z0-9]/,
      '비밀번호에는 최소 하나의 특수 문자가 포함되어야 합니다.',
    ),
});