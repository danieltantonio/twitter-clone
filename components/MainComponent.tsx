"use client"

import PostComponent from "./PostComponent";
import { PostTweet } from "./ServerComponents/TweetActions";

import { AiOutlinePicture, AiOutlineFileGif, AiOutlineSchedule, AiOutlineHeart } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "@material-tailwind/react";

import type { Tweet } from "@/lib/types/tweet.types";

const initPosts: Tweet[] = [];

function checkIfScrollBar(e: React.ChangeEvent<HTMLInputElement>) {
  e.target.style.height = "auto";
  const scHeight = e.target.scrollHeight;
  e.target.style.height = `${scHeight}px`;
}

function HomeOption(props: { label: string, className?: string }): JSX.Element {
  const { label, className } = props;
  let includedClasses = "w-1/2 text-center p-4 h-full hover:bg-white/10 font-semibold text-sm group";

  if (className) includedClasses = includedClasses.concat(" ", className);

  return (
    <div className={includedClasses}>
      <span>{label}</span>
    </div>
  )
}

export default function MainComponent() {
  const [posts, setPosts] = useState(initPosts);

  async function getTweets() {
    const res = await fetch("http://localhost:3000/api/tweets");
    const getTweets = await res.json();

    const tweets = getTweets.tweetData;

    setPosts(tweets);
  }

  async function handlePostTweet(formData: FormData) {
    const supabase = createClientComponentClient();
    const tweetData = formData.get("tweet");

    const { data, error } = await supabase.auth.getUser();

    PostTweet(formData);

    // if (data.user) setPosts([{ id: null, post_content: tweetData, profile_id: data.user.id, created_at: Date.now(), profile:  }, ...posts]);
  }

  useEffect(() => {
    getTweets();
  }, []);

  return (
    <main className="w-[600px] border-x border-slate/25 flex flex-col">
      <div className="sticky top-0 flex flex-col border-b border-slate/25 bg-black/50 backdrop-blur-sm">
        <div className="p-4 w-full">
          <span className="font-semibold text-xl">Home</span>
        </div>
        <div className="w-full flex flex-row">
          <HomeOption label="For you" className="border-b-2" />
          <HomeOption label="Following" />
        </div>
      </div>

      <div className="flex flex-row w-full border-b border-slate/25 p-2 mt-2">
        <div className="mx-2">
          <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
        </div>
        <div className="flex flex-col w-full mx-2">
          <form action={handlePostTweet}>
            <textarea name="tweet" className="resize-none w-full bg-transparent text-xl placeholder:font-thin" placeholder="What is happening?" onInput={checkIfScrollBar}></textarea>
            <div className="flex flex-row justify-between mt-2">
              <div className="flex flex-row w-1/3 justify-between mt-2 text-primary text-xl">
                <AiOutlinePicture />
                <AiOutlineFileGif />
                <BiPoll />
                <HiOutlineEmojiHappy />
                <AiOutlineSchedule />
              </div>
              <div>
                <button className="text-white px-4 py-2 bg-primary font-bold rounded-full text-sm">Tweet</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {
        posts.length ?
          posts.map((tweet, i) => {
            return (
              <PostComponent key={i} tweet={tweet} />
            )
          })
          :
          <div className="mx-auto mt-4">
            <Spinner color="blue" className="h-12 w-12"/>
          </div>
      }
    </main>
  )
}
