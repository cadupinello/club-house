"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { PostCard } from "./post-card";

const ListPosts = () => {
  const { data: post, isLoading } = trpc.post.getAll.useQuery();

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        post?.map((post) => (
          <PostCard
            key={post.id}
            post={{
              id: String(post.id),
              author: {
                name: post.user.name,
                avatar: post.user.image ?? "/placeholder.svg",
                role: "user",
              },
              content: post.content,
              image: post.image ?? undefined,
              timestamp: new Date(post.createdAt).toLocaleString(),
              likes: post.likes,
              comments: post.comments.length,
              isLiked: false,
            }}
          />
        ))
      )}
    </div>
  );
};

export default ListPosts;
