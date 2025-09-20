// schemas/post.ts
import { z } from "zod";

export const createPostSchema = z.object({
  content: z.string().min(1, "O conteúdo é obrigatório"),
  image: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;