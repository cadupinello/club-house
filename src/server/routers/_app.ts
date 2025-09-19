import z from "zod";
import { publicProcedure, router } from "../trpc";

export const appRouter = router({
  hello: publicProcedure
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.name ?? "world"}`,
      };
    }),
});

export type AppRouter = typeof appRouter;