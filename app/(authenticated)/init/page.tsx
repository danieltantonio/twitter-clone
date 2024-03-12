import IntroComponent from "@/components/Init/IntroComponent";

import { redirect } from "next/navigation";
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

import { getUserSessionID, getUserDataByID } from "@/lib/getUserData";

import type { UserData } from "@/lib/types/userdata.types";

export default async function InitProfile() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { id, error: sessionErr } = await getUserSessionID(supabase);

    if(sessionErr) {
        if(sessionErr.status === 500) {
            console.error(`InitProfile ${sessionErr.status} Error: ${sessionErr.message}`);
            return null;
        } else {
            redirect("/"); // User is not logged in
        }
    }

    const { userData, error: userDataErr } = await getUserDataByID(supabase, id);

    if(userDataErr) {
        console.error(`InitProfile ${userDataErr.status} Error: ${userDataErr.message}`);
        return null;
    }

    if(userData?.init) redirect("/home"); // User already initialized their profile.

    const currentUser = userData as UserData;

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-rdgrey z-10">
            <IntroComponent currentUser={currentUser}/>
        </div>
    )
}
