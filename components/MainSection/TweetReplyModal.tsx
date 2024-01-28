"use client"

import WriteTweetInteractionComponent from "./WriteTweetInteractionComponent";
import WriteTweetComponent from "@/components/MainSection/WriteTweetComponent";

import fgClick from "@/lib/onClickForeground";
import { PostTweet } from "../../lib/ServerActions/TweetActions";
import { useTweetReplyModalState } from "@/lib/store/tweetReplyModal";

import { useState } from "react";

import { CgClose } from "react-icons/cg";

import type { UserData } from "@/lib/types/userdata.types";

export default function TweetReplyModal(props: { userData: UserData }) {
    const { userData } = props;
    const { tweetModal, replyModal, setTweetModal, setReplyModal } = useTweetReplyModalState();
    
    function closeTweetModal() {
        setTweetModal(false);
        setReplyModal(false);
    }

    async function handlePostTweetServerAction(formData: FormData) {
        const createdTweet = await PostTweet(formData, userData.id);
        closeTweetModal();
    }

    return (
        <>
            {
                (tweetModal || replyModal) && (
                    <div className="fixed top-0 left-0 h-full w-screen bg-slate/50 z-10" onClick={() => setTweetModal(false)}>
                        <div className="flex flex-row justify-center mt-10">
                            <div className="bg-black w-[600px] rounded-2xl" onClick={fgClick}>
                                <div className="flex flex-col mx-4">
                                    <div className="flex flex-row mt-4 justify-between w-full">
                                        <CgClose size={20} className="h-full font-bold cursor-pointer" onClick={() => setTweetModal(false)} />
                                        <span className="text-primary font-bold">Drafts</span>
                                    </div>
                                    <div className="my-4 flex flex-col">
                                        <form action={handlePostTweetServerAction}>
                                            <div className="flex flex-row border-b border-slate/40">
                                                <div className="mx-2">
                                                    <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
                                                </div>
                                                <div className="ml-2 w-full mb-2">
                                                    <WriteTweetComponent />
                                                </div>
                                            </div>
                                            <WriteTweetInteractionComponent />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
