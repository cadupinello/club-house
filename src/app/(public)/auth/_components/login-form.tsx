"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { LoginFormValues, loginSchema } from "@/modules/auth/schema";
import { Lock, Mail } from "lucide-react";
import { FormField } from "./form-field";

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => Promise<void>;
  isLoading: boolean;
  showPassword: boolean;
  togglePassword: () => void;
}

export function LoginForm({
  onSubmit,
  isLoading,
  showPassword,
  togglePassword,
}: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="E-mail"
        placeholder="H6f8o@example.com"
        icon={<Mail />}
        {...form.register("email")}
        error={form.formState.errors.email?.message}
      />
      <FormField
        label="Senha"
        placeholder="••••••••"
        icon={<Lock />}
        type={showPassword ? "text" : "password"}
        togglePassword={togglePassword}
        showPassword={showPassword}
        {...form.register("password")}
        error={form.formState.errors.password?.message}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
