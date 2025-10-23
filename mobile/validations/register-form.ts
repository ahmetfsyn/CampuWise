import { z } from "zod";

export const registerFormSchema = z
  .object({
    fullName: z.string().nonempty("register.validations.fullNameRequired"),
    email: z.email("register.validations.emailInvalid"),
    password: z.string().min(6, "register.validations.passwordMinLength"),
    repeatPassword: z
      .string()
      .min(1, "register.validations.repeatPasswordRequired"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "register.validations.passwordsNotMatch",
    path: ["repeatPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
