"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type CommentProps = {
  postId: string;
};

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "O comentário deve ter pelo menos 1 caractere")
    .max(300, "O comentário deve ter no máximo 300 caracteres"),
  postId: z.string(),
  parentId: z.string().optional(),
});

type CommentSchema = z.infer<typeof commentSchema>;

export function CommentsSection({ postId }: CommentProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const utils = trpc.useUtils();

  const { data: comments, isLoading } = trpc.comment.getCommentByPost.useQuery({
    postId,
  });

  const { control, handleSubmit, reset } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      postId,
      parentId: undefined,
    },
  });

  const {
    control: replyControl,
    handleSubmit: handleSubmitReply,
    reset: resetReply,
  } = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
      postId,
      parentId: undefined,
    },
  });

  const { mutate: createComment, isPending: isPendingComment } =
    trpc.comment.addComment.useMutation({
      onSuccess: () => {
        utils.comment.getCommentByPost.invalidate({ postId });
        reset();
        resetReply();
        setReplyingTo(null);
        toast.success("Comentário adicionado com sucesso");
      },
    });

  const onSubmit: SubmitHandler<CommentSchema> = (data) => {
    createComment({
      postId,
      content: data.content,
      parentId: undefined,
    });
  };

  const onSubmitReply: SubmitHandler<CommentSchema> = (data) => {
    if (!replyingTo) return;
    createComment({
      postId,
      content: data.content,
      parentId: String(replyingTo),
    });
  };

  if (isLoading) return <div>Carregando comentários...</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="flex-1 border rounded px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Adicione um comentário..."
            />
          )}
        />
        <Button size="sm" type="submit" disabled={isPendingComment}>
          {isPendingComment ? (
            <>
              <Loader2 className="animate-spin" /> Comentando...
            </>
          ) : (
            "Comentar"
          )}
        </Button>
      </form>

      <div className="space-y-4">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col space-y-2">
            <div className="flex gap-3">
              <Link href={`/profile/${comment.user.id}`}>
                <Avatar className="h-10 w-10 cursor-pointer">
                  {comment.user.image ? (
                    <AvatarImage src={comment.user.image} />
                  ) : (
                    <AvatarFallback className="bg-primary text-primary dark:text-foreground font-medium">
                      {comment.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  )}
                </Avatar>
              </Link>
              <div className="flex-1 bg-gray-100 rounded-lg p-3">
                <span className="font-medium text-sm">{comment.user.name}</span>
                <p className="text-sm mt-1">{comment.content}</p>

                <div className="mt-2 flex gap-3 text-xs text-gray-500">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="px-1 py-0"
                    onClick={() =>
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id
                      )
                    }
                  >
                    Responder
                  </Button>
                </div>

                {replyingTo === comment.id && (
                  <form
                    onSubmit={handleSubmitReply(onSubmitReply)}
                    className="flex gap-2 mt-2"
                  >
                    <Controller
                      name="content"
                      control={replyControl}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          className="flex-1 border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-primary focus:outline-none"
                          placeholder="Escreva sua resposta..."
                        />
                      )}
                    />
                    <Button size="sm" type="submit" disabled={isPendingComment}>
                      {isPendingComment ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {comment.replies.length > 0 && (
              <div className="ml-12 space-y-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex gap-3">
                    <Link href={`/profile/${reply.user.id}`}>
                      <Avatar className="h-8 w-8 cursor-pointer">
                        {reply.user.image ? (
                          <AvatarImage src={reply.user.image} />
                        ) : (
                          <AvatarFallback className="bg-secondary text-secondary-foreground font-medium">
                            {reply.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                    </Link>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2">
                      <span className="font-medium text-sm">
                        {reply.user.name}
                      </span>
                      <p className="text-sm mt-0.5">{reply.content}</p>
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
