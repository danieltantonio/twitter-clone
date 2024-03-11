import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    const { username } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: getUserTweets, error: getUserTweetsErr } = await supabase
        .from("secured_tweets")
        .select("*")
        .eq("user_name", username);

    if (getUserTweetsErr) {
        return NextResponse.json({ Error: "Server error retrieving tweets. Please try again." }, { status: 200 });
    }

    return NextResponse.json(getUserTweets, { status: 200 });
}
