import { baseRequestClient, requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    code?: string;
    password?: string;
    phoneNumber?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    accessToken: string;
  }

  export interface ResetCodeParams {
    code: string;
    phoneNumber: string;
  }

  export interface ResetPasswordParams extends ResetCodeParams {
    password: string;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/auth/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return baseRequestClient.post<AuthApi.RefreshTokenResult>('/auth/refresh', {
    withCredentials: true,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return baseRequestClient.post('/auth/logout', {
    withCredentials: true,
  });
}

export async function verifyResetCodeApi(data: AuthApi.ResetCodeParams) {
  return baseRequestClient.post('/auth/verify-reset-code', data);
}

export async function resetPasswordApi(data: AuthApi.ResetPasswordParams) {
  return baseRequestClient.post('/auth/reset-password', data);
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return requestClient.get<string[]>('/auth/codes');
}
