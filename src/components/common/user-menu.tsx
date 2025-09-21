"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { authClient } from "@/core/auth-client";
import { useSession } from "@/modules/auth/hooks";
import {
  LogOut,
  Monitor,
  Moon,
  Palette,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function UserMenu() {
  const router = useRouter();
  const { session } = useSession();
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const handleProfile = () => {
    if (session?.user?.id) {
      router.push(`/profile/${session.user.id}`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!session?.user) {
    return (
      <Button variant="default" size="sm" asChild>
        <a href="/entrar">Entrar</a>
      </Button>
    );
  }

  return (
    <Menubar className="border-none bg-transparent">
      {/* Menu do Usuário */}
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user.image || undefined}
                alt={session.user.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </MenubarTrigger>
        <MenubarContent align="end" className="min-w-[200px]">
          {/* Informações do usuário */}
          <div className="px-2 py-1.5">
            <p className="text-sm font-medium">{session.user.name}</p>
            <p className="text-xs text-muted-foreground">
              {session.user.email}
            </p>
          </div>

          <MenubarSeparator />

          {/* Perfil */}
          <MenubarItem onClick={handleProfile} className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Meu Perfil
          </MenubarItem>

          {/* Configurações */}
          <MenubarItem className="cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </MenubarItem>

          <MenubarSeparator />

          {/* Tema */}
          <MenubarMenu>
            <MenubarTrigger className="cursor-pointer">
              <Palette className="h-4 w-4 mr-2" />
              Tema
            </MenubarTrigger>
            <MenubarContent>
              <MenubarRadioGroup value={theme}>
                <MenubarRadioItem
                  value="light"
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Claro
                </MenubarRadioItem>
                <MenubarRadioItem
                  value="dark"
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Escuro
                </MenubarRadioItem>
                <MenubarRadioItem
                  value="system"
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Sistema
                </MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>

          <MenubarSeparator />

          {/* Logout */}
          <MenubarItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
