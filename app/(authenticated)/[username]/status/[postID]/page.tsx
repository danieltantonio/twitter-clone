import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import PostAuthorIconComponent from "@/components/MainSection/PostComponent/PostAuthorIconComponent";
import PostComponent from "@/components/MainSection/PostComponent/PostComponent";
import UserPostInteractionComponent from "@/components/Profile/UserPostInteractionComponent";
import PostHeaderComponent from "@/components/Profile/PostHeaderComponent";
import WriteTweetContainer from "@/components/WriteTweetContainer";

import { createClient } from "@/lib/supabase/server";

import { BsThreeDots, BsDot } from "react-icons/bs";

import { getTweetData, getTweetReplies } from "@/lib/getTweetData";
import { getUserDataByID, getUserDataByUsername, getUserSessionID } from "@/lib/getUserData";

import type { UserData } from "@/lib/types/userdata.types";
import type { Tweet } from "@/lib/types/tweet.types";

export default async function UserPost({ params }: { params: { username: string, postID: string } }) {
    const { username, postID } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const replies: Tweet[] = [];
    const thread: Tweet[] = [];

    const getUserSession = await getUserSessionID(supabase);

    if (getUserSession.error) {
        if (getUserSession.error.status === 500) {
            console.error(`UserPost User Session Status Error ${getUserSession.error.status}: ${getUserSession.error.message}`);
            return null;
        } else {
            redirect("/");
        }
    }

    const getCurrentUser = await getUserDataByID(supabase, getUserSession.id);

    if (getCurrentUser.error) {
        if (getCurrentUser.error.status === 500) {
            console.error(`UserPost Status Error 500: ${getCurrentUser.error.message}`);
            return null;
        }
    }

    const currentUser = getCurrentUser.userData as UserData;

    const getOriginalPosterData = await getUserDataByUsername(supabase, username, currentUser);

    if (getOriginalPosterData.error) {
        const errorStatus = getOriginalPosterData.error.status;
        if (errorStatus === 500) {
            console.error(`UserPost Status Error 500: ${getOriginalPosterData.error.message}`);
            return null;
        } else if (errorStatus === 404) {
            notFound();
        }
    }

    const tweetData = await getTweetData(supabase, postID);

    if (tweetData.error) {
        console.error(`UserPost Component ${tweetData.error.status} Error: ${tweetData.error.message}`);
        return null;
    }


    const tweet = tweetData.data as Tweet;
    const dateCreated = new Date(tweet.created_at);

    const tweetReplies = await getTweetReplies(supabase, postID);

    if (tweetReplies.error) {
        console.error(`UserPost Componenet ${tweetReplies.error.status} Error: ${tweetReplies.error.message}`);
        return null;
    }

    if (tweetReplies.data) {
        for (let reply of tweetReplies.data) {
            const replyTweet = reply as Tweet;
            replies.push(replyTweet);
        }
    }

    const getHourCreated = dateCreated.getUTCHours() - 12;
    let hourCreated: number = getHourCreated;
    let morningOrNight: "AM" | "PM" = "PM";

    if (getHourCreated < 0) hourCreated = getHourCreated + 12;
    if (getHourCreated < 12) morningOrNight = "AM";

    if (tweet.is_reply) {
        let post: Tweet = tweet;

        while (post.is_reply) {
            const { data, error } = await supabase
                .from("reply")
                .select("*")
                .eq("id", post.id);

            if (error) {
                console.error(error);
                return null;
            }

            const replyToID: string = data[0].reply_to;

            const replyTo = await getTweetData(supabase, replyToID);

            if (replyTo.error) {
                console.error(`UserPost Component ${replyTo.error.status} Error: ${replyTo.error.message}`);
                return null;
            }

            post = replyTo.data as Tweet;
            thread.unshift(post);
        }
    }

    async function handlePostReplyServerAction() {
        "use server";
        revalidatePath("/");
    }

    async function handleDeleteTweet() {
        "use server";
        revalidatePath("/");
    }

    return (
        <div className="flex flex-col">
            <PostHeaderComponent />
            <div className="flex flex-col mt-4">
                {
                    thread.length ? (
                        thread.map((tweet) => {
                            return (
                                <PostComponent key={tweet.id} tweet={tweet} currentUser={currentUser} isThread={true} />
                            )
                        })
                    )
                        :
                        null
                }
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row ml-2">
                        <PostAuthorIconComponent tweet={tweet} />
                        <div className="flex flex-col">
                            <span className="font-bold h-[20px]">{tweet.display_name}</span>
                            <span className="text-slate/75 text-sm">@{tweet.user_name}</span>
                        </div>
                    </div>
                    <div className="px-4 text-slate/75"><BsThreeDots /></div>
                </div>
                <div className="mx-4">
                    <div className="mt-4">
                        <span className="text-lg">
                            {tweet.post_content}
                        </span>
                    </div>
                    <div className="text-slate/75 text-md flex flex-row mb-2">
                        <span>
                            {hourCreated}:{dateCreated.getUTCMinutes()} {morningOrNight}
                        </span>
                        <BsDot className="h-[25px] text-sm" />
                        <span>
                            {months[Number(dateCreated.getUTCMonth())]} {dateCreated.getUTCDate()}, {dateCreated.getUTCFullYear()}
                        </span>
                        <BsDot className="h-[25px] text-sm" />
                        <span className="text-white font-bold">17</span>
                        <span>Views</span>
                    </div>
                    <UserPostInteractionComponent tweet={tweet} replies={replies} currentUser={currentUser} postID={postID} />
                </div>
                <form action={handlePostReplyServerAction}>
                    <WriteTweetContainer isReply={true} tweet={tweet} currentUser={currentUser} />
                </form>

                <form action={handleDeleteTweet}>
                    {
                        replies.length ? (
                            replies.map((tweet) => {
                                return (
                                    <PostComponent key={tweet.id} tweet={tweet} currentUser={currentUser} />
                                )
                            })
                        )
                            :
                            null
                    }
                </form>
            </div>
        </div>
    )
}
