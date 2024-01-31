import MainComponent from "@/components/MainSection/MainComponent"
import { headers } from "next/headers";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const getCurrentUser = await fetch("http://localhost:3000/api/user/", { headers: headers() });
    const userData = await getCurrentUser.json() as UserData;
    const currentUser = userData;
    const getAllTweets = await fetch("http://localhost:3000/api/tweet/", { headers: headers() });
    const allTweets = await getAllTweets.json();

    return (
        <MainComponent userData={currentUser} tweets={allTweets} />
    )
}
