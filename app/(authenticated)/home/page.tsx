import MainComponent from "@/components/MainSection/MainComponent"
import { headers } from "next/headers";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const headersList = headers();
    const origin = headersList.get("host");

    const getCurrentUser = await fetch(`http://${origin}/api/user/`, { headers: headers() });
    const userData = await getCurrentUser.json() as UserData;
    const currentUser = userData;
    const getAllTweets = await fetch(`http://${origin}/api/tweet/`, { headers: headers() });
    const allTweets = await getAllTweets.json();

    return (
        <MainComponent currentUser={currentUser} tweets={allTweets} />
    )
}
