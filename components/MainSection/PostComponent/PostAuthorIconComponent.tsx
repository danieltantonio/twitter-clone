import Image from "next/image"

import type { Tweet } from "@/lib/types/tweet.types";
import { UserData } from "@/lib/types/userdata.types";

export default function PostAuthorIconComponent(props: { tweet?: Tweet, userData?: UserData, isThread?: boolean }) {
    const { tweet, userData, isThread } = props;
    let imgSrc: string = "";

    if (!tweet && userData) {
        imgSrc = userData.avatarUrl;
    } else if (tweet && !userData) {
        imgSrc = tweet.authorInfo.authorAvatarUrl;
    } else if (!tweet && !userData) {
        console.error("PostAuthorIconComponent Error: Missing tweet prop or userData prop!");
        return null;
    } else if (tweet && userData) {
        imgSrc = tweet.authorInfo.authorAvatarUrl;
    }

    return (
        <div className="flex flex-col">
            <div className="mx-2">
                <Image src={imgSrc} alt="" className="rounded-full" width={40} height={40} />
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
