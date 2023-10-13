export type Profile = {
  authorID: string,
  authorDisplayName: string,
  authorUserName: string
}

export type Tweet = {
  id: string,
  authorInfo: Profile,
  textContent: string,
  likeCount: string,
  replyCount: string,
  isReply: boolean,
  createdAt: string,
  hasLikedTweet: boolean
}