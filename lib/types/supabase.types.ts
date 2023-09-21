export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bookmark: {
        Row: {
          created_at: string
          id: string
          tweet_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tweet_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tweet_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmark_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookmark_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      hashtag: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      like: {
        Row: {
          created_at: string
          id: string
          tweet_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tweet_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tweet_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "like_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "like_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string | null
          user_name: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          updated_at?: string | null
          user_name?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string | null
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reply: {
        Row: {
          id: string
          profile_id: string
          reply_content: string
          reply_id: string
          tweet_id: string
        }
        Insert: {
          id?: string
          profile_id: string
          reply_content: string
          reply_id: string
          tweet_id: string
        }
        Update: {
          id?: string
          profile_id?: string
          reply_content?: string
          reply_id?: string
          tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reply_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_reply_id_fkey"
            columns: ["reply_id"]
            referencedRelation: "reply"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reply_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          }
        ]
      }
      tweet: {
        Row: {
          created_at: string
          id: string
          post_content: string
          profile_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_content: string
          profile_id: string
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          post_content?: string
          profile_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tweet_profile_id_fkey"
            columns: ["profile_id"]
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      tweet_hashtag: {
        Row: {
          hashtag_id: string
          tweet_id: string
        }
        Insert: {
          hashtag_id: string
          tweet_id: string
        }
        Update: {
          hashtag_id?: string
          tweet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tweet_hashtag_hashtag_id_fkey"
            columns: ["hashtag_id"]
            referencedRelation: "hashtag"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tweet_hashtag_tweet_id_fkey"
            columns: ["tweet_id"]
            referencedRelation: "tweet"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
