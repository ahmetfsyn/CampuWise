import { z } from "zod";
import i18n from "@/configs/i18n.config";

export const loginFormSchema = z.object({
  email: z.email("login.emailInvalid"),
  password: z
    .string()
    .nonempty(i18n.t("login.passwordRequired"))
    .min(6, i18n.t("login.passwordMinLength")),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
