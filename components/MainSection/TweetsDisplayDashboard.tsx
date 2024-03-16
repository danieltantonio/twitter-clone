"use client";

import PostComponentContainer from "./PostComponent/PostContainer";

import type { Tweet } from "@/lib/types/tweet.types"
import type { UserData } from "@/lib/types/userdata.types"

export default function TweetsDisplayDashboard(props: { username?: string, currentUser: UserData, fetchedTweets: Tweet[] }) {
    const { currentUser, fetchedTweets } = props;

    return (
        <>
            <PostComponentContainer currentUser={currentUser} fetchedTweets={fetchedTweets} />
        </>
    )
}
