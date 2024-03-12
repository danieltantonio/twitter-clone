"use client";

import { useRouter } from "next/navigation";

import { BsDot, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import fgClick from "@/lib/onClickForeground";

import type { Tweet } from "@/lib/types/tweet.types";

dayjs.extend(relativeTime);

export default function PostContentComponent(props: { tweet: Tweet }) {
    const { tweet } = props;
    const router = useRouter();

    return (
        <div className="ml-2">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row text-sm justify-between">
                    <div onClick={fgClick}>
                        <span className="hover:underline underline-offset-2 font-bold" onClick={() => router.push(`/${tweet.user_name}`)}>{tweet.display_name}</span>
                    </div>
                    <div className="flex flex-row ml-2 font-light">
                        <div onClick={fgClick}>
                            <span className="hover:underline underline-offset-2 text-slate/75" onClick={() => router.push(`/${tweet.user_name}`)}>@{tweet.user_name}</span>
                        </div>
                        <BsDot className="h-full text-slate/75" />
                        <span className="text-slate/75">{dayjs(tweet.created_at).fromNow()}</span>
                    </div>
                </div>
                <div>
                    <BsThreeDots className="h-full text-slate/75" />
                </div>
            </div>
            <div id="post" className="text-sm font-light mb-2">
                <span>{tweet.post_content}</span>
            </div>
        </div>
    )
}
