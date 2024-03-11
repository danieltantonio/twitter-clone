"use client";
import { revalidatePath } from "next/cache";
import { useState, useEffect } from "react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { LuShare } from "react-icons/lu";
import { BiRepost } from "react-icons/bi";

import { createClient } from "@/lib/supabase/client";

import statToString from "@/lib/statToString";

import type { Tweet } from "@/lib/types/tweet.types";
import { UserData } from "@/lib/types/userdata.types";

export default function UserPostInteractionComponent(props: { tweet: Tweet, replies: Tweet[], currentUser: UserData, postID: string }) {
    const { tweet, replies, currentUser, postID } = props;
    const [likedPost, setLikedPost] = useState(false);
    const [likeCount, setLikeCount] = useState(tweet.like_count);
    const supabase = createClient();

    async function handleLike() {
        if (!likedPost) {
            const { data, error } = await supabase
                .from("like")
                .insert(
                    { user_id: currentUser.id, tweet_id: tweet.id }
                )
                .select();

            if (error) {
                console.error(error);
            }

            if (data) {
                setLikedPost(true);
                setLikeCount(likeCount + 1);
            }

        } else {
            await supabase
                .from("like")
                .delete()
                .eq("user_id", currentUser.id)
                .eq("tweet_id", tweet.id);

            setLikedPost(false);
            setLikeCount(likeCount - 1);
        }
    }

    useEffect(() => {
        if(tweet.has_liked_tweet) setLikedPost(true);
    }, []);

    return (
        <div className="text-slate/75 text-md flex flex-row border-y border-slate/25 justify-evenly py-2 text-lg">
            <div className="flex flex-row items-center h-full cursor-pointer">
                <FaRegComment className="h-full" />
                <span className="text-sm px-2">{replies.length}</span>
            </div>
            <div className="flex flex-row items-center h-full cursor-pointer">
                <BiRepost className="text-2xl" />
                <span className="text-sm px-2">{statToString(0)}</span>
            </div>
            <div className="flex flex-row items-center h-full cursor-pointer" onClick={handleLike}>
                {
                    likedPost ?
                        <AiFillHeart className="h-full text-like" />
                        :
                        <AiOutlineHeart className="h-full" />
                }
                <span className="text-sm px-2">{statToString(likeCount)}</span>
            </div>
            <div className="flex flex-row items-center h-full cursor-pointer">
                <LuShare className="h-full" />
            </div>
        </div>
    )
}
