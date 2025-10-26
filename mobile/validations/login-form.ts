import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("login.validations.emailInvalid"),
  password: z
    .string()
    .nonempty("login.validations.passwordRequired")
    .min(6, "login.validations.passwordMinLength"),
  rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
