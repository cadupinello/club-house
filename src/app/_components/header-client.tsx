"use client";

import { UserMenu } from "@/components/common/user-menu";
import { Shield } from "lucide-react";

export function HeaderClient() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">ClubHouse FC</span>
        </div>

        {/* Menu do Usuário */}
        <UserMenu />
      </div>
    </header>
  );
}
