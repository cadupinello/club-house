import { auth } from "@/core/auth";
import { prisma } from "@/core/prisma";
import { headers } from "next/headers";

export async function createContext() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    prisma,
    user: session?.user ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
