import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.getUser();

    if(!data.user) {
        return NextResponse.json({ "User Error": "Not logged in" });
    }
    
    if(data.user) {
        const { data: userProfiles, error: sqlErr } = await supabase.from("profile").select("*").eq("user_name", data.user.user_metadata.user_name);
        
        if(sqlErr) {
            console.error("/api/user/[username] SQL Error: ", sqlErr);
            return NextResponse.json({ "API Error": "SQL Error, check console." });
        }
    
        const users = userProfiles as any[];
        const user = users[0];
        const id = user.id;
        const userName = user["user_name"];
        const displayName = user["display_name"];
        
        return NextResponse.json({ id, userName, displayName });
    }

    if(error) {
        console.error("/api/user ERROR:", error);
        return NextResponse.json({ "API Error": "Please check console" });
    }
}