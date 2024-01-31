import { cookies } from "next/headers";
import { sql, eq, and, desc } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import * as schemas from "@/lib/db/schema";

export async function GET(req: NextRequest, { params }: { params: { username: string }}) {
    const { username } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data, error } = await supabase.auth.getSession();

    if(error) {
        console.error("/api/tweet/[username] Error: ", error);
        return NextResponse.json({ Error: "Check console for details." }, { status: 500 });
    }

    const getUserTweets = await db.select({
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
        hasLikedTweet: data.session ? sql<boolean>`EXISTS(
            ${db.select()
                .from(schemas.like)
                .where(and(eq(schemas.like.userID, data.session.user.id), eq(schemas.tweet.id, schemas.like.tweetID)))}
        )` : sql<boolean>`false`,
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

        return NextResponse.json(getUserTweets, { status: 200 });
}