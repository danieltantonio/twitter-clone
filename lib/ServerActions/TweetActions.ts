"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

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

    if(error) console.error(error);

    return data;
}

