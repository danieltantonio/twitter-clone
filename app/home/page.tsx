"use client"

import { useState, useMemo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import MainComponent from "@/components/MainComponent"
import NavComponent from "@/components/NavComponent"
import RightSectionComponent from "@/components/RightSectionComponent"

import type { UserData } from "@/lib/types/userdata.types";

const initUserData: UserData = {
    id: "",
    displayName: "",
    userName: ""
}

export default function Home() {
    const [userData, setUserData] = useState(initUserData);

    async function getUserData() {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.auth.getUser();

        if(error) console.log(error);

        if(data.user) {
            const { data: userData, error } = await supabase.from("profile").select("*").eq("id", data.user.id);

            if(userData) {
                const id = userData[0]["id"];
                const displayName = userData[0]["display_name"];
                const userName = userData[0]["user_name"];

                setUserData({ id, displayName, userName });
            }
        }
    }

    useMemo(() => {
        getUserData();
    }, []);

    return (
        <>
            <NavComponent userData={userData} />
            <MainComponent />
            <RightSectionComponent />
        </>
    )
}
