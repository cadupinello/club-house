import { Header } from "../_components/header";
import ContentFeed from "./_components/content-feed";

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="space-y-6">
          <ContentFeed />
        </div>
      </main>
    </div>
  );
}
