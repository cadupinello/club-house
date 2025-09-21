import z from "zod";

import { protectedProcedure, router } from "@/server/trpc";

export const MemberProfileRouter = router({
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const member = await ctx.prisma.user.findUnique({
        where: {
          id: input.id
        },
        include: {
          posts: true,
          comments: true,
        }
      });

      if (!member) {
        return null;
      }

      const isOwnProfile = ctx.user.id === input.id;

      const response = {
        id: member.id,
        name: member.name,
        avatar: member.image,
        joinDate: member.createdAt.toLocaleDateString("pt-BR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        bio: member.bio,
        location: member.location,
        stats: {
          posts: member.posts.length,
          comments: member.comments.length,
          likes: 0,
          following: 0,
          followers: 0,
        },
        badges: [],
        isOwnProfile,
      };

      return response;
    })
});