"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield } from "lucide-react";
import Image from "next/image";
import { AuthForm } from "./_components/auth-form";

import BackgroundImage from "@/assets/photo-1489944440615-453fc2b6a9a9.avif";

const AuthPage = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative hidden lg:flex items-center justify-center bg-muted">
        <Image
          fill
          src={BackgroundImage}
          alt="Image"
          className="absolute inset-0 object-cover"
          priority
        />

        <div className="relative bottom-48 z-10 flex flex-col items-center gap-3 text-white">
          <Shield className="size-32" />
          <span className="text-2xl font-bold drop-shadow-lg">
            ClubHouse FC
          </span>
          <span className="text-muted-foreground">
            Conecte-se com a comunidade do seu clube
          </span>
        </div>

        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Shield className="size-4" />
            </div>
            ClubHouse FC
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Bem-vindo</CardTitle>
                <CardDescription>
                  Entre na sua conta ou crie uma nova para acessar o feed do
                  clube
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AuthForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
