import { router } from "./server-trpc";

import { authRouter } from "@/modules/auth/router";
import { MemberProfileRouter } from "@/modules/members/router";
import { PostRouter } from "@/modules/posts/router";

export const appRouter = router({
  auth: authRouter,
  member: MemberProfileRouter,
  post: PostRouter,
});

export type AppRouter = typeof appRouter;