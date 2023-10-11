import PostComponent from "./PostComponent";

import type { Tweet } from "@/lib/types/tweet.types"
import type { UserData } from "@/lib/types/userdata.types"

export default async function TweetsDisplayDashboard(props: { tweets: Tweet[], userData: UserData }) {
    const { tweets, userData } = props;

    return (
        <>
            {
                tweets.length && tweets.map((tweet, i) => {
                    return (
                        <PostComponent key={tweet.tweetID} tweet={tweet} userData={userData} />
                    )
                })
            }
        </>
    )
}
