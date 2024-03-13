"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import type { Tweet } from "../types/tweet.types";

export async function PostTweet(formData: FormData, profile_id: string) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const tweetContent = formData.get("tweet");
    const post_content = tweetContent?.toString();

    const { data, error } = await supabase.from("tweet")
        .insert([{
            post_content,
            profile_id
        }])
        .select();

    if (error) console.error(error);
}

export async function PostReply(formData: FormData, reply_to: string, profile_id: string) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const tweetContent = formData.get("tweet");
    const post_content = tweetContent?.toString();
    const is_reply = true;

    const { data: tweetData, error: tweetErr } = await supabase.from("tweet")
        .insert({
            post_content,
            profile_id,
            is_reply
        })
        .select();

    if (tweetErr) console.error(tweetErr);

    if (tweetData) {
        const { data: replyData, error: replyErr } = await supabase.from("reply")
            .insert({
                id: tweetData[0].id,
                profile_id,
                reply_to
            })
            .select();

        if (replyErr) console.error(replyErr);
    }
}