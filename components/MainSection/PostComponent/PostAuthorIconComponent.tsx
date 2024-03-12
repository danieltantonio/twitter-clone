"use client";

import Image from "next/image"
import { useRouter } from "next/navigation";

import fgClick from "@/lib/onClickForeground";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

export default function PostAuthorIconComponent(props: { tweet?: Tweet, userData?: UserData, isThread?: boolean }) {
    const { tweet, userData, isThread } = props;
    const router = useRouter();
    let imgSrc: string = "";
    let profileLink: string = "";

    if (!tweet && userData) {
        imgSrc = userData.avatarUrl;
        profileLink = userData.userName;
    } else if (tweet && !userData) {
        imgSrc = tweet.avatar_url;
        profileLink = tweet.user_name;
    } else if (!tweet && !userData) {
        console.error("PostAuthorIconComponent Error: Missing tweet prop or userData prop!");
        return null;
    } else if (tweet && userData) {
        return null;
    }

    return (
        <div className="flex flex-col">
            <div className="mx-2" onClick={fgClick}>
                <Image src={imgSrc} alt="" className="rounded-full" width={40} height={40} onClick={() => router.push(`/${profileLink}`)} />
            </div>
            {
                isThread && (
                    <div className="h-full w-full">
                        <div className="w-[2px] h-full bg-slate/50 mx-auto"></div>
                    </div>
                )
            }
        </div>
    )
}
