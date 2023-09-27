import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

import MainComponent from "@/components/MainComponent"
import NavComponent from "@/components/NavComponent"
import RightSectionComponent from "@/components/RightSectionComponent"

import checkLogin from "@/lib/checkLogin"

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const { data, error } = await supabase.auth.getUser();

    if(await checkLogin() !== true) redirect("/?login=true");

    return (
        <>
            <NavComponent />
            <MainComponent />
            <RightSectionComponent />
        </>
    )
}
