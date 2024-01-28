import MainComponent from "@/components/MainSection/MainComponent"
import { cookies } from "next/headers";
import getUserData from "@/lib/getUserData";
import getLatestTweets from "@/lib/getLatestTweets";

import type { UserData } from "@/lib/types/userdata.types";

export default async function Home() {
    const cookieStore = cookies();
    const userData = await getUserData(cookieStore);
    const currentUser = userData as UserData;
    const getAllTweets = await getLatestTweets(currentUser);

    return (
        <MainComponent userData={currentUser} tweets={getAllTweets} />
    )
}
