import { getProfileByUsername } from "@/features/profile/services";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProfilePageProps {
  params: { username: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getProfileByUsername(params.username);

  if (!profile) {
    notFound();
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <img
          src={profile.avatar_url || "/default-avatar.png"}
          alt={profile.full_name || "User Avatar"}
          className="w-24 h-24 rounded-full mx-auto object-cover shadow-md"
        />

        <h1 className="mt-4 text-2xl font-bold text-gray-800 ">
          {profile.full_name || `@${params.username}`}
        </h1>

        <div className="mt-8 space-y-4">
          {profile.links.map((link) => (
            <Link
              key={link.id}
              href={`/api/redirect/${link.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 font-semibold text-center text-blue-600 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 hover:scale-105 transform"
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
