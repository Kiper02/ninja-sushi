<script setup lang="ts">
import {useField, useForm} from "vee-validate";
import {loginSchema} from "~/components/auth/validation/login.validation";
import {toast} from "vue-sonner";

const { push } = useRouter()

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
});


const { value: emailRef } = useField('email');
const { value: passwordRef } = useField('password');


const login = handleSubmit(
    async (values) => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log(response)

      if(response && response.ok) {
        emailRef.value = '';
        passwordRef.value = '';

        await push('/');
      }
    },
    (errors) => {
      const data = Object.values(errors.errors);
      const messages = data.filter(item => typeof item === 'string');
      if(messages.length > 0){
        toast(messages[0])
      }
    }
);
</script>

<template>
  <UiCard class="p-6 w-1/4">
    <UiCardHeader class="mt-12 text-center">
      <UiCardTitle class="font-bold text-3xl">
        Авторизация
      </UiCardTitle>
      <UiCardDescription class="text-[#686870] font-medium text-base">
        Введите ваш email
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent class="flex flex-col items-center gap-2">
      <UiInput
          type="email"
          placeholder="test@example.com"
          v-model="emailRef"
      />
      <UiInput
          type="password"
          placeholder="Пароль"
          v-model="passwordRef"
      />
      <UiButton
        class="mt-3 bg-accent hover:bg-[#32E75A] w-full"
        @click="login"
      >
        Войти по email
      </UiButton>
      <p class="mt-4">Или</p>
    </UiCardContent>
    <UiCardFooter class="flex flex-col items-center">
      <div class="flex items-center content-between gap-3">
        <NuxtLink
            class="flex items-center justify-center gap-4 dark:bg-gray-900 bg-[#F5F5F7] py-3 px-11 rounded-xl"
        >
          <NuxtImg
            src="/icons/google.svg"
            alt="Google Logo"
            width="30 "
          />
          <p class="font-medium">Google</p>
        </NuxtLink>
        <NuxtLink class="flex items-center justify-center gap-4 dark:bg-gray-900 bg-[#F5F5F7] py-3 px-11 rounded-xl">
          <NuxtImg
              src="/icons/facebook.svg"
              alt="FacebookLogo"
              width="30"
          />
          <p class="font-medium">Facebook</p>
        </NuxtLink>
      </div>
      <NuxtLink class="flex items-center justify-center gap-4 dark:bg-gray-900 bg-[#F5F5F7] w-full py-3 mt-4 rounded-xl">
        <NuxtImg
          src="/icons/apple.svg"
          alt="AppleLogo"
          class="dark:invert"
          width="25"
        />
        <p class="font-medium">Apple</p>
      </NuxtLink>
    </UiCardFooter>
  </UiCard>
</template>

<style scoped>

</style>