import { redirect } from "next/navigation"
import MainComponent from "@/components/MainComponent"
import NavComponent from "@/components/NavComponent"
import RightSectionComponent from "@/components/RightSectionComponent"

import checkLogin from "@/lib/checkLogin"

export default async function Home() {
    if(await checkLogin() !== true) redirect("/?login=true");

    return (
        <>
            <NavComponent />
            <MainComponent />
            <RightSectionComponent />
        </>
    )
}
