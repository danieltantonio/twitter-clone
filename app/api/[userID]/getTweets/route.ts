import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import * as schemas from "@/lib/db/schema";
import { sql, exists, eq, and, desc } from "drizzle-orm";

export async function GET(req: NextRequest, { params }: { params: { userID: string }}) {
    const currentUser = params.userID;

    const allUsers = await db.select({
        tweetID: schemas.tweet.id,
        authorInfo: {
            authorID: schemas.tweet.profileID,
            authorDisplayName: schemas.profile.displayName,
            authorUserName: schemas.profile.userName,
        },
        textContent: schemas.tweet.postContent,
        likeCount: sql`COUNT(${schemas.like.id})`,
        isReply: schemas.tweet.isReply,
        replyID: schemas.tweet.replyID,
        createdAt: schemas.tweet.createdAt,
        hasLikedTweet: exists(
            db.select()
            .from(schemas.like)
            .where(and(eq(schemas.like.userID, currentUser), eq(schemas.tweet.id, schemas.like.tweetID)))
        )
    })
    .from(schemas.tweet)
    .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
    .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
    .orderBy(desc(schemas.tweet.createdAt))
    .groupBy(schemas.tweet.id, schemas.profile.id)
    .limit(50);
    
    return NextResponse.json(allUsers);
}