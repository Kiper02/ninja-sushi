<script lang="ts" setup>
  import {registerSchema} from "~/components/auth/validation/register.validation";
  import {toast} from "vue-sonner";
  import {useForm, useField} from "vee-validate";

  const { push } = useRouter()

  const { handleSubmit } = useForm({
    validationSchema: registerSchema,
  });

  const phoneCodeRef = ref(7)

  const { value: emailRef } = useField('email');
  const { value: nameRef } = useField('name');
  const { value: phoneRef } = useField('phone');
  const { value: passwordRef } = useField('password');

  const updateCodeRef = (value: any) => {
    console.log(value.code);
    phoneCodeRef.value = value.code;
  }

  const register = handleSubmit(
      async (values) => {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            ...values,
            phone: phoneCodeRef.value + values.phone,
          }),
          headers: {
            "Content-Type": "application/json",
          }
        })
        console.log(response)

        if(response && response.ok) {
          emailRef.value = '';
          nameRef.value = '';
          phoneRef.value = '';
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
        Регистрация
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
          type="name"
          placeholder="Ваше имя"
          v-model="nameRef"
      />
      <div class="flex items-center gap-2 w-full">
        <div class="w-1/4">
          <AuthSelectCode @update:updateCodeRef="updateCodeRef"/>
        </div>
        <UiInput
            type="tel"
            placeholder="Ваш телефон"
            v-model="phoneRef"
            maxLength="10"
            minLength="10"
        />
      </div>
      <UiInput
          type="password"
          placeholder="Пароль"
          v-model="passwordRef"
      />
      <UiButton
          class="mt-3 bg-accent hover:bg-[#32E75A] w-full"
          @click="register"
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