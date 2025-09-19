"use client";

import { trpc } from "../../../lib/trpc";

const ContentFeed = () => {
  const { data, isLoading } = trpc.hello.useQuery({ name: "Carlos" });

  if (isLoading) return <p>Carregando...</p>;
  return <p>{data?.greeting}</p>;
};

export default ContentFeed;
