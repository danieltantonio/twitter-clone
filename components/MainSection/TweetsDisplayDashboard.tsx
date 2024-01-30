import PostComponent from "./PostComponent";

import type { Tweet } from "@/lib/types/tweet.types"
import type { UserData } from "@/lib/types/userdata.types"

export default function TweetsDisplayDashboard(props: { tweets: Tweet[], userData: UserData }) {
    const { tweets, userData } = props;

    return (
        <>
            {
                tweets.length && tweets.map((tweet) => {
                    return (
                        <PostComponent key={tweet.id} tweet={tweet} userData={userData} />
                    )
                })
            }
        </>
    )
}
