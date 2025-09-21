"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CommentsSection } from "./comment-section";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentsToggle = () => {
    setShowComments(!showComments);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className="premium-card glass-effect border-0 premium-shadow animate-fade-in hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Link href={`/profile/1`}>
              <Avatar className="h-12 w-12 cursor-pointer ring-2 ring-transparent hover:ring-primary/20 transition-all duration-300">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-primary-foreground font-medium">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <div className="flex items-center space-x-2">
                <Link href={`/profile/1`} className="hover:underline">
                  <h3 className="font-semibold text-sm font-heading">
                    {post.author.name}
                  </h3>
                </Link>
                {post.author.role === "admin" && (
                  <Badge className="text-xs bg-gradient-to-r from-primary to-secondary text-primary-foreground border-0">
                    Admin
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-muted/50 rounded-xl transition-colors duration-200"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-effect border-0 premium-shadow">
              <DropdownMenuItem onClick={handleBookmark}>
                <Bookmark
                  className={`mr-2 h-4 w-4 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
                {isBookmarked ? "Remover dos salvos" : "Salvar post"}
              </DropdownMenuItem>
              <DropdownMenuItem>Copiar link</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Reportar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-foreground">
          {post.content}
        </p>

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
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`space-x-2 hover:bg-red-50 hover:text-red-500 transition-all duration-200 rounded-xl ${
                isLiked ? "text-red-500 bg-red-50" : ""
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{likesCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`space-x-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl ${
                showComments ? "text-primary bg-primary/10" : ""
              }`}
              onClick={handleCommentsToggle}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs font-medium">{commentsCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl"
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={`hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-xl ${
              isBookmarked ? "text-primary" : ""
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
            />
          </Button>
        </div>

        {showComments && (
          <div className="animate-slide-up">
            <CommentsSection
              postId={post.id}
              onCommentAdded={() => setCommentsCount((prev) => prev + 1)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
