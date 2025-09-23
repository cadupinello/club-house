import z from "zod";
import { protectedProcedure, router } from "../trpc";

export const FollowRouter = router({
  toggleFollow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const existingFollow = await ctx.prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: ctx.user.id,
            followingId: input.userId,
          },
        },
      });

      if (existingFollow) {
        await ctx.prisma.follow.delete({
          where: {
            id: existingFollow.id,
          },
        });
        return {
          following: false,
        };
      } else {
        await ctx.prisma.follow.create({
          data: {
            followerId: ctx.user.id,
            followingId: input.userId,
          },
        });
        return {
          following: true,
        };
      }
    }),
});
