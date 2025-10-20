import { z } from "zod";

export const createEventFormSchema = z.object({
  title: z.string().min(3, "En az 3 karakter olmalı"),
  description: z.string().optional().or(z.literal("")),
  imageUrl: z.string().optional().or(z.literal("")),
  startingDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date()
  ),
  location: z.string().nonempty("Konum zorunlu"),
  category: z.string().nonempty("Kategori zorunlu"),
});

export type CreateEventFormValues = z.infer<typeof createEventFormSchema>;
