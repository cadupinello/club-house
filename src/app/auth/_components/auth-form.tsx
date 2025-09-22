"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { TabsContent } from "@/components/ui/tabs";
import { LoginFormValues, SignupFormValues } from "@/schemas/auth";
import { useLogin, useRegister } from "../mutation";
import { AuthTabs } from "./auth-tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate: login, isPending: isPendingLogin } = useLogin({ router });
  const { mutate: register, isPending: isPendingRegister } = useRegister({
    router,
  });

  const handleRegister = async (data: SignupFormValues) => {
    register(data);
  };

  const handleLogin = async (data: LoginFormValues) => {
    login(data);
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <AuthTabs>
      <TabsContent value="login">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isPendingLogin}
          showPassword={showPassword}
          togglePassword={togglePassword}
        />
      </TabsContent>

      <TabsContent value="register">
        <RegisterForm
          onSubmit={handleRegister}
          isLoading={isPendingRegister}
          showPassword={showPassword}
          togglePassword={togglePassword}
        />
      </TabsContent>
    </AuthTabs>
  );
}
