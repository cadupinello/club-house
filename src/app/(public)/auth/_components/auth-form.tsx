"use client";

import { TabsContent } from "@/components/ui/tabs";
import { useAuthMutations } from "@/modules/auth/hooks";
import { LoginFormValues, SignupFormValues } from "@/modules/auth/schema";
import { useState } from "react";
import { toast } from "sonner";
import { AuthTabs } from "./auth-tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuthMutations();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      await login.mutateAsync(data);
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  const handleRegister = async (data: SignupFormValues) => {
    try {
      await register.mutateAsync(data);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao criar conta. Tente novamente.");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <AuthTabs>
      <TabsContent value="login">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={login.isPending}
          showPassword={showPassword}
          togglePassword={togglePassword}
        />
      </TabsContent>

      <TabsContent value="register">
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={register.isPending}
          showPassword={showPassword}
          togglePassword={togglePassword}
        />
      </TabsContent>
    </AuthTabs>
  );
}
