<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { computed, ref } from 'vue';

import { AuthenticationLogin, z } from '@vben/common-ui';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

type LoginMode = 'code' | 'password';

const authStore = useAuthStore();
const loginMode = ref<LoginMode>('password');
const CODE_LENGTH = 6;

const formSchema = computed((): VbenFormSchema[] => {
  const mobileField: VbenFormSchema = {
    component: 'VbenInput',
    componentProps: {
      autocomplete: 'tel',
      placeholder: '请输入手机号',
    },
    defaultValue: '13800138000',
    fieldName: 'phoneNumber',
    label: '手机号',
    rules: z
      .string()
      .min(1, { message: '请输入手机号' })
      .refine((value) => /^1\d{10}$/.test(value), {
        message: '请输入正确的手机号',
      }),
  };

  if (loginMode.value === 'code') {
    return [
      mobileField,
      {
        component: 'VbenPinInput',
        componentProps: {
          codeLength: CODE_LENGTH,
          createText: (countdown: number) =>
            countdown > 0 ? `${countdown} 秒后重发` : '获取验证码',
          placeholder: '请输入验证码',
        },
        fieldName: 'code',
        label: '验证码',
        rules: z.string().length(CODE_LENGTH, {
          message: `请输入 ${CODE_LENGTH} 位验证码`,
        }),
      },
    ];
  }

  return [
    mobileField,
    {
      component: 'VbenInputPassword',
      componentProps: {
        autocomplete: 'current-password',
        placeholder: '请输入密码',
      },
      defaultValue: '123456',
      fieldName: 'password',
      label: '密码',
      rules: z.string().min(1, { message: '请输入密码' }),
    },
  ];
});

function setLoginMode(mode: LoginMode) {
  loginMode.value = mode;
}

async function handleLogin(values: Recordable<any>) {
  await authStore.authLogin({
    code: loginMode.value === 'code' ? values.code : undefined,
    password: loginMode.value === 'password' ? values.password : undefined,
    phoneNumber: values.phoneNumber,
  });
}
</script>

<template>
  <AuthenticationLogin
    :class="{
      '[&_[aria-label=login]]:mt-4': loginMode === 'code',
    }"
    class="h-[380px]"
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    :show-code-login="false"
    :show-forget-password="loginMode === 'password'"
    :show-qrcode-login="false"
    :show-register="false"
    :show-remember-me="false"
    :show-third-party-login="false"
    submit-button-text="登录"
    @submit="handleLogin"
  >
    <template #title>
      <div class="mb-8">
        <img
          alt="旺宝AI服务商后台"
          class="mb-8 h-10 w-auto"
          src="/images/wanbao-logo.svg"
        />
        <div class="mt-8 flex items-center justify-start gap-8" role="tablist">
          <button
            :class="
              loginMode === 'password'
                ? 'border-primary font-semibold text-primary'
                : 'border-transparent font-medium text-muted-foreground hover:text-foreground'
            "
            aria-label="密码登录"
            class="w-fit border-b-2 px-0 pb-3 text-lg transition-colors"
            role="tab"
            type="button"
            @click="setLoginMode('password')"
          >
            密码登录
          </button>
          <button
            :class="
              loginMode === 'code'
                ? 'border-primary font-semibold text-primary'
                : 'border-transparent font-medium text-muted-foreground hover:text-foreground'
            "
            aria-label="验证码登录"
            class="w-fit border-b-2 px-0 pb-3 text-lg transition-colors"
            role="tab"
            type="button"
            @click="setLoginMode('code')"
          >
            验证码登录
          </button>
        </div>
      </div>
    </template>
  </AuthenticationLogin>
</template>
