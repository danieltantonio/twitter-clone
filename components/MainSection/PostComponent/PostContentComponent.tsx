import { BsDot, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Tweet } from "@/lib/types/tweet.types";

dayjs.extend(relativeTime);

export default function PostContentComponent(props: { tweet: Tweet }) {
    const { tweet } = props;

    return (
        <div className="ml-2">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row text-sm justify-between">
                    <span className="font-bold">{tweet.authorInfo.authorDisplayName}</span>
                    <div className="flex flex-row ml-2 font-light">
                        <span className="text-slate/75">@{tweet.authorInfo.authorUserName}</span>
                        <BsDot className="h-full text-slate/75" />
                        <span className="text-slate/75">{dayjs(tweet.createdAt).fromNow()}</span>
                    </div>
                </div>
                <div>
                    <BsThreeDots className="h-full text-slate/75" />
                </div>
            </div>
            <div id="post" className="text-sm font-light mb-2">
                <span>{tweet.textContent}</span>
            </div>
        </div>
    )
}