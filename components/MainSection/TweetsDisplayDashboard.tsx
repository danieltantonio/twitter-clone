import PostComponent from "./PostComponent";
import TweetReplyModal from "./TweetReplyModal";

import type { Tweet } from "@/lib/types/tweet.types"
import type { UserData } from "@/lib/types/userdata.types"

export default function TweetsDisplayDashboard(props: { tweets: Tweet[], currentUser: UserData }) {
    const { tweets, currentUser } = props;

    return (
        <>
            <TweetReplyModal currentUser={currentUser} />
            {
                tweets.length && tweets.map((tweet) => {
                    return (
                        <PostComponent key={tweet.id} tweet={tweet} currentUser={currentUser} />
                    )
                })
            }
        </>
    )
}
