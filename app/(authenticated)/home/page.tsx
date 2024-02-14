import MainComponent from "@/components/MainSection/MainComponent"
import { headers } from "next/headers";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const origin = process.env.NEXT_URL || "http://localhost:3000/";
    const getCurrentUser = await fetch(`${origin}/api/user/`, { headers: headers() });
    const userData = await getCurrentUser.json() as UserData;
    const currentUser = userData;
    const getAllTweets = await fetch(`${origin}/api/tweet/`, { headers: headers() });
    const allTweets = await getAllTweets.json();

    return (
        <MainComponent currentUser={currentUser} tweets={allTweets} />
    )
}
