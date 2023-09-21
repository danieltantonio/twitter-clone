import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import MainComponent from "@/components/MainComponent"
import NavComponent from "@/components/NavComponent"
import RightSectionComponent from "@/components/RightSectionComponent"

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.getUser();

    if(error?.status === 401 && !data.user) redirect("/login");

    return (
        <>
            <NavComponent />
            <MainComponent />
            <RightSectionComponent />
        </>
    )
}
