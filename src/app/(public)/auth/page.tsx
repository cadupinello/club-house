import { AuthForm } from "./_components/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bem-vindo</h1>
          <p className="text-muted-foreground">
            Entre ou cadastre-se para continuar
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
