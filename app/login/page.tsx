"use client";
import { createClient } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const supabase = createClient();

  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">
          Acesse sua conta
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github"]}
          redirectTo={redirectTo}
        />
      </div>
    </div>
  );
}
