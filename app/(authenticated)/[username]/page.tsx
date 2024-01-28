import { IoArrowBackOutline } from "react-icons/io5";
import { sql, exists, eq, and, desc } from "drizzle-orm";
import { cookies } from "next/headers";

import getUserData from "@/lib/getUserData";
import { db } from "@/lib/db";
import * as schemas from "@/lib/db/schema";

import type { UserData } from "@/lib/types/userdata.types";

export default async function User({params} : { params: { username: string }}) {
    const { username } = params;
    const cookieStore = cookies();
    const currentUser = await getUserData(cookieStore);
    const currentUserID: string = currentUser ? currentUser.id : "";

    const userPosts = await db.select({
        id: schemas.tweet.id,
        authorInfo: {
            authorID: schemas.tweet.profileID,
            authorDisplayName: schemas.profile.displayName,
            authorUserName: schemas.profile.userName,
        },
        textContent: schemas.tweet.postContent,
        likeCount: sql`COUNT(${schemas.like.id})`,
        replyCount: sql`COUNT(${schemas.reply.id})`,
        createdAt: schemas.tweet.createdAt,
        hasLikedTweet: exists(
            db.select()
                .from(schemas.like)
                .where(and(eq(schemas.like.userID, currentUserID), eq(schemas.tweet.id, schemas.like.tweetID)))
        )
    })
        .from(schemas.tweet)
        .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
        .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
        .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
        .where(eq(schemas.profile.userName, username))
        .orderBy(desc(schemas.tweet.createdAt))
        .groupBy(schemas.tweet.id, schemas.profile.id)
        .limit(50);

    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div className="hover:bg-slate/20 p-2 mt-2 mr-4 ml-2 rounded-full">
                    <IoArrowBackOutline className="text-2xl" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-xl">{username}</span>
                    <span className="text-slate/75 text-xs">{userPosts.length} Posts</span>
                </div>
            </div>

            <div className="w-full relative">
                <div className="w-full h-[200px] bg-slate"></div>
                <div className="w-[130px] h-[130px] rounded-full bg-slate absolute top-[130px] left-4 border-4 border-black"></div>
            </div>

        </div>
    )
}