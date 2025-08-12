import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ linkId: string }> }
) {
  const { linkId: linkIdStr } = await context.params;
  const linkId = parseInt(linkIdStr, 10);

  if (!Number.isFinite(linkId)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const supabase = await createClient();

  const { data: link, error } = await supabase
    .from("links")
    .select("url")
    .eq("id", linkId)
    .single();

  if (error || !link) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    await supabase.functions.invoke("track-click", {
      body: { link_id: linkId },
    });
  } catch (error) {
    console.error("Error invoking track-click function:", error);
  }

  return NextResponse.redirect(link.url);
}
