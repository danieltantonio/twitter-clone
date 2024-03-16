import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest, { params }: { params: { username: string }}) {
    let { username } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    username = username.toLowerCase();
    
    const { data: userProfiles, error: sqlErr } = await supabase.from("profile").select("*").eq("user_name", username);

    if(sqlErr) {
        console.error("/api/user/[username] SQL Error: ", sqlErr);
        return NextResponse.json({ data: null, error: "Database Server error. Check console." }, {
            status: 500
        });
    }

    if(!userProfiles.length) {
        return NextResponse.json({ data: null, error: "User does not exist" }, {
            status: 404
        });
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