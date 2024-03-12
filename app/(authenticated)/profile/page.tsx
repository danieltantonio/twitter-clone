import { redirect } from "next/navigation"
import { cookies } from "next/headers";

import { createClient } from "@/lib/supabase/server";
import { getUserDataByID, getUserSessionID } from "@/lib/getUserData"

export default async function Profile() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { id, error: sessionErr } = await getUserSessionID(supabase);

    if(sessionErr) {
        console.error(`Profile Component Session ${sessionErr.status} Error: ${sessionErr.message}`);
        return null;
    }

    const sessionID = id as string;

    const { userData, error: getUserErr } = await getUserDataByID(supabase, sessionID);

    if(getUserErr) {
        console.error(`Profile Component getUser ${getUserErr.status} Error: ${getUserErr.message}`);
        return null;
    } else {
        redirect(`/${userData?.userName}`);
    }

    return (
        <div className="absolute h-full w-full top-0 left-0 bg-black">
            
        </div>
    )
}