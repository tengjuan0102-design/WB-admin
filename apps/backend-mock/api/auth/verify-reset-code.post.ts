import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { MOCK_USERS } from '~/utils/mock-data';
import { useResponseError, useResponseSuccess } from '~/utils/response';

export default defineEventHandler(async (event) => {
  const { code, phoneNumber } = await readBody(event);
  const user = MOCK_USERS.find((item) => item.mobile === phoneNumber);

  if (!user || code !== '123456') {
    setResponseStatus(event, 400);
    return useResponseError('VerificationCodeError', '手机号或验证码不正确');
  }

  return useResponseSuccess(true);
});
