import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup.string().required('Email обязателен').email('Некорректный email'),
    password: yup.string().required('Пароль обязателен').min(8, 'Пароль должен быть не менее 8 символов'),
});