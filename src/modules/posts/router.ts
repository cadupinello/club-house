import { prisma } from "@/core/prisma";
import { createPostSchema } from "@/modules/posts/schema";
import { TRPCError } from "@trpc/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { protectedProcedure, publicProcedure, router } from "../../core/server-trpc";

export const PostRouter = router({
  create: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ input, ctx }) => {
      let imageUrl: string | undefined = undefined;

      if (input.image && input.image.startsWith("data:image/")) {
        try {
          const base64Data = input.image.split(",")[1];
          const buffer = Buffer.from(base64Data, "base64");

          const matches = input.image.match(/^data:(image\/\w+);base64,/);
          if (!matches || matches.length < 2) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Formato de imagem inválido",
            });
          }

          const mimeType = matches[1];
          const extension = mimeType.split("/")[1];

          if (buffer.length > 5 * 1024 * 1024) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Imagem deve ter no máximo 5MB",
            });
          }

          const timestamp = Date.now();
          const filename = `post-${timestamp}.${extension}`;
          const filePath = join(
            process.cwd(),
            "public",
            "uploads",
            "posts",
            filename
          );

          await writeFile(filePath, buffer);

          imageUrl = `/uploads/posts/${filename}`;
        } catch (error) {
          console.error("Error processing image:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Erro ao processar imagem",
          });
        }
      }

      return prisma.post.create({
        data: {
          content: input.content,
          image: imageUrl,
          userId: ctx.user.id,
        },
        include: {
          user: true,
          comments: true,
        },
      });
    }),

  getAll: publicProcedure.query(async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        comments: true,
      },
    });
    return posts;
  }),
});
