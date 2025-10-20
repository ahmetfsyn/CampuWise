import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("Geçerli bir email girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalı"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
