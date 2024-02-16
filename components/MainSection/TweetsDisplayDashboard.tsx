"use client";

import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";

import PostComponent from "./PostComponent";
import TweetReplyModal from "./TweetReplyModal";

import type { Tweet } from "@/lib/types/tweet.types"
import type { UserData } from "@/lib/types/userdata.types"

export default function TweetsDisplayDashboard(props: { currentUser: UserData, username?: string }) {
    const { currentUser, username } = props;

    const initTweets: Tweet[] = [];
    const [tweets, setTweets] = useState(initTweets);

    async function getTweets(username?: string) {
        if (!username) {
            const fetchTweets = await fetch(`/api/tweet`);
            const tweets: Tweet[] = await fetchTweets.json();

            setTweets(tweets);
        } else {
            const fetchTweets = await fetch(`/api/tweet/${username}`);
            const tweets: Tweet[] = await fetchTweets.json();

            setTweets(tweets);
        }
    }

    useEffect(() => {
        if (username) {
            getTweets(username);
        } else {
            getTweets();
        }
    }, []);

    return (
        <>
            <TweetReplyModal currentUser={currentUser} />
            {
                !tweets.length ? (
                    <div className="h-full w-full flex flex-col justify-center">
                        <div className="mx-auto">
                            <Spinner className="w-12 h-12" color="blue" />
                        </div>
                    </div>
                )
                    :
                    tweets.map((tweet) => {
                        return (
                            <PostComponent key={tweet.id} tweet={tweet} currentUser={currentUser} />
                        )
                    })
            }
        </>
    )
}
