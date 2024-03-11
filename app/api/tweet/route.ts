import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: getAllTweets, error: getAllTweetsErr } = await supabase
        .from("secured_tweets")
        .select(`*`)
        .eq("is_reply", false)

    if (getAllTweetsErr) return NextResponse.json({ Error: "Server failed to retrieve tweets. Please try again." }, { status: 500 });

    return NextResponse.json(getAllTweets, { status: 200 });
}