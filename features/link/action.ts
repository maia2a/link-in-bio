"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const linkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL").min(1, "URL is required"),
});

export async function createLinkAction(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: existingProfile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();
  if (profileError || !existingProfile) {
    const { error: insertProfileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: user.email?.split("@")[0] || "user",
        full_name: user.email?.split("@")[0] || "User",
        avatar_url: user.user_metadata.avatar_url || null,
      });
    if (insertProfileError) {
      throw new Error(insertProfileError.message);
    }
  }

  const validateFields = linkSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
  });
  if (!validateFields.success) {
    throw validateFields.error;
  }
  const { error } = await supabase.from("links").insert({
    title: validateFields.data.title,
    url: validateFields.data.url,
    user_id: user.id,
  });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/dashboard");
}

export async function deleteLinkAction(linkId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", linkId)
    .eq("user_id", user.id);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath("/dashboard");
  throw new Error("Link deleted successfully");
}
