import { z } from "zod";

export const createEventFormSchema = z.object({
  title: z.string().min(3, "validations.titleMinLength"),
  description: z.string().optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
  startingDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date("validations.startingDateRequired")
  ),
  location: z.string().nonempty("validations.locationRequired"),
  category: z.string().nonempty("validations.categoryRequired"),
});

export type CreateEventFormValues = z.infer<typeof createEventFormSchema>;
