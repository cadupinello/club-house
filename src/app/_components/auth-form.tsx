"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const signupSchema = z.object({
  name: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { data: resData, error } = await authClient.signIn.email(
        { email: data.email, password: data.password },
        {
          onSuccess: () => router.replace("/dashboard"),
          onError: (err) => console.error(err),
        }
      );
      if (error) throw new Error(error.message || "Erro ao logar");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      const { data: resData, error } = await authClient.signUp.email(
        { name: data.name, email: data.email, password: data.password },
        {
          onSuccess: () => router.replace("/feed"),
          onError: (err) => console.error(err),
        }
      );
      if (error) throw new Error(error.message || "Erro ao criar conta");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="register">Cadastrar</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <form
          onSubmit={loginForm.handleSubmit(handleLogin)}
          className="space-y-4"
        >
          <FormField
            label="E-mail"
            placeholder="H6f8o@example.com"
            icon={<Mail />}
            {...loginForm.register("email")}
            error={loginForm.formState.errors.email?.message}
          />
          <FormField
            label="Senha"
            placeholder="••••••••"
            icon={<Lock />}
            type={showPassword ? "text" : "password"}
            togglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            {...loginForm.register("password")}
            error={loginForm.formState.errors.password?.message}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="register">
        <form
          onSubmit={signupForm.handleSubmit(handleRegister)}
          className="space-y-4"
        >
          <FormField
            label="Nome completo"
            placeholder="João da Silva"
            icon={<User />}
            {...signupForm.register("name")}
            error={signupForm.formState.errors.name?.message}
          />
          <FormField
            label="E-mail"
            placeholder="H6f8o@example.com"
            icon={<Mail />}
            {...signupForm.register("email")}
            error={signupForm.formState.errors.email?.message}
          />
          <FormField
            label="Senha"
            placeholder="••••••••"
            icon={<Lock />}
            type={showPassword ? "text" : "password"}
            togglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            {...signupForm.register("password")}
            error={signupForm.formState.errors.password?.message}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
  error?: string;
  togglePassword?: () => void;
  showPassword?: boolean;
}

function FormField({
  label,
  icon,
  error,
  togglePassword,
  showPassword,
  placeholder,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-3 h-4 w-4 text-muted-foreground flex items-center justify-center">
            {icon}
          </span>
        )}
        <Input
          {...props}
          placeholder={placeholder}
          className={`pl-10 ${togglePassword ? "pr-10" : ""}`}
        />
        {togglePassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={togglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
