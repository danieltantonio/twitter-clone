export type Tweet = {
  id: string,
  display_name: string,
  user_name: string,
  avatar_url: string,
  header_url: string,
  post_content: string,
  like_count: number,
  reply_count: number,
  created_at: string,
  is_reply: boolean,
  has_liked_tweet: boolean,
  reply_to?: string
}