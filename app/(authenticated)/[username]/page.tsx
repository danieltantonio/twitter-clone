import { IoArrowBackOutline } from "react-icons/io5";
import { headers } from "next/headers";
import { sql, eq, and, desc } from "drizzle-orm";

import { MdDateRange } from "react-icons/md";

import ProfileDashboardComponent from "@/components/Profile/ProfileDashboardComponent";

import { db } from "@/lib/db";
import * as schemas from "@/lib/db/schema";
import type { UserData } from "@/lib/types/userdata.types";

export default async function User({ params }: { params: { username: string } }) {
    const { username } = params;
    const getCurrentUser = await fetch("http://localhost:3000/api/user/", { headers: headers() });
    const currentUser = await getCurrentUser.json();
    const currentUserID: string = currentUser ? currentUser.id : "";

    const getUserProfileData = await fetch(`http://localhost:3000/api/user/${username}`);
    const userProfile = await getUserProfileData.json();
    const userJoinedDate = new Date(userProfile.createdAt);
    const userJoinedYear = userJoinedDate.getFullYear();
    let userJoinedMonth: number | string = userJoinedDate.getMonth();

    switch (userJoinedMonth) {
        case 0:
            userJoinedMonth = "January";
            break;
        case 1:
            userJoinedMonth = "February";
            break;
        case 2:
            userJoinedMonth = "March";
            break;
        case 3:
            userJoinedMonth = "April";
            break;
        case 4:
            userJoinedMonth = "May";
            break;
        case 5:
            userJoinedMonth = "June";
            break;
        case 6:
            userJoinedMonth = "July";
            break;
        case 7:
            userJoinedMonth = "August";
            break;
        case 8:
            userJoinedMonth = "September";
            break;
        case 9:
            userJoinedMonth = "October";
            break;
        case 10:
            userJoinedMonth = "November";
            break;
        case 11:
            userJoinedMonth = "December";
            break;
        default:
            break;
    }

    const userPosts = await db.select({
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
        hasLikedTweet: sql<boolean>`EXISTS(${db.select()
                .from(schemas.like)
                .where(and(eq(schemas.like.userID, currentUserID), eq(schemas.tweet.id, schemas.like.tweetID)))}
        )`,
        isReply: schemas.tweet.isReply
    })
        .from(schemas.tweet)
        .leftJoin(schemas.profile, eq(schemas.tweet.profileID, schemas.profile.id))
        .leftJoin(schemas.like, eq(schemas.tweet.id, schemas.like.tweetID))
        .leftJoin(schemas.reply, eq(schemas.tweet.id, schemas.reply.replyTo))
        .where(eq(schemas.profile.userName, userProfile.userName))
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
                    <span className="font-bold text-xl">{userProfile.displayName}</span>
                    <span className="text-slate/75 text-xs">{userPosts.length} Posts</span>
                </div>
            </div>

            <div className="w-full relative">
                <div className="w-full h-[200px] bg-slate"></div>
                <div className="w-[130px] h-[130px] rounded-full bg-slate absolute top-[130px] left-4 border-4 border-black"></div>
            </div>

            <div className="w-full">
                <span className="float-right border rounded-full font-semibold border-slate/75 px-4 py-2 m-2">Edit Profile</span>
            </div>

            <div className="flex flex-col ml-5 mb-5">
                <span className="text-xl font-bold">{userProfile.displayName}</span>
                <span className="text-sm text-slate/75">@{userProfile.userName}</span>
                <div className="flex flex-row my-2">
                    <MdDateRange className="text-xl mr-1 text-slate/75" />
                    <span className="font-light text-slate/75">Joined {userJoinedMonth} {userJoinedYear}</span>
                </div>
                <div className="flex flex-row">
                    <div className="mr-4">
                        <span className="font-bold text-sm mr-1">129</span>
                        <span className="text-slate/75 text-sm">Following</span>
                    </div>
                    <div>
                        <span className="font-bold text-sm mr-1">44</span>
                        <span className="text-slate/75 text-sm">Followers</span>
                    </div>
                </div>
            </div>

            <ProfileDashboardComponent tweets={userPosts} userData={userProfile}/>
        </div>
    )
}