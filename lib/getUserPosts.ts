import { sql, eq, desc } from "drizzle-orm";

import { db } from "./db";
import * as schemas from "@/lib/db/schema";

export default async function getUserPosts(username: string, currentUserID?: string) {
    if(!currentUserID) {
        const getUserTweets = await db.select({
            id: schemas.tweet.id,
            authorInfo: {
                authorDisplayName: sql<string>`${schemas.profile.displayName}`,
                authorUserName: sql<string>`${schemas.profile.userName}`,
                authorAvatarUrl: sql<string>`${schemas.profile.avatarUrl}`,
                authorHeaderUrl: sql<string>`${schemas.profile.headerUrl}`,
            },
            textContent: schemas.tweet.postContent,
            likeCount: sql<string>`COUNT(${schemas.like.id})`,
            replyCount: sql<string>`COUNT(${schemas.reply.id})`,
            createdAt: sql<string>`${schemas.tweet.createdAt}`,
            isReply: schemas.tweet.isReply
        })
        .from(schemas.tweet)
        .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
        .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
        .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
        .where(eq(schemas.profile.userName, username))
        .orderBy(desc(schemas.tweet.createdAt))
        .groupBy(schemas.tweet.id, schemas.profile.id)
        .limit(50);

        return getUserTweets;
    } else {
        const getUserTweets = await db.select({
            id: schemas.tweet.id,
            authorInfo: {
                authorDisplayName: sql<string>`${schemas.profile.displayName}`,
                authorUserName: sql<string>`${schemas.profile.userName}`,
                authorAvatarUrl: sql<string>`${schemas.profile.avatarUrl}`,
                authorHeaderUrl: sql<string>`${schemas.profile.headerUrl}`,
            },
            textContent: schemas.tweet.postContent,
            likeCount: sql<string>`COUNT(${schemas.like.id})`,
            replyCount: sql<string>`COUNT(${schemas.reply.id})`,
            createdAt: sql<string>`${schemas.tweet.createdAt}`,
            hasLikedTweet: sql<boolean>`
                EXISTS(
                    SELECT
                        1
                    FROM
                        ${schemas.like}
                    WHERE
                        ${schemas.like.userID} = ${currentUserID}
                    AND
                        ${schemas.like.tweetID} = ${schemas.tweet.id}
                )
            `,
            isReply: schemas.tweet.isReply
        })
        .from(schemas.tweet)
        .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
        .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
        .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
        .where(eq(schemas.profile.userName, username))
        .orderBy(desc(schemas.tweet.createdAt))
        .groupBy(schemas.tweet.id, schemas.profile.id)
        .limit(50);

        return getUserTweets;
    }
}