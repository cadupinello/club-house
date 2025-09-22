"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { LoginFormValues, loginSchema } from "@/schemas/auth";
import { Loader2, Lock, Mail } from "lucide-react";
import { FieldForm } from "./field-form";

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
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FieldForm
            label="E-mail"
            placeholder="H6f8o@example.com"
            icon={<Mail />}
            {...field}
            error={error?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FieldForm
            label="Senha"
            placeholder="••••••••"
            icon={<Lock />}
            type={showPassword ? "text" : "password"}
            togglePassword={togglePassword}
            showPassword={showPassword}
            {...field}
            error={error?.message}
          />
        )}
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvando
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
