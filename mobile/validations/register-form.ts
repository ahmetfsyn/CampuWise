import { z } from "zod";

export const registerFormSchema = z
  .object({
    fullName: z.string().min(1, "Ad soyad zorunlu"),
    email: z.email("Geçerli bir email girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
    repeatPassword: z.string().min(1, "Şifre tekrarı zorunlu"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["repeatPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
