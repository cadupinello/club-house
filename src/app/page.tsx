import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthForm } from "./_components/auth-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-foreground">
              ⚽
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">ClubHouse FC</h1>
          <p className="text-muted-foreground">
            Conecte-se com a comunidade do seu clube
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo de volta</CardTitle>
            <CardDescription>
              Entre na sua conta ou crie uma nova para acessar o feed do clube
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AuthForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
