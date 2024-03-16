"use client";

import WriteTweetInteractionComponent from "./MainSection/WriteTweetInteractionComponent";
import WriteTweetComponent from "./MainSection/WriteTweetComponent";
import PostAuthorIconComponent from "./MainSection/PostComponent/PostAuthorIconComponent";

import { useState } from "react";

import { useTweetsState } from "@/lib/store/tweetStore";
import { createClient } from "@/lib/supabase/client";

import type { UserData } from "@/lib/types/userdata.types";
import type { Tweet } from "@/lib/types/tweet.types";

export default function WriteTweetContainer(props: { isReply?: boolean, tweet?: Tweet, currentUser: UserData }) {
    const { isReply, tweet, currentUser } = props;
    const [postContent, setPostContent] = useState("");

    const supabase = createClient();

    function onChangePostContent(e: any) { // FIX ME
        setPostContent(e.target.value);
    }

    async function onSubmitPost() {
        const { data, error } = await supabase
            .from('tweet')
            .insert({
                post_content: postContent,
                profile_id: currentUser.id,
                is_reply: isReply ? true : false
            })
            .select();

        if (error) {
            console.error(error);
            alert("Error posting tweet! Please try again later.");
        } else {
            
            if (isReply) {
                const newTweetID: string = data[0].id;
                const replyTo = tweet as Tweet;

                const { data: replyData, error: replyErr } = await supabase
                    .from('reply')
                    .insert({
                        id: newTweetID,
                        profile_id: currentUser.id,
                        reply_to: replyTo.id
                    })
                    .select();

                if(replyErr) {
                    console.error(replyErr);
                    alert("Error creating reply. Please try again later.");
                }
            }

            setPostContent("");
        }
    }

    return (
        <div className="flex flex-row w-full border-b border-slate/25 p-2 mt-2">
            <PostAuthorIconComponent userData={currentUser} />
            <div className="flex flex-col w-full">
                <WriteTweetComponent isReply={isReply} postContent={postContent} onChangePostContent={onChangePostContent} />
                <WriteTweetInteractionComponent isReply={isReply} onSubmitPost={onSubmitPost} />
            </div>
        </div>
    )
}
