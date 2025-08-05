import { createClient } from "@/lib/supabase/client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error("Erro ao trocar o código por sessão:", error);
      return NextResponse.redirect(
        `${requestUrl.origin}/login?error=auth_failed`
      );
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
