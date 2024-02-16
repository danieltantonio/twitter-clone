export type Profile = {
  authorDisplayName: string,
  authorUserName: string,
  authorAvatarUrl: string,
  authorHeaderUrl: string
}

export type Tweet = {
  id: string,
  authorInfo: Profile,
  textContent: string,
  likeCount: string,
  replyCount: string,
  isReply: boolean,
  createdAt: string,
  hasLikedTweet?: boolean
}