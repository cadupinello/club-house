"use client";

import type React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Reply, Send } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsSectionProps {
  postId: string;
  onCommentAdded: () => void;
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "João Silva",
      avatar: "/diverse-user-avatars.png",
      role: "member",
    },
    content: "Que jogo incrível! Nosso time está cada vez melhor!",
    timestamp: "1h atrás",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Maria Santos",
          avatar: "/diverse-user-avatars.png",
          role: "member",
        },
        content: "Concordo totalmente! A defesa esteve impecável.",
        timestamp: "45min atrás",
        likes: 2,
        isLiked: true,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Carlos Oliveira",
      avatar: "/diverse-user-avatars.png",
      role: "member",
    },
    content: "Parabéns ao técnico pela estratégia! Merecemos essa vitória.",
    timestamp: "2h atrás",
    likes: 8,
    isLiked: true,
  },
];

export function CommentsSection({
  postId,
  onCommentAdded,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsPosting(true);

    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          name: "Você",
          avatar: "/diverse-user-avatars.png",
          role: "member",
        },
        content: newComment,
        timestamp: "agora",
        likes: 0,
        isLiked: false,
      };

      setComments((prev) => [comment, ...prev]);
      setNewComment("");
      setIsPosting(false);
      onCommentAdded();
    }, 500);
  };

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `${commentId}-${Date.now()}`,
      author: {
        name: "Você",
        avatar: "/diverse-user-avatars.png",
        role: "member",
      },
      content: replyContent,
      timestamp: "agora",
      likes: 0,
      isLiked: false,
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      })
    );

    setReplyContent("");
    setReplyingTo(null);
    onCommentAdded();
  };

  const handleLikeComment = (
    commentId: string,
    isReply = false,
    parentId?: string
  ) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (isReply && comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies?.map((reply) => {
              if (reply.id === commentId) {
                return {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                };
              }
              return reply;
            }),
          };
        } else if (comment.id === commentId) {
          return {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          };
        }
        return comment;
      })
    );
  };

  return (
    <div className="space-y-4 pt-4 border-t">
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              VC
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Escreva um comentário..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[60px] resize-none text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            disabled={!newComment.trim() || isPosting}
          >
            {isPosting ? (
              "Postando..."
            ) : (
              <>
                <Send className="h-3 w-3 mr-2" />
                Comentar
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            {/* Main Comment */}
            <div className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={comment.author.avatar || "/placeholder.svg"}
                />
                <AvatarFallback className="bg-muted text-xs">
                  {comment.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-sm">
                      {comment.author.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`h-6 px-2 text-xs ${
                      comment.isLiked ? "text-red-500" : ""
                    }`}
                  >
                    <Heart
                      className={`h-3 w-3 mr-1 ${
                        comment.isLiked ? "fill-current" : ""
                      }`}
                    />
                    {comment.likes}
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                    className="h-6 px-2 text-xs"
                  >
                    <Reply className="h-3 w-3 mr-1" />
                    Responder
                  </Button>
                </div>

                {/* Reply Form */}
                {replyingTo === comment.id && (
                  <div className="flex space-x-2 mt-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/diverse-user-avatars.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        VC
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex space-x-2">
                      <Textarea
                        placeholder="Escreva uma resposta..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        className="min-h-[40px] resize-none text-sm"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleSubmitReply(comment.id)}
                        disabled={!replyContent.trim()}
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-11 space-y-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex space-x-3">
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={reply.author.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback className="bg-muted text-xs">
                        {reply.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">
                            {reply.author.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {reply.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{reply.content}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleLikeComment(reply.id, true, comment.id)
                        }
                        className={`h-6 px-2 text-xs ${
                          reply.isLiked ? "text-red-500" : ""
                        }`}
                      >
                        <Heart
                          className={`h-3 w-3 mr-1 ${
                            reply.isLiked ? "fill-current" : ""
                          }`}
                        />
                        {reply.likes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
