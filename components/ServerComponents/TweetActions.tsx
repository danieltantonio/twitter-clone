"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const supabase = createServerActionClient({ cookies });

export async function PostTweet(formData: FormData) {
    const tweetContent = formData.get("tweet");
    const post_content = tweetContent?.toString();

    const { data, error } = await supabase.auth.getUser();
    const profile_id = data?.user.id;
    
    if(error) return;

    await supabase.from("tweet")
    .insert([{ 
        post_content,
        profile_id
    }]);

    revalidatePath("/home");
}

