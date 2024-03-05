"use client"

import statToString from "@/lib/statToString";
import fgClick from "@/lib/onClickForeground";
import { createClient } from "@/lib/supabase/client";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { BiRepost } from "react-icons/bi";

import { useState, useMemo } from "react";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

export default function InteractionComponent(props: { tweet: Tweet, currentUser: UserData }) {
    const { tweet, currentUser } = props;
    const [likes, setLikes] = useState(parseInt(tweet.likeCount));
    const [replies, setReplies] = useState(parseInt(tweet.replyCount));
    const [likedPost, setLikedPost] = useState(false);

    const supabase = createClient();

    async function handleLike() {
        if (!likedPost) {
            const { data, error } = await supabase
                .from("like")
                .insert([
                    { user_id: currentUser.id, tweet_id: tweet.id }
                ])
                .select();

            if (error) {
                console.error(error);
            }

            if (data) {
                setLikedPost(true);
                setLikes(likes + 1);
            }

        } else {
            await supabase
                .from("like")
                .delete()
                .eq("user_id", currentUser.id)
                .eq("tweet_id", tweet.id);

            setLikedPost(false);
            setLikes(likes - 1);
        }
    }

    useMemo(() => {
        if (tweet.hasLikedTweet) setLikedPost(true);
    }, []);

    return (
        <div className="flex flex-row text-slate/75 text-lg mt-2 justify-between w-full z-10">
            <div onClick={fgClick}>
                <div className="flex flex-row items-center cursor-pointer group">
                    <div className="h-full p-2 rounded-full group-hover:bg-primary/20">
                        <FaRegComment className="group-hover:text-primary" />
                    </div>
                    <span className="text-sm font-light px-2 group-hover:text-primary">{statToString(replies)}</span>
                </div>
            </div>
            <div onClick={fgClick}>
                <div className="flex flex-row items-center cursor-pointer group h-full">
                    <div className="text-2xl">
                        <div className="group-hover:bg-retweet/20 h-full rounded-full p-1">
                            <BiRepost className="h-full group-hover:text-retweet" />
                        </div>
                    </div>
                    <span className="text-sm font-light px-2 group-hover:text-retweet">{statToString(234)}</span>
                </div>
            </div>
            <div onClick={fgClick}>
                <div className="flex flex-row items-center cursor-pointer group h-full" onClick={handleLike}>
                    <div className="h-full p-2 rounded-full group-hover:bg-like/20">
                        {
                            likedPost ?
                                <AiFillHeart className="text-like" />
                                :
                                <AiOutlineHeart className="group-hover:text-like/50" />
                        }
                    </div>
                    <span className={`text-sm font-light px-2 group-hover:text-like ${likedPost && "text-like"}`}>{statToString(likes)}</span>
                </div>
            </div>
            <div onClick={fgClick}>
                <div className="flex flex-row items-center cursor-pointer group">
                    <div className="h-full p-2 rounded-full group-hover:bg-primary/20">
                        <IoIosStats className="group-hover:text-primary"/>
                    </div>
                    <span className="text-sm font-light px-2 group-hover:text-primary">{statToString(10842)}</span>
                </div>
            </div>
            <div className="flex flex-row items-center justify-center">
                <div className="h-full p-2 rounded-full">
                    <LuShare className="h-full" />
                </div>
            </div>
        </div>
    )
}