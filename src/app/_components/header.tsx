import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import HeaderClient from "./header-client";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return redirect("/");

  return (
    <HeaderClient
      user={{
        ...session.user,
        image: session.user.image ?? undefined,
      }}
    />
  );
}
