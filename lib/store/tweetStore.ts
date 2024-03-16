import { create } from "zustand";
import type { Tweet } from "../types/tweet.types";

type TweetsState = {
    tweets: Tweet[],
    setTweets: (tweetsState: Tweet[]) => void
}

const initTweets: Tweet[] = [];

export const useTweetsState = create<TweetsState>()((set) => {
    return (
        {
            tweets: initTweets,
            setTweets: (tweets) => set((state) => ({ ...state, tweets }))
        }
    )
})