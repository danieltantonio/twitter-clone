import { sql, eq, and, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import * as schemas from "@/lib/db/schema";

import type { UserData } from "@/lib/types/userdata.types";

export default async function getLatestTweets(currentUser: UserData) {
    const getAllTweets = await db.select({
        id: schemas.tweet.id,
        authorInfo: {
            authorID: sql<string>`${schemas.tweet.profileID}`,
            authorDisplayName: sql<string>`${schemas.profile.displayName}`,
            authorUserName: sql<string>`${schemas.profile.userName}`,
        },
        textContent: schemas.tweet.postContent,
        likeCount: sql<string>`COUNT(${schemas.like.id})`,
        replyCount: sql<string>`COUNT(${schemas.reply.id})`,
        createdAt: sql<string>`${schemas.tweet.createdAt}`,
        hasLikedTweet: sql<boolean>`EXISTS(
            ${db.select()
                .from(schemas.like)
                .where(and(eq(schemas.like.userID, currentUser.id), eq(schemas.tweet.id, schemas.like.tweetID)))}
        )`,
        isReply: schemas.tweet.isReply
    })
        .from(schemas.tweet)
        .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
        .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
        .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
        .where(eq(schemas.tweet.isReply, false))
        .orderBy(desc(schemas.tweet.createdAt))
        .groupBy(schemas.tweet.id, schemas.profile.id)
        .limit(50);

    return getAllTweets;
}