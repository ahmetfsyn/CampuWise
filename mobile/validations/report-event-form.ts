import { z } from "zod";

export const reportEventFormSchema = z.object({
  content: z.string().nonempty("Açıklama zorunlu"),
});

export type ReportEventFormValues = z.infer<typeof reportEventFormSchema>;
