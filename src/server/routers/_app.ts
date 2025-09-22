import { router } from "../trpc";
import { MemberProfileRouter } from "./members";

import { PostRouter } from "./post";

export const appRouter = router({
  member: MemberProfileRouter,
  post: PostRouter,
});

export type AppRouter = typeof appRouter;