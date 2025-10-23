import { z } from "zod";

export const reportEventFormSchema = z.object({
  content: z.string().nonempty("validations.reportReasonRequired"),
});

export type ReportEventFormValues = z.infer<typeof reportEventFormSchema>;
