import { createApi, handleUnauthorized } from "@/configs/api.config";

export const api = createApi(handleUnauthorized);
