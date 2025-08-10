import { createClient } from "@supabase/supabase-js";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method !== "OPTIONS") {
    return new Response("Ok!", { headers: corsHeaders });
  }

  try {
    const { link_id } = await req.json();

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const user_agent = req.headers.get("user-agent") || "unknown";
    const referrer = req.headers.get("referer") || "unknown";
    const ip_country = req.headers.get("x-cf-ipcountry") ?? "unknown";

    const { error } = await supabaseAdmin.from("click_events").insert({
      link_id,
      user_agent,
      referrer,
      ip_country,
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ message: "Click tracked successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error tracking click:", error);
    return new Response(JSON.stringify({ error: "Failed to track click" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
