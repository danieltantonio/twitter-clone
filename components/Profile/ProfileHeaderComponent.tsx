"use client";

import { useRouter } from "next/navigation";

import { IoArrowBackOutline } from "react-icons/io5";

import type { UserData } from "@/lib/types/userdata.types";

export default function ProfileHeaderComponent(props: { userProfile: UserData, userPosts: { id: string }[] }) {
    const { userProfile, userPosts } = props;
    const router = useRouter();

    return (
        <div className="flex flex-row my-1">
            <div className="hover:bg-slate/20 p-2 mt-2 mr-4 ml-2 rounded-full">
                <IoArrowBackOutline className="text-2xl cursor-pointer" onClick={() => router.back()} />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-xl">{userProfile.displayName}</span>
                <span className="text-slate/75 text-xs">{userPosts.length} Posts</span>
            </div>
        </div>
    )
}
