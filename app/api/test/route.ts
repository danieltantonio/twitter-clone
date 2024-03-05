import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import * as schemas from "@/lib/db/schema";
import { sql, eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
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
        replies: eq(schemas.tweet.id, schemas.reply.id)
    })
    .from(schemas.tweet)
    .where(eq(schemas.tweet.id, "a0898266-7d29-4b83-ac2f-28ee2f1af62f"))
    .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
    .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
    .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
    .orderBy(desc(schemas.tweet.createdAt))
    .groupBy(schemas.tweet.id, schemas.profile.id, schemas.reply.id);

    return NextResponse.json({ data: getUserTweets, error: null });
}