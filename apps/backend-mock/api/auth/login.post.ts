import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import {
  clearRefreshTokenCookie,
  setRefreshTokenCookie,
} from '~/utils/cookie-utils';
import { generateAccessToken, generateRefreshToken } from '~/utils/jwt-utils';
import { MOCK_USERS } from '~/utils/mock-data';
import {
  forbiddenResponse,
  useResponseError,
  useResponseSuccess,
} from '~/utils/response';

export default defineEventHandler(async (event) => {
  const { code, password, phoneNumber, username } = await readBody(event);
  const account = phoneNumber || username;
  const isCodeLogin = Boolean(code);

  if (!account || (!password && !code)) {
    setResponseStatus(event, 400);
    return useResponseError(
      'BadRequestException',
      'Phone number and password or verification code are required',
    );
  }

  const findUser = MOCK_USERS.find(
    (item) =>
      (item.username === account || item.mobile === account) &&
      (isCodeLogin ? code === '123456' : item.password === password),
  );

  if (!findUser) {
    clearRefreshTokenCookie(event);
    return forbiddenResponse(
      event,
      isCodeLogin
        ? 'Phone number or verification code is incorrect.'
        : 'Phone number or password is incorrect.',
    );
  }

  const accessToken = generateAccessToken(findUser);
  const refreshToken = generateRefreshToken(findUser);

  setRefreshTokenCookie(event, refreshToken);

  return useResponseSuccess({
    ...findUser,
    accessToken,
  });
});
