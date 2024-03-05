"use client";

import { useRouter } from "next/navigation";

import { IoArrowBackOutline } from "react-icons/io5";

export default function PostHeaderComponent() {
    const router = useRouter();

    return (
        <div className="flex flex-row">
            <div className="hover:bg-slate/20 p-2 mt-2 mr-4 ml-2 rounded-full cursor-pointer" onClick={() => router.back()}>
                <IoArrowBackOutline className="text-2xl" />
            </div>
            <div className="flex flex-col justify-center">
                <span className="flex font-bold text-xl">Post</span>
            </div>
        </div>
    )
}