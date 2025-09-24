"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HeaderClient from "./_components/header-client";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      <HeaderClient user={null} />

      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Rede Social Oficial
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Bem-vindo ao <span className="text-primary">ClubHouse FC</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
              Conecte-se com outros torcedores, acompanhe as últimas notícias do
              clube e participe da nossa comunidade apaixonada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => router.push("/auth")}
              >
                Entrar na Comunidade
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent"
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
