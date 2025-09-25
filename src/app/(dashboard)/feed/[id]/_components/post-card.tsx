"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import type { AppRouter } from "@/server/routers/_app";
import type { inferRouterOutputs } from "@trpc/server";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CommentsSection } from "./comment-section";

type RouterOutputs = inferRouterOutputs<AppRouter>;
type Post =
  | RouterOutputs["post"]["getAll"][number]
  | RouterOutputs["member"]["getAllPostsByMember"][number];

type PostCardProps = {
  postCard: Post;
};

export function PostCard({ postCard }: PostCardProps) {
  const params = useParams();
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

  if (isLoading || !post)
    return (
      <div className="mt-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="shadow-sm border border-border">
            <CardContent className="space-y-3 py-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-48 w-full rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </div>
    );

  return (
    <Card className="p-0 overflow-hidden border border-border/50 rounded-lg">
      <div className="bg-primary h-28 relative" />

      <CardContent className="p-6 -mt-36 relative">
        <div className="flex items-start justify-between mb-6">
          <div className="flex flex-col items-start justify-center space-x-4">
            <Link href={`/profile/${post.user.id}`}>
              <Avatar className="h-36 w-36 border-4 cursor-pointer hover:opacity-90 transition">
                {post.user.image ? (
                  <AvatarImage
                    className="object-cover"
                    src={post.user.image || "/placeholder.svg"}
                    alt={post.user.name}
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-medium text-lg">
                    {post.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
            </Link>

            <div className="leading-tight">
              <h3 className="font-bold text-xl text-foreground mb-1">
                {post.user.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {post.user.email ||
                  `${post.user.name
                    .toLowerCase()
                    .replace(/\s+/g, "")}@teste.com`}
              </p>
            </div>
          </div>

          {post.user.id !== params.id && (
            <Button
              size="sm"
              variant={post.isFollowing ? "outline" : "default"}
              className="rounded-full px-4 py-2 text-sm font-medium"
              onClick={() => toggleFollow.mutate({ userId: post.user.id })}
            >
              {post.isFollowing ? "Seguindo" : "Seguir"}
            </Button>
          )}
        </div>

        <div className="space-y-4">
          <p className="text-sm font-medium leading-relaxed whitespace-pre-line text-foreground">
            {post.content}
          </p>

          {post.image && (
            <div className="rounded-lg overflow-hidden border border-border/50">
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Post image"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          )}

          <div className="flex items-center space-x-6 bg-foreground/5 p-1 rounded-lg">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLike.mutate({ postId: String(post.id) })}
              className={`flex items-center space-x-2 rounded-full px-0 py-1 hover:bg-transparent hover:text-red-500 ${
                post.isLiked ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              <Heart
                className={`h-5 w-5 ${post.isLiked ? "fill-current" : ""}`}
              />
              <span className="text-sm">{post.likes}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 rounded-full px-0 py-1 hover:bg-transparent hover:text-primary text-muted-foreground"
              onClick={() => setOpenComments(!openComments)}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm">{post.comments}</span>
            </Button>
          </div>

          {openComments && (
            <div className="pt-4 border-t border-border/50">
              <CommentsSection postId={String(post.id)} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
