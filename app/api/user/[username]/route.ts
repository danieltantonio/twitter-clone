import { createClient } from "@/lib/supabase/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { username: string }}) {
    const { username } = params;
    const supabase = await createClient();
    
    const { data: userProfiles, error: sqlErr } = await supabase.from("profile").select("*").eq("user_name", username);

    if(sqlErr) {
        console.error("/api/user/[username] SQL Error: ", sqlErr);
        return NextResponse.json({ "API Error": "SQL Error, check console." });
    }

    const users = userProfiles as any[];
    const user = users[0];
    const id = user.id;
    const userName = user["user_name"];
    const displayName = user["display_name"];
    const createdAt = user["created_at"];
    const avatarUrl = user["avatar_url"];
    const headerUrl = user["header_url"];
    const bio = user.bio;

    return NextResponse.json({ id, userName, displayName, createdAt, avatarUrl, headerUrl, bio });
}