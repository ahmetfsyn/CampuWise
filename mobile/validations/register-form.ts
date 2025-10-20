import { z } from "zod";
import i18n from "@/configs/i18n.config";

export const registerFormSchema = z
  .object({
    fullName: z.string().nonempty(i18n.t("register.fullNameRequired")),
    email: z.email("register.emailInvalid"),
    password: z.string().min(6, i18n.t("register.passwordMinLength")),
    repeatPassword: z
      .string()
      .min(1, i18n.t("register.repeatPasswordRequired")),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: i18n.t("register.passwordsNotMatch"),
    path: ["repeatPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
