import * as yup from "yup";

export const editProfileFormSchema = yup.object({
  fullName: yup.string().required("Ad soyad zorunlu"),
  email: yup
    .string()
    .email("Geçerli bir email girin")
    .required("Email zorunlu"),
  phoneNumber: yup.string().required("Telefon numarası zorunlu"),
});
