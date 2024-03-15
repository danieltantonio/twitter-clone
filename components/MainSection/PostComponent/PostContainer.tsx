"use client";

import PostComponent from "./PostComponent";

import type { UserData } from "@/lib/types/userdata.types";
import type { Tweet } from "@/lib/types/tweet.types";

export default function PostComponentContainer(props: { currentUser: UserData, fetchedTweets: Tweet[] }) {
    const { currentUser, fetchedTweets } = props;

    return (
        <>
            {
                !fetchedTweets.length ? (
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="mx-auto font-bold">
                            No posts yet!
                        </div>
                    </div>
                )
                    :
                    fetchedTweets.map((tweet) => {
                        return (
                            <PostComponent key={tweet.id} tweet={tweet} currentUser={currentUser} />
                        )
                    })
            }
        </>
    )
}