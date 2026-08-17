<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationForgetPassword, z } from '@vben/common-ui';
import { ArrowLeft } from '@vben/icons';

import { message } from 'ant-design-vue';

import { resetPasswordApi, verifyResetCodeApi } from '#/api';

defineOptions({ name: 'ForgetPassword' });

const router = useRouter();
const loading = ref(false);
const currentStep = ref<1 | 2>(1);
const verifiedPhone = ref('');
const verifiedCode = ref('');
const CODE_LENGTH = 6;

const pageTitle = computed(() =>
  currentStep.value === 1 ? '验证手机号' : '设置新密码',
);

const pageSubtitle = computed(() =>
  currentStep.value === 1
    ? '请输入手机号并完成验证码验证'
    : '请设置新的登录密码',
);

const submitButtonText = computed(() =>
  currentStep.value === 1 ? '下一步' : '确认重置',
);

const formSchema = computed((): VbenFormSchema[] => {
  if (currentStep.value === 1) {
    return [
      {
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
      },
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
    {
      component: 'VbenInputPassword',
      componentProps: {
        autocomplete: 'new-password',
        placeholder: '请输入新密码',
      },
      fieldName: 'password',
      label: '新密码',
      rules: z.string().min(6, { message: '密码至少为 6 位' }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        autocomplete: 'new-password',
        placeholder: '请再次输入新密码',
      },
      fieldName: 'confirmPassword',
      label: '确认新密码',
      rules: z.string().min(1, { message: '请再次输入新密码' }),
    },
  ];
});

async function handleSubmit(values: Recordable<any>) {
  try {
    loading.value = true;

    if (currentStep.value === 1) {
      await verifyResetCodeApi({
        code: values.code,
        phoneNumber: values.phoneNumber,
      });
      verifiedPhone.value = values.phoneNumber;
      verifiedCode.value = values.code;
      currentStep.value = 2;
      return;
    }

    if (values.password !== values.confirmPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    await resetPasswordApi({
      code: verifiedCode.value,
      password: values.password,
      phoneNumber: verifiedPhone.value,
    });
    message.success('密码重置成功，请使用新密码登录');
    await router.replace('/auth/login');
  } finally {
    loading.value = false;
  }
}

function goToLogin() {
  router.push('/auth/login');
}
</script>

<template>
  <div>
    <button
      class="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      type="button"
      @click="goToLogin"
    >
      <ArrowLeft class="size-4" />
      <span>返回</span>
    </button>

    <div class="mb-7 flex items-center gap-4">
      <div class="flex items-center gap-2">
        <span
          :class="
            currentStep === 1
              ? 'bg-primary text-primary-foreground ring-4 ring-primary/10'
              : 'bg-primary/10 text-primary'
          "
          class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all"
        >
          1
        </span>
        <span
          :class="
            currentStep === 1
              ? 'text-lg font-semibold text-foreground'
              : 'text-sm font-medium text-muted-foreground'
          "
          class="whitespace-nowrap transition-all"
        >
          验证手机号
        </span>
      </div>
      <div
        :class="currentStep === 2 ? 'bg-primary' : 'bg-border'"
        class="h-0.5 min-w-8 flex-1 transition-colors"
      ></div>
      <div class="flex items-center gap-2">
        <span
          :class="
            currentStep === 2
              ? 'bg-primary text-primary-foreground ring-4 ring-primary/10'
              : 'bg-muted text-muted-foreground'
          "
          class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all"
        >
          2
        </span>
        <span
          :class="
            currentStep === 2
              ? 'text-lg font-semibold text-foreground'
              : 'text-sm font-medium text-muted-foreground'
          "
          class="whitespace-nowrap transition-all"
        >
          设置新密码
        </span>
      </div>
    </div>

    <AuthenticationForgetPassword
      :form-schema="formSchema"
      :loading="loading"
      :show-back="false"
      :show-title="false"
      :sub-title="pageSubtitle"
      :submit-button-text="submitButtonText"
      :title="pageTitle"
      @submit="handleSubmit"
    />
  </div>
</template>
