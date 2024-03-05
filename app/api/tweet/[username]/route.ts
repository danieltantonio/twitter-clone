import { cookies } from "next/headers";
import { sql, eq, and, desc, exists } from "drizzle-orm";
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

    if(!data.session) {
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
    } else {
        const sessionID: string = data.session.user.id;
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
                        ${schemas.like.userID} = ${sessionID}
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

        return NextResponse.json(getUserTweets, { status: 200 });
    }

}