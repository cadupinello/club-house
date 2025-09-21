"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { SignupFormValues, signupSchema } from "@/modules/auth/schema";
import { Lock, Mail, User } from "lucide-react";
import { FormField } from "./form-field";

interface RegisterFormProps {
  onSubmit: (data: SignupFormValues) => Promise<void>;
  isLoading: boolean;
  showPassword: boolean;
  togglePassword: () => void;
}

export function RegisterForm({
  onSubmit,
  isLoading,
  showPassword,
  togglePassword,
}: RegisterFormProps) {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        label="Nome completo"
        placeholder="João da Silva"
        icon={<User />}
        {...form.register("name")}
        error={form.formState.errors.name?.message}
      />
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
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  );
}
