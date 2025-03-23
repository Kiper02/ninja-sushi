import * as yup from "yup";

export const registerSchema = yup.object({
    email: yup.string().required('Email обязателен').email('Некорректный email'),
    name: yup.string().required('Имя обязательно'),
    phone: yup.string().required('Телефон обязателен'),
    password: yup.string().required('Пароль обязателен').min(8, 'Пароль должен быть не менее 8 символов'),
});