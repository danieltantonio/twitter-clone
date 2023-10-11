"use client"

import { PostTweet } from "../ServerComponents/TweetActions";

import { AiOutlinePicture, AiOutlineFileGif, AiOutlineSchedule } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";

import type { UserData } from "@/lib/types/userdata.types";

export default function WriteTweetComponent(props: { userData: UserData }) {
    const { userData } = props;

    async function handlePostTweetServerAction(formData: FormData) {
        const createdTweet = await PostTweet(formData, userData.id);
        const getTweet = createdTweet?.[0];
    }

    function checkIfScrollBar(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.style.height = "auto";
        const scHeight = e.target.scrollHeight;
        e.target.style.height = `${scHeight}px`;
    }

    function handleTweetTextArea(e: React.FormEvent<HTMLTextAreaElement>) {
        checkIfScrollBar(e);
    }

    return (
        <form action={handlePostTweetServerAction}>
            <textarea name="tweet" className="resize-none w-full bg-transparent text-xl placeholder:font-thin" placeholder="What is happening?" onInput={handleTweetTextArea}></textarea>
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
    )
}
