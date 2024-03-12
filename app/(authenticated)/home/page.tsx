import MainComponent from "@/components/MainSection/MainComponent"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getUserSessionID, getUserDataByID } from "@/lib/getUserData";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const session = await getUserSessionID(supabase);

    if(session.error) {
        const statusError = session.error.status;

        if(statusError === 500) {
            console.error(`Home Component Status Error 500: ${session.error.message}`);
            return null;
        } else if (statusError === 403) redirect("/");
    }

    const getCurrentUser = await getUserDataByID(supabase, session.id);

    if(getCurrentUser.error) {
        const statusError = getCurrentUser.error.status;

        if(statusError === 500) {
            console.error(`Home Component Status Error 500: ${getCurrentUser.error.message}`);
            return null;
        } else if (statusError === 404) redirect("/");
    }

    const currentUser = getCurrentUser.userData as UserData;

    if(!currentUser.init) {
        redirect("/init");
    }

    return (
        <MainComponent currentUser={currentUser} />
    )
}
