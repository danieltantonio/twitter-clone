import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PostAuthorIconComponent from "@/components/MainSection/PostComponent/PostAuthorIconComponent";
import PostComponent from "@/components/MainSection/PostComponent";
import WriteTweetComponent from "@/components/MainSection/WriteTweetComponent";
import UserPostInteractionComponent from "@/components/Profile/UserPostInteractionComponent";
import PostHeaderComponent from "@/components/Profile/PostHeaderComponent";

import { createClient } from "@/lib/supabase/server";

import { BsThreeDots, BsDot } from "react-icons/bs";

import { getTweetData, getTweetReplyIDs } from "@/lib/getTweetData";
import { getUserDataByID, getUserDataByUsername } from "@/lib/getUserData";
import { PostReply } from "@/lib/ServerActions/TweetActions";

import type { Tweet } from "@/lib/types/tweet.types";

export default async function UserPost({ params }: { params: { username: string, postID: string } }) {
    const { username, postID } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const replies: Tweet[] = [];
    const thread: Tweet[] = [];

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("/[username]/status/[postID] Session Error: ", error);
        return null;
    }

    if (!data.session) redirect("/");

    const tweetReplies = await getTweetReplyIDs(postID);
    const originalPosterData = await getUserDataByUsername(supabase, username);
    const currentUser = await getUserDataByID(supabase, data.session.user.id);

    if (!currentUser) {
        console.error("/[username]/status/[postID] getUserDataByID() Error: Server error retrieving user data.");
        return null;
    }

    if (!currentUser.id) redirect("/");

    const tweetData: Tweet[] = await getTweetData(postID, currentUser.id);
    const tweet: Tweet = tweetData[0];
    const dateCreated = new Date(tweet.createdAt);

    if (!originalPosterData) {
        console.error("/[username]/status/[postID] getUserDataByUsername() Error: Server error getting Original Poster data.");
        return null;
    }

    if (!originalPosterData.id) {
        console.error("/[username]/status/[postID] getUserDataByUsername() Error: Cannot find user");
        return null;
    }

    for (let tweetID of tweetReplies) {
        if (tweetID.id) {
            const reply = await getTweetData(tweetID.id, currentUser.id);

            for (let i = 0; i < reply.length; i++) {
                replies.push(reply[i]);
            }
        }
    }

    const getHourCreated = dateCreated.getUTCHours() - 12;
    let hourCreated: number = getHourCreated;
    let morningOrNight: string = "PM";

    if (getHourCreated < 0) hourCreated = getHourCreated + 12;
    if (getHourCreated < 12) morningOrNight = "AM";

    if (tweet.isReply) {
        let post: Tweet = tweet;

        while (post.isReply) {
            const { data, error } = await supabase
                .from("reply")
                .select("reply_to")
                .eq("id", post.id);

            if (error) {
                console.error(error);
                return null;
            }

            const replyToID: string = data[0].reply_to;

            const replyTo: Tweet[] = await getTweetData(replyToID, currentUser.id);

            post = replyTo[0];
            thread.unshift(post);
        }
    }
    
    const prevTweet: Tweet = thread[thread.length - 1];

    async function handlePostReplyServerAction(formData: FormData) {
        "use server";
        if (currentUser) await PostReply(formData, postID, currentUser.id);
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
                            <span className="font-bold h-[20px]">{tweet.authorInfo.authorDisplayName}</span>
                            <span className="text-slate/75 text-sm">@{tweet.authorInfo.authorUserName}</span>
                        </div>
                    </div>
                    <div className="px-4 text-slate/75"><BsThreeDots /></div>
                </div>
                <div className="mx-4">
                    <div className="mt-4">
                        <span className="text-lg">
                            {tweet.textContent}
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
                <div className="border-b-[1px] border-slate/25 py-6">
                    <form action={handlePostReplyServerAction}>
                        <div className="flex flex-row mx-2">
                            <div>
                                <PostAuthorIconComponent userData={currentUser} />
                            </div>
                            <div className="flex flex-row w-full">
                                <div className="w-[85%]">
                                    <WriteTweetComponent isReply={true} />
                                </div>
                                <div className="h-full relative mx-2">
                                    <div className="absolute bottom-0">
                                        <button className="text-white px-4 py-2 bg-primary font-bold rounded-full text-sm">Reply</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
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
            </div>
        </div>
    )
}
