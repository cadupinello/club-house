"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { AppRouter } from "@/server/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { Heart, MessageCircle, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { CommentsSection } from "./comment-section";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Post = RouterOutputs["post"]["getAll"][number];

type PostCardProps = {
  postCard: Post;
};

export function PostCard({ postCard }: PostCardProps) {
  const utils = trpc.useUtils();
  const [openComments, setOpenComments] = useState(false);

  const { data: post, isLoading } = trpc.post.getById.useQuery({
    postId: String(postCard.id),
  });

  const toggleLike = trpc.like.toggleLike.useMutation({
    onSuccess: () =>
      utils.post.getById.invalidate({ postId: String(postCard.id) }),
    onError: () => toast.error("Erro ao curtir post"),
  });

  const toggleFollow = trpc.follow.toggleFollow.useMutation({
    onSuccess: () =>
      utils.post.getById.invalidate({ postId: String(postCard.id) }),
    onError: () => toast.error("Erro ao seguir usuário"),
  });

  if (isLoading || !post) return <div>Carregando...</div>;

  return (
    <Card className="premium-card glass-effect border-0 premium-shadow animate-fade-in hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/${post.user.id}`}>
              <Avatar className="h-12 w-12 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-300">
                {post.user.image ? (
                  <AvatarImage src={post.user.image} alt={post.user.name} />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-medium">
                  {post.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{post.user.name}</h3>

                {post.user.id !== "currentUserId" && (
                  <Button
                    size="sm"
                    variant={post.isFollowing ? "outline" : "default"}
                    onClick={() =>
                      toggleFollow.mutate({ userId: post.user.id })
                    }
                  >
                    {post.isFollowing ? "Seguindo" : "Seguir"}
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed">{post.content}</p>
        {post.image && (
          <div className="rounded-xl overflow-hidden premium-shadow">
            <Image
              src={post.image}
              alt="Post image"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLike.mutate({ postId: String(post.id) })}
              className={`space-x-2 hover:bg-red-50 hover:text-red-500 rounded-xl ${
                post.isLiked ? "text-red-500 bg-red-50" : ""
              }`}
            >
              <Heart className="h-4 w-4" />
              <span className="text-xs font-medium">{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="space-x-2 hover:bg-primary/10 rounded-xl"
              onClick={() => setOpenComments(!openComments)}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{post?.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 rounded-xl"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {openComments && <CommentsSection postId={String(post.id)} />}
      </CardContent>
    </Card>
  );
}
