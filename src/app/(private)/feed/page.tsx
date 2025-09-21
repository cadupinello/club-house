import { Header } from "../_components/header";
import { CreatePostWrapper } from "./_components/create-post-wrapper";
import ListPosts from "./_components/list-posts";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          <CreatePostWrapper />
          <ListPosts />
        </div>
      </main>
    </div>
  );
}
