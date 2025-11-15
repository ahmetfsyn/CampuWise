import { z } from "zod";

export const editProfileFormSchema = z.object({
  fullName: z.string().min(1, "Ad soyad zorunlu"),
  email: z.email("Geçerli bir email girin"),
  department: z.string().optional().or(z.literal("")),
  university: z.string().optional().or(z.literal("")),
  phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, "editProfile.validations.invalidPhoneNumber")
    .length(10, "editProfile.validations.invalidPhoneNumber")
    .optional(),
  avatarUrl: z.string().optional().or(z.literal("")),
});

export type EditProfileFormValues = z.infer<typeof editProfileFormSchema>;
