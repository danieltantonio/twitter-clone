"use client"

import statToString from "@/lib/statToString";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useMemo } from "react";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

export default function InteractionComponent(props: { tweet: Tweet, userData: UserData }) {
    const { tweet, userData } = props;
    const [likes, setLikes] = useState(parseInt(tweet.likeCount));
    const [likedPost, setLikedPost] = useState(false);

    const supabase = createClientComponentClient();

    async function handleLike() {
        if (!likedPost) {
          const { data, error } = await supabase
            .from("like")
            .insert([
              { user_id: userData.id, tweet_id: tweet.tweetID }
            ])
            .select();

          if (data) {
            const newLike = data[0];

            setLikedPost(true);
            setLikes(likes + 1);
          }

        } else {
          await supabase
            .from("like")
            .delete()
            .eq("user_id", userData.id);

          setLikedPost(false);
          setLikes(likes - 1);
        }
    }

    useMemo(() => {
        if(tweet.hasLikedTweet) setLikedPost(true);
    }, []);

    return (
        <>
            <div className="flex flex-row items-center cursor-pointer">
                <div className="h-full p-2 rounded-full">
                    <FaRegComment />
                </div>
                <span className="text-sm font-light px-2">{statToString(408)}</span>
            </div>
            <div className="flex flex-row items-center cursor-pointer">
                <div className="h-full p-2 rounded-full">
                    <FaRetweet />
                </div>
                <span className="text-sm font-light px-2">{statToString(234)}</span>
            </div>
            <div className="flex flex-row items-center cursor-pointer group" onClick={handleLike}>
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
            <div className="flex flex-row items-center cursor-pointer">
                <div className="h-full p-2 rounded-full">
                    <IoIosStats />
                </div>
                <span className="text-sm font-light px-2">{statToString(10842)}</span>
            </div>
            <div className="flex flex-row items-center justify-center">
                <div className="h-full p-2 rounded-full">
                    <LuShare className="h-full" />
                </div>
            </div>
        </>
    )
}