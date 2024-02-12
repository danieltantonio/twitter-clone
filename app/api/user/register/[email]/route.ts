import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest, { params }: { params: { email: string }}) {
    const { email } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data, error } = await supabase.from("profile").select("email").eq("email", email);

    if(error) {
        console.error("SQL Error /email/[email]: ", error);
        return NextResponse.json({ data: null, error: "SQL Server error. Check console." }, {
            status: 500
        });
    }

    if(!data.length) {
        return NextResponse.json({ data: null, error: "No user found with that email." }, {
            status: 404
        });
    }

    return NextResponse.json({ data: "User exists", error: null }, {
        status: 200
    });
}