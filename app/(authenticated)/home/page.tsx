import MainComponent from "@/components/MainSection/MainComponent"
import { cookies } from "next/headers";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const origin = process.env.NEXT_URL || "http://localhost:3000/";
    const cookieName = process.env.SUPABASE_COOKIE_NAME as string;
    const cookieVal = cookies().get(cookieName)?.value;
     

    const getCurrentUser = await fetch(`${origin}/api/user/`, { 
        headers: {
            Cookie: `${cookieName}=${cookieVal}`
        }
    });
    const userData = await getCurrentUser.json() as UserData;
    const currentUser = userData;
    const getAllTweets = await fetch(`${origin}/api/tweet/`, { 
        headers: {
            Cookie: `${cookieName}=${cookieVal}`
        } 
    });
    const allTweets = await getAllTweets.json();

    return (
        <MainComponent currentUser={currentUser} tweets={allTweets} />
    )
}
