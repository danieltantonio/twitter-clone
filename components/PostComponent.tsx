"use client"

import statToString from "@/lib/statToString";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useMemo } from "react";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";
import type { Like } from "@/lib/types/like.types";

dayjs.extend(relativeTime);

const initRecentlyLikedPosts: Like[] = [];

function InteractionComponent(props: { tweet: Tweet, userData: UserData }) {
  const { tweet, userData } = props;
  const [likes, setLikes] = useState(tweet.like.length);
  const [recentlyLikedPosts, setRecentlyLikedPosts] = useState(initRecentlyLikedPosts);
  const [likedPost, setLikedPost] = useState(false);

  const supabase = createClientComponentClient();
  const findUserAlreadyLiked = tweet.like.filter(user => user.user_id === userData.id);
  const includesUser = findUserAlreadyLiked.length;

  useMemo(() => {
    if (includesUser) {
      setLikedPost(true);
    }
  }, []);

  async function handleLike() {
    const findUserRecentlyLiked = recentlyLikedPosts.filter(user => user.user_id === userData.id);
    const includesRecentlyLiked = findUserRecentlyLiked.length;

    if (!includesUser && !includesRecentlyLiked) {
      const { data, error } = await supabase
        .from("like")
        .insert([
          { user_id: userData.id, tweet_id: tweet.id }
        ])
        .select();

      if (data) {
        const newLike = data[0];

        setRecentlyLikedPosts([...recentlyLikedPosts, { id: newLike.id, user_id: newLike.user_id }])
        setLikedPost(true);
        setLikes(likes + 1);
      }

    } else {
      await supabase
        .from("like")
        .delete()
        .eq("user_id", userData.id);

      if (includesRecentlyLiked) {
        setRecentlyLikedPosts(recentlyLikedPosts.filter(post => post.id !== findUserRecentlyLiked[0].id));
      }

      setLikedPost(false);
      setLikes(likes - 1);
    }
  }

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

export default function PostComponent(props: { tweet: Tweet, userData: UserData }) {
  const { tweet, userData } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-4 border-b-2 border-slate/25">
        <div className="mr-3">
          <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-row text-sm justify-between">
              <span className="font-bold">{tweet.profile["display_name"]}</span>
              <div className="flex flex-row ml-2 font-light">
                <span className="text-slate/75">@{tweet.profile["user_name"]}</span>
                <BsDot className="h-full text-slate/75" />
                <span className="text-slate/75">{dayjs(tweet["created_at"]).fromNow()}</span>
              </div>
            </div>
            <div>
              <BsThreeDots className="h-full text-slate/75" />
            </div>
          </div>
          <div id="post" className="text-sm font-light mb-2">
            <span>{tweet["post_content"]}</span>
          </div>
          <div className="flex flex-row text-slate/75 text-lg mt-2 justify-between w-full">
            <InteractionComponent tweet={tweet} userData={userData} />
          </div>
        </div>
      </div>
    </div>
  )
}