"use client";

import EditProfileModal from "../Profile/Modals/EditProfileModal";

import { useState } from "react";
import type { UserData } from "@/lib/types/userdata.types";

export default function IntroComponent(props: { currentUser: UserData }) {
    const { currentUser } = props;
    const [intro, setIntro] = useState(0);

    function nextStepIntro() {
        setIntro(intro + 1);
    }

    return (
        <div className="flex flex-row justify-center mt-10">
            {
                intro === 0 && (
                    <div className="bg-black w-[600px] rounded-2xl">
                        <div className="p-4 flex flex-col">
                            <span className="text-6xl font-extrabold my-10">Welcome to my Twitter Clone!</span>
                            <span className="text-lg mb-10">
                                Let&apos;s get you started with customizing your profile.
                            </span>
                            <span className="bg-primary text-white font-bold text-2xl text-center rounded-full p-3 cursor-pointer" onClick={nextStepIntro}>Begin!</span>
                        </div>
                    </div>
                )
            }
            {
                intro === 1 && (
                    <EditProfileModal currentUser={currentUser} initProfile={true} />
                )
            }
        </div>
    )
}
