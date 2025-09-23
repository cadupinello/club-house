import z from "zod";
import { protectedProcedure, router } from "../trpc";

export const LikeRouter = router({
  toggleLike: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const existingLike = await ctx.prisma.like.findUnique({
        where: {
          userId_postId: {
            userId: ctx.user.id,
            postId: Number(input.postId),
          },
        },
      });

      if (existingLike) {
        await ctx.prisma.like.delete({
          where: {
            id: existingLike.id,
          },
        });
        return {
          liked: false,
        };
      } else {
        await ctx.prisma.like.create({
          data: {
            userId: ctx.user.id,
            postId: Number(input.postId),
          },
        });
        return {
          liked: true,
        };
      }
    }),

  getLikesCount: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input, ctx }) => {
      const count = await ctx.prisma.like.count({
        where: {
          postId: Number(input.postId),
        },
      });
      return { count };
    }),
});
