"use client";

import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare, Shield, Trophy, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleNavigateToAuth = () => {
    router.push("/auth");
  };

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-primary-600" />,
      title: "Comunicação Direta",
      description:
        "Converse com jogadores, comissão técnica e outros torcedores",
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary-600" />,
      title: "Agenda de Jogos",
      description: "Acompanhe todos os jogos e eventos do clube",
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary-600" />,
      title: "Conquistas",
      description: "Celebre as vitórias e conquistas do time",
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: "Comunidade",
      description: "Faça parte da família do clube",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      title: "Exclusivo",
      description: "Conteúdo exclusivo para membros do clube",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-cyan-50">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-primary-800">
              ClubHouse FC
            </h1>
          </div>
          <Button
            onClick={handleNavigateToAuth}
            variant="default"
            size="lg"
            className="bg-primary-600 hover:bg-primary-700"
          >
            Entrar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-800 mb-4">
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-br from-primary-900 via-blue-700 to-blue-900 bg-clip-text text-transparent">
                ClubHouse FC
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              A rede social oficial do seu clube de futebol. Conecte-se com a
              família do clube, acompanhe os jogos e faça parte dessa paixão.
            </p>
            <Button
              onClick={handleNavigateToAuth}
              variant="default"
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 px-8 py-3 text-lg"
            >
              Começar Agora
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">500+</div>
              <div className="text-slate-600">Membros</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">50+</div>
              <div className="text-slate-600">Jogos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">10+</div>
              <div className="text-slate-600">Troféus</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-800">24/7</div>
              <div className="text-slate-600">Comunidade</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-primary-800 text-center mb-12">
            Por que fazer parte?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-16">
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-primary-50 mb-4">
              Pronto para entrar em campo?
            </h2>
            <p className="text-primary-100 mb-6 text-lg">
              Junte-se à família ClubHouse FC e viva o futebol de verdade
            </p>
            <Button
              onClick={handleNavigateToAuth}
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-3 text-lg"
            >
              Fazer Parte do Time
            </Button>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-12">
        <div className="text-center text-slate-600">
          <p>© 2024 ClubHouse FC. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Desenvolvido com paixão pelo futebol ⚽
          </p>
        </div>
      </footer>
    </div>
  );
}
