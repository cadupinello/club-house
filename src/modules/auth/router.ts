import { authClient } from "@/core/auth-client";
import { publicProcedure, router } from "@/core/server-trpc";
import { loginSchema, signupSchema } from "./schema";

export const authRouter = router({
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      const { data, error } = await authClient.signIn.email({
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new Error(error.message || "Erro ao fazer login");
      }

      return data;
    }),

  register: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input }) => {
      const { data, error } = await authClient.signUp.email({
        name: input.name,
        email: input.email,
        password: input.password,
      });

      if (error) {
        throw new Error(error.message || "Erro ao criar conta");
      }

      return data;
    }),

  getSession: publicProcedure
    .query(async () => {
      const { data } = await authClient.getSession();
      return data;
    }),

  logout: publicProcedure
    .mutation(async () => {
      await authClient.signOut();
      return { success: true };
    }),
});