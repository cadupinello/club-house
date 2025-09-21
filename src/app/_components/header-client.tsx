"use client";

import { ModeToggle } from "@/components/mode-color-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

interface Props {
  user: { id: string; name?: string; image?: string };
}

export default function HeaderClient({ user }: Props) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/feed"
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity animate-in fade-in-50"
        >
          <span className="text-sm font-bold text-primary-foreground">⚽</span>
          <h1 className="text-xl font-bold text-foreground">ClubHouse FC</h1>
        </Link>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
          </Button>
          <ModeToggle />
          <Link href={`/profile/${user.id}`}>
            <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
              <AvatarImage
                className="object-cover"
                src={user.image || "/diverse-user-avatars.png"}
              />
              <AvatarFallback>
                <span className="text-sm font-bold">
                  {user.name?.slice(0, 2)?.toUpperCase()}
                </span>
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
