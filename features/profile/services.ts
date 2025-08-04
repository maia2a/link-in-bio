import { createClient } from "@/lib/supabase/client";
import { cache } from "react";
import "server-only";

export const getProfileByUsername = cache(async (username: string) => {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `
      full_name,
      avatar_url,
      links (
        id,
        title,
        url
      )
    `
    )
    .eq("username", username)
    .single(); // .single() garante que esperamos apenas um resultado ou um erro

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return profile;
});
