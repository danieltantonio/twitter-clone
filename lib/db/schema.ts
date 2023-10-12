import { pgTable, uuid, varchar, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const profile = pgTable("profile", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
    userName: varchar("user_name").notNull().unique(),
    displayName: varchar("display_name").default(`user${Math.random().toString(16).substring(2, 10)}`),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").notNull()
});

export const tweet = pgTable("tweet", {
    id: uuid("id").primaryKey().notNull().unique().defaultRandom(),
    postContent: text("post_content").notNull(),
    profileID: uuid("profile_id").notNull().references(() => profile.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    isReply: boolean("is_reply").notNull().default(false),
    replyID: uuid("reply_id").references(() => tweet.id)
});

export const like = pgTable("like", {
    id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
    userID: uuid("user_id").notNull().references(() => profile.id),
    tweetID: uuid("tweet_id").notNull().references(() => tweet.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reply = pgTable("reply", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    replyContent: text("reply_content").notNull(),
    profileID: uuid("profile_id").notNull().references(() => profile.id),
    tweetID: uuid("tweet_id").notNull().references(() => tweet.id)
});

export const bookmark = pgTable("bookmark", {
    id: uuid("id").primaryKey().unique().notNull().defaultRandom(),
    userID: uuid("user_id").notNull().references(() => profile.id),
    tweetID: uuid("tweet_id").notNull().references(() => tweet.id),
    createdAt: timestamp("created_at").defaultNow().notNull()
});

export const hashtag = pgTable("hashtag", {
    id: uuid("id").notNull().unique().primaryKey().defaultRandom(),
    name: text("name").notNull()
});

export const tweetHashtag = pgTable("tweet_hashtag", {
    tweetID: uuid("tweet_id").notNull().references(() => tweet.id).primaryKey(),
    hashtagID: uuid("hashtag_id").notNull().references(() => hashtag.id).primaryKey()
});

export const profileRelations = relations(profile, ({ many }) => ({
    tweet: many(tweet),
    like: many(like),
    reply: many(reply),
    bookmark: many(bookmark)
}));

export const tweetRelations = relations(tweet, ({ one }) => ({
    profile: one(profile, {
      fields: [tweet.profileID],
      references: [profile.id]  
    })
}));

export const likeRelations = relations(like, ({ one }) => ({
    profile: one(profile, {
        fields: [like.userID],
        references: [profile.id]
    }),
    tweet: one(tweet, {
        fields: [like.tweetID],
        references: [tweet.id]
    })
}));

export const replyRelations = relations(reply, ({ one }) => ({
    profile: one(profile, {
        fields: [reply.profileID],
        references: [profile.id]
    }),
}));

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
    profile: one(profile, {
        fields: [bookmark.userID],
        references: [profile.id]
    }),
    tweet: one(tweet, {
        fields: [bookmark.tweetID],
        references: [tweet.id]
    })
}));