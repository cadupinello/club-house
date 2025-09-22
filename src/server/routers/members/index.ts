"server only";

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
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2),
        location: z.string().optional(),
        bio: z.string().max(300).optional(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, name, location, bio, image } = input;

      if (ctx.user.id !== id) {
        throw new Error("Usuário nao autorizado");
      }

      const data = await ctx.prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          location,
          bio,
          image,
        },
      });

      return data;
    }),

});