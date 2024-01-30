import MainComponent from "@/components/MainSection/MainComponent"
import { headers } from "next/headers";
import getLatestTweets from "@/lib/getLatestTweets";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const getCurrentUser = await fetch("http://localhost:3000/api/user/", { headers: headers() });
    const userData = await getCurrentUser.json();
    const currentUser = userData;
    const getAllTweets = await getLatestTweets(currentUser);

    return (
        <MainComponent userData={currentUser} tweets={getAllTweets} />
    )
}
