import { authClient } from "@/lib/auth-client";
import { LoginFormValues, SignupFormValues } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface IAuthMutationProps {
  router: {
    replace: (path: string) => void
  }
}

export const useLogin = ({ router }: IAuthMutationProps) => {
  return useMutation({
    mutationFn: async (credentials: LoginFormValues) => {
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
      });
      
      if (error) {
        throw new Error(error.message || "Erro ao fazer login");
      }
      
      return data;
    },
    onSuccess: () => {
      router.replace("/feed");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Erro ao fazer login");
    }
  });
};

export const useRegister = ({ router }: IAuthMutationProps) => {
  return useMutation({
    mutationFn: async (userData: SignupFormValues) => {
      const { data, error } = await authClient.signUp.email({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });
      
      if (error) {
        throw new Error(error.message || "Erro ao criar conta");
      }
      
      return data;
    },
    onSuccess: () => {
      router.replace("/feed");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Erro ao criar conta");
    }
  });
};

export const useLogout = ({ router }: IAuthMutationProps) => {
  return useMutation({
    mutationFn: async () => {
      await authClient.signOut();
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Erro ao fazer logout");
    }
  });
};