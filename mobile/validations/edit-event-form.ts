import { z } from "zod";

export const editEventFormSchema = z.object({
  title: z.string().min(3, "validations.titleMinLength"),
  description: z.string().optional().nullable(),

  image: z
    .union([
      z.url().optional().nullable(),
      z.object({
        uri: z.string(),
        assetId: z.string().optional().nullable(),
        width: z.number(),
        height: z.number(),
        type: z.enum(["image", "video", "livePhoto", "pairedVideo"]).optional(),
        fileName: z.string().optional().nullable(),
        fileSize: z.number().optional(),
        base64: z.string().optional().nullable(),
        duration: z.number().optional().nullable(),
        mimeType: z.string().optional(),
        pairedVideoAsset: z.any().optional().nullable(),
        file: z.any().optional(),
      }),
    ])
    .optional()
    .nullable(),

  startDate: z.preprocess(
    (arg) => (arg ? new Date(arg as string) : undefined),
    z.date("validations.startingDateRequired")
  ),

  place: z.string().nonempty("validations.locationRequired"),
  category: z.string().nonempty("validations.categoryRequired"),
});

export type EditEventFormValues = z.infer<typeof editEventFormSchema>;
