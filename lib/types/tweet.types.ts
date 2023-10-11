export type Profile = {
  authorID: string,
  authorDisplayName: string,
  authorUserName: string
}

export type Tweet = {
  tweetID: string,
  authorInfo: Profile,
  textContent: string,
  likeCount: string,
  isReply: boolean,
  replyID: string | null,
  createdAt: string,
  hasLikedTweet: boolean
}