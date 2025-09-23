import z from "zod";
import { protectedProcedure, router } from "../trpc";


export const CommentRouter = router({
  addComment: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string(),
        parentId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.comment.create({
        data: {
          content: input.content,
          userId: ctx.user.id,
          postId: Number(input.postId),
          parentId: Number(input.parentId) ?? null,
        },
      });
    }),

    getCommentByPost: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.comment.findMany({
        where: {
          postId: Number(input.postId),
          parentId: null
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          },
          replies: {
            include: {
              user: true
            }
          },
          likes: {
            select: {
              userId: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
    }),

});