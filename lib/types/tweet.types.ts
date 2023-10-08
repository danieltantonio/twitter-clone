export type Profile = {
  user_name: string,
  display_name: string
}

export type Tweet = {
  id: string,
  post_content: string,
  profile_id: string,
  created_at: string,
  updated_at: string | null,
  profile: Profile
}