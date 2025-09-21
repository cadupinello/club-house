import { trpc } from "@/core/client-trpc";
import { useRouter } from "next/navigation";

export const useAuthMutations = () => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
      router.replace("/dashboard");
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
      router.replace("/feed");
    },
  });

  return {
    login: loginMutation,
    register: registerMutation,
  };
};

export const useLoginMutation = () => {
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.auth.login.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
      router.replace("/dashboard");
    },
  });
};

export const useRegisterMutation = () => {
  const router = useRouter();
  const utils = trpc.useUtils();

  return trpc.auth.register.useMutation({
    onSuccess: () => {
      utils.auth.getSession.invalidate();
      router.replace("/feed");
    },
  });
};

export const useSession = () => {
  const { data: session, isLoading, error } = trpc.auth.getSession.useQuery();

  return {
    session,
    isLoading,
    error,
    isAuthenticated: !!session?.user,
  };
};