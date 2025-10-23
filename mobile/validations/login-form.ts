import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.email("login.emailInvalid"),
  password: z
    .string()
    .nonempty("login.passwordRequired")
    .min(6, "login.passwordMinLength"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
