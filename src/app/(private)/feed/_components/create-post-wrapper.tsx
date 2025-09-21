import { auth } from "@/core/auth";
import { headers } from "next/headers";
import { CreatePost } from "./create-post";

export async function CreatePostWrapper() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <CreatePost user={session?.user ?? undefined} />;
}
