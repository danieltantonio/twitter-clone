import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import MainComponent from "@/components/MainSection/MainComponent"
import NavComponent from "@/components/NavSection/NavComponent"
import RightSectionComponent from "@/components/RightSectionComponent"

import type { UserData } from "@/lib/types/userdata.types";

async function getUserData() {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error({ HomeComponent: error });
        return;
    }

    if (data.user) {
        const { data: userData, error: dataError } = await supabase.from("profile").select("*").eq("id", data.user.id);

        if (dataError) console.error(dataError);

        if (userData) {
            const id = userData[0]["id"];
            const displayName = userData[0]["display_name"];
            const userName = userData[0]["user_name"];

            return ({ id, displayName, userName });
        }
    }
}

export default async function Home() {
    const userData: UserData | undefined = await getUserData();

    return (
        <>
            {
                userData && (
                    <>
                        <NavComponent userData={userData} />
                        <MainComponent userData={userData} />
                        <RightSectionComponent />
                    </>
                )
            }
        </>
    )
}
