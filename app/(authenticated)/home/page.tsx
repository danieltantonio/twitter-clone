import MainComponent from "@/components/MainSection/MainComponent"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getUserSessionID, getUserDataByID } from "@/lib/getUserData";


export default async function Home() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const session = await getUserSessionID(supabase);

    if(!session) {
        console.error("[/home getUserSessionID() Error]: Check logs.");
        return null;
    }

    if(!session.id) redirect("/");

    const currentUser = await getUserDataByID(supabase, session.id);

    if(!currentUser) {
        console.error("[/home getUserDataByID() Error]: Check logs.");
        return null;
    }

    return (
        <MainComponent currentUser={currentUser} />
    )
}
