"use client"

import { AiOutlinePicture, AiOutlineFileGif, AiOutlineSchedule } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";

export default function WriteTweetInteractionComponent() {
    
    return (
        <div className="flex flex-row justify-between mt-2 w-full">
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
    )
}
