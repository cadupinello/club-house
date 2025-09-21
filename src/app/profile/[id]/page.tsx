import { Header } from "@/app/_components/header";
import { MemberProfile } from "@/app/_components/member-profile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <MemberProfile />
      </main>
    </div>
  );
}
