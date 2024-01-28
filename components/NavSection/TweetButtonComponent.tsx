"use client";

import { useTweetReplyModalState } from "@/lib/store/tweetReplyModal";

export default function TweetButtonComponent() {
    const { setTweetModal } = useTweetReplyModalState();
    return (
        <button className="bg-primary w-[90%] py-4 rounded-full font-bold mt-5" onClick={() => setTweetModal(true)}>Tweet</button>
    )
}
