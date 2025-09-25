import { MemberProfile } from "@/app/(dashboard)/profile/_components/member-profile";
import { Header } from "@/app/_components/header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container mx-auto px-4 py-6 max-w-4xl">
        <MemberProfile />
      </section>
    </div>
  );
}
