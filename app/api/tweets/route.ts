import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: tweetData, error } = await supabase
                            .from("tweet")
                            .select(`
                            *,
                            profile (
                                user_name,
                                display_name
                            )
                            `)
                            .order("created_at", { ascending: false });
    
    if(error) console.log({ error });
    
    return NextResponse.json({ tweetData });
}