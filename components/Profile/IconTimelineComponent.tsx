"use client";

import type { UserData } from "@/lib/types/userdata.types";

export default function IconTimelineComponent(props: { currentUser: UserData }) {
    const { currentUser } = props;
    return (
        <>
            <div className="w-full relative">
                <div className="w-full h-[200px] bg-slate"></div>
                <div className="w-[130px] h-[130px] rounded-full bg-slate absolute top-[130px] left-4 border-4 border-black"></div>
            </div>

            <div className="w-full">
                <span className="float-right border rounded-full font-semibold border-slate/75 px-4 py-2 m-2">Edit Profile</span>
            </div>
        </>
    )
}
