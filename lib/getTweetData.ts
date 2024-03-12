import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tweet } from "./types/tweet.types";

export async function getTweetData(supabase: SupabaseClient<any, "public", any>, tweetID: string): Promise<{ error: { status: 500 | 401, message: string } | null, data: Tweet | null }> {
    const { data: getUserTweets, error: getUserTweetsErr } = await supabase
        .from("secured_tweets")
        .select("*")
        .eq("id", tweetID);

    if (getUserTweetsErr) {
        console.error("getTweetData() Error: ", getUserTweetsErr);
        return { error: { status: 500, message: "Server error getting user tweet. Check logs for details." }, data: null };
    }

    const tweet: Tweet = getUserTweets[0];

    return { error: null, data: tweet };
}

export async function getTweetReplies(supabase: SupabaseClient<any, "public", any>, tweetID: string): Promise<{ error: { status: number, message: string } | null, data: Tweet[] | null }> {
    const { data: tweetReplies, error } = await supabase
        .from("secured_tweets")
        .select("*")
        .eq("reply_to", tweetID);

    if(error) {
        console.error("getTweetReplies() 500 Error: ", error);
        return { error: { status: 500, message: "Error retrieving replies of tweet. Check logs for details." }, data: null };
    } else {
        return { error: null, data: tweetReplies };
    }
}