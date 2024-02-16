import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const cookiesList = cookies();
    const supabase = await createClient(cookiesList);

    const { data, error } = await supabase.auth.getSession();

    if(error) console.log(error);

    if(!data.session) {
        console.log("Missing session");
    } else {
        const test = await supabase.from("profile").select("*").eq("id", data.session.user.id);
        console.log(test);
    }



    return NextResponse.json({ data: null, error: null });
}