import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AuthTabsProps {
  defaultValue?: string;
  children: React.ReactNode;
}

export function AuthTabs({ defaultValue = "login", children }: AuthTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Entrar</TabsTrigger>
        <TabsTrigger value="register">Cadastrar</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
