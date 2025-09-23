"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/lib/trpc";
import { PostCard } from "./post-card";

const ListPosts = () => {
  const { data: post, isLoading } = trpc.post.getAll.useQuery();

  console.log(post);

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        post?.map((post) => <PostCard key={post.id} postCard={post} />)
      )}
    </div>
  );
};

export default ListPosts;
