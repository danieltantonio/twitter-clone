"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip, Typography } from "@material-tailwind/react";

import { BsDot, BsThreeDots, BsTrash3Fill } from "react-icons/bs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import fgClick from "@/lib/onClickForeground";

import { createClient } from "@/lib/supabase/client";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

dayjs.extend(relativeTime);

function DeleteTweetComponent(props: { tweet: Tweet, handleHasClickedDelete: (state: boolean) => void }) {
    const { tweet, handleHasClickedDelete } = props;
    const supabase = createClient();

    async function deleteTweet() {
        const { error } = await supabase
            .from("tweet")
            .delete()
            .eq("id", tweet.id);
        
        if(error) {
            alert("There was a server error deleting this tweet. Please try again later.")
        } else {
            handleHasClickedDelete(false);
        }
    }

    return (
        <div className="cursor-default justify-center absolute flex flex-row z-10 top-0 left-0 h-full w-full bg-slate/25" onClick={() => handleHasClickedDelete(false)}>
            <div className="flex flex-col justify-center h-full">
                <div onClick={fgClick} className="bg-black w-[300px] h-[300px] rounded-lg flex flex-col p-8">
                    <div className="flex flex-col mb-6">
                        <span className="font-bold text-xl mb-2">Delete post?</span>
                        <span className="text-slate/75 text-sm font-light">This can&apos;t be undone and it will be removed from your profile, the timeline of any accounts that follow you, and from search results. </span>
                    </div>
                    <div className="cursor-pointer w-full text-center bg-danger font-bold p-2 rounded-full mb-4" onClick={deleteTweet}><span>Delete</span></div>
                    <div className="cursor-pointer w-full text-center font-bold p-2 rounded-full border border-slate/75" onClick={() => handleHasClickedDelete(false)}><span>Cancel</span></div>
                </div>
            </div>
        </div>
    )
}

function ReportOrDeleteModal(props: { tweet: Tweet, currentUser: UserData, handleHasClickedDelete: (state: boolean) => void }) {
    const { tweet, currentUser, handleHasClickedDelete } = props;

    if (tweet.user_name === currentUser.userName) {
        return (
            <div className="flex flex-row text-danger text-md font-bold p-2 cursor-pointer hover:bg-slate/10 rounded-lg" onClick={() => handleHasClickedDelete(true)}>
                <div>
                    <BsTrash3Fill className="mx-2 h-full" size={14} />
                </div>
                <span className="mx-2">Delete</span>
            </div>
        )
    }
}

export default function PostContentComponent(props: { tweet: Tweet, currentUser: UserData }) {
    const { tweet, currentUser } = props;
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);
    const [hasClickedDelete, setHasClickedDelete] = useState(false);

    const router = useRouter();

    function closeComponentOnTooltip() {
        setIsTooltipOpen(false);
    }

    function handleHasClickedDelete(state: boolean) {
        closeComponentOnTooltip();
        setHasClickedDelete(state);
    }

    return (
        <div className="ml-2">
            <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row text-sm justify-between">
                    <div onClick={fgClick}>
                        <span className="hover:underline underline-offset-2 font-bold" onClick={() => router.push(`/${tweet.user_name}`)}>{tweet.display_name}</span>
                    </div>
                    <div className="flex flex-row ml-2 font-light">
                        <div onClick={fgClick}>
                            <span className="hover:underline underline-offset-2 text-slate/75" onClick={() => router.push(`/${tweet.user_name}`)}>@{tweet.user_name}</span>
                        </div>
                        <BsDot className="h-full text-slate/75" onClick={() => setIsTooltipOpen(true)} />
                        <span className="text-slate/75">{dayjs(tweet.created_at).fromNow()}</span>
                    </div>
                </div>
                <div onClick={fgClick} className="group p-1 hover:bg-primary/20 rounded-full">
                    <Tooltip
                        open={isTooltipOpen}
                        className="bg-black z-20 border border-rlgrey drop-shadow-tooltip p-0"
                        placement="bottom-end"
                        content={
                            <div onClick={fgClick}>
                                <ReportOrDeleteModal tweet={tweet} currentUser={currentUser} handleHasClickedDelete={handleHasClickedDelete} />
                            </div>
                        }
                    >
                        <Typography onClick={() => setIsTooltipOpen(true)}>
                            <BsThreeDots className="group-hover:text-primary text-slate/75" />
                        </Typography>
                    </Tooltip>
                    {
                        isTooltipOpen ?
                            <div className="cursor-default absolute top-0 left-0 z-10 w-full h-full" onClick={closeComponentOnTooltip}></div>
                            :
                            null
                    }
                    {
                        hasClickedDelete ?
                            <DeleteTweetComponent tweet={tweet} handleHasClickedDelete={handleHasClickedDelete} />
                            :
                            null
                    }
                </div>
            </div>
            <div id="post" className="text-sm font-light mb-2">
                <span>{tweet.post_content}</span>
            </div>
        </div>
    )
}
