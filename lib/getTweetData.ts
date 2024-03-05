import { eq, sql, desc, and } from "drizzle-orm";
import { db } from "./db";
import * as schemas from "./db/schema";

export async function getTweetData(tweetID: string, currentUserID?: string) {
    const getUserTweets = await db.select({
        id: schemas.tweet.id,
        authorInfo: {
            authorDisplayName: sql<string>`${schemas.profile.displayName}`,
            authorUserName: sql<string>`${schemas.profile.userName}`,
            authorAvatarUrl: sql<string>`${schemas.profile.avatarUrl}`,
            authorHeaderUrl: sql<string>`${schemas.profile.headerUrl}`,
        },
        textContent: schemas.tweet.postContent,
        likeCount: sql<string>`COUNT(DISTINCT(${schemas.like.id}))`,
        replyCount: sql<string>`COUNT(DISTINCT(${schemas.reply.id}))`,
        createdAt: sql<string>`${schemas.tweet.createdAt}`,
        isReply: sql<boolean>`${schemas.tweet.isReply}`,
        hasLikedTweet: currentUserID ? sql<boolean>`EXISTS(
            ${db.select()
                .from(schemas.like)
                .where(and(eq(schemas.like.userID, currentUserID), eq(schemas.tweet.id, schemas.like.tweetID)))}
        )` : sql<boolean>`false`,
    })
    .from(schemas.tweet)
    .where(eq(schemas.tweet.id, tweetID))
    .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
    .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
    .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
    .orderBy(desc(schemas.tweet.createdAt))
    .groupBy(schemas.tweet.id, schemas.profile.id);

    return getUserTweets;
}

export async function getTweetReplyIDs(tweetID: string) {
    const getTweetReplies = await db.select({
        id: schemas.tweet.id
    })
    .from(schemas.reply)
    .leftJoin(schemas.tweet, eq(schemas.tweet.id, schemas.reply.id))
    .where(eq(schemas.reply.replyTo, tweetID));

    return getTweetReplies;
}