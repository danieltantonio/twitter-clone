import { create } from "zustand";

type TweetReplyModalState = {
    tweetModal: boolean,
    replyModal: boolean,
    setTweetModal: (tweetModalState: boolean) => void,
    setReplyModal: (replyModalState: boolean) => void
}

export const useTweetReplyModalState = create<TweetReplyModalState>()((set) => {
    return (
        {
            tweetModal: false,
            replyModal: false,
            setTweetModal: (tweetModal) => set((state) => ({ ...state, tweetModal})),
            setReplyModal: (replyModal) => set((state) => ({ ...state, replyModal }))
        }
    )
});