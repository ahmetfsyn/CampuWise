import * as yup from "yup";

export const registerFormSchema = yup.object({
  fullName: yup.string().required("Ad soyad zorunlu"),
  email: yup
    .string()
    .email("Geçerli bir email girin")
    .required("Email zorunlu"),
  password: yup
    .string()
    .min(6, "Şifre en az 6 karakter olmalı")
    .required("Şifre zorunlu"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Şifreler eşleşmiyor"),
});
