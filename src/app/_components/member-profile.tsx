"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Edit, MapPin, Trophy } from "lucide-react";
import { useState } from "react";
import { EditProfileDialog } from "./edit-profile";

interface MemberProfileProps {
  memberId: string;
  isOwnProfile?: boolean;
}

export type TMember = {
  id: string;
  name: string;
  avatar: string;
  position: string;
  team: string;
  birthdate: string;
  height: number;
  weight: number;
  role: string;
  joinDate: string;
  location: string;
  bio: string;
  stats: {
    posts: number;
    comments: number;
    likes: number;
    following: number;
    followers: number;
  };
  badges: string[];
};

export function MemberProfile({
  memberId,
  isOwnProfile = true,
}: MemberProfileProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);

  const {
    data: member,
    isLoading,
    isError,
  } = useQuery<TMember>({
    queryKey: ["member", memberId],
    queryFn: async () => {
      const res = await fetch(`/api/members/${memberId}`);
      if (!res.ok) throw new Error("Erro ao buscar perfil");
      return res.json();
    },
  });

  if (isLoading) return <div>Carregando...</div>;
  if (isError || !member) return <div>Erro ao carregar perfil</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                className="object-cover"
                src={member?.avatar || "/placeholder.svg"}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {member?.name
                  ?.split(" ")
                  ?.map((n: string) => n[0])
                  ?.join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{member?.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Membro desde {member?.joinDate}</span>
                    </div>
                    {member.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{member.location}</span>
                      </div>
                    )}
                    {isOwnProfile && (
                      <Button
                        onClick={() => setShowEditDialog(true)}
                        className="mt-2 md:mt-0"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Perfil
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {member.bio && (
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {member.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {member?.badges?.map((badge: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <Trophy className="h-3 w-3" />
                    <span>{badge}</span>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showEditDialog && (
        <EditProfileDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          member={member}
        />
      )}
    </div>
  );
}
