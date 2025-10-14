import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .email("Geçerli bir email girin")
    .required("Email zorunlu"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Şifre zorunlu"),
});
