"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerActionClient({ cookies });

export async function PostTweet(formData: FormData, profile_id: string) {
    const tweetContent = formData.get("tweet");
    const post_content = tweetContent?.toString();

    const { data, error } = await supabase.from("tweet")
        .insert([{ 
            post_content,
            profile_id
        }])
        .select();

    if(error) console.log(error);

    return data;
}

