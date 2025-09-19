"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Camera, Save } from "lucide-react";
import { useState, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { TMember } from "./member-profile";

const editProfileSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  location: z.string().optional(),
  bio: z
    .string()
    .max(300, "A biografia pode ter no máximo 300 caracteres")
    .optional(),
  image: z.instanceof(File).optional(),
});

type EditProfileForm = z.infer<typeof editProfileSchema>;

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: TMember;
}

export function EditProfileDialog({
  open,
  onOpenChange,
  member,
}: EditProfileDialogProps) {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: member.name,
      location: member.location || "",
      bio: member.bio || "",
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];
      setValue("image", file);
      const url = URL.createObjectURL(file);
      setPreview(url);
    },
  });

  const { mutate: mutation } = useMutation({
    mutationFn: async (data: EditProfileForm & { image?: File }) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("bio", data.bio || "");
      formData.append("location", data.location || "");
      if (data.image) formData.append("image", data.image);

      const res = await fetch(`/api/members/${member.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao atualizar perfil");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Perfil atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["member", member.id] });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Erro ao atualizar perfil");
    },
  });

  const onSubmit = (data: EditProfileForm) => {
    startTransition(() => mutation(data));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-3">
            <div {...getRootProps()} className="relative cursor-pointer">
              <input {...getInputProps()} />
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={preview || member.avatar}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Clique ou arraste uma imagem para alterar o avatar
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Seu nome completo"
              />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="location">Localização</Label>
              <Input
                id="location"
                {...register("location")}
                placeholder="Cidade, Estado"
              />
              {errors.location && (
                <p className="text-xs text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                placeholder="Conte um pouco sobre você..."
                className="min-h-[80px] resize-none"
              />
              {errors.bio && (
                <p className="text-xs text-red-500">{errors.bio.message}</p>
              )}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending} className="flex-1">
              {isPending ? (
                "Salvando..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
