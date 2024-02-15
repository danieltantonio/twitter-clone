import { IoArrowBackOutline } from "react-icons/io5";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { sql, eq, desc } from "drizzle-orm";

import { MdDateRange } from "react-icons/md";

import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";
import * as schemas from "@/lib/db/schema";

import ProfileDashboardComponent from "@/components/Profile/ProfileDashboardComponent";
import IconHeaderComponent from "@/components/Profile/IconHeaderComponent";

import type { UserData } from "@/lib/types/userdata.types";

async function getUserData(username: string): Promise<UserData | null> {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: userProfileData, error: userProfileDataError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_name", username);

    if (userProfileDataError) {
        console.error("[getUserData() Error]: ", userProfileDataError);
        return null;
    }

    if (!userProfileData.length) {
        const noUser: UserData = {
            id: "",
            userName: "",
            displayName: "",
            createdAt: new Date(),
            avatarUrl: "",
            headerUrl: "",
            bio: ""
        };

        return noUser;
    }

    const userArray = userProfileData as any[];
    const user = userArray[0];

    const userProfile: UserData = {
        id: user.id,
        userName: user["user_name"],
        displayName: user["display_name"],
        createdAt: user["created_at"],
        avatarUrl: user["avatar_url"],
        headerUrl: user["header_url"],
        bio: user.bio
    }

    return userProfile;
}

async function getCurrentUser(userID: string): Promise<UserData | null> {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: userProfileData, error: userProfileDataError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userID);

    if (userProfileDataError) {
        console.error("[getUserData() Error]: ", userProfileDataError);
        return null;
    }

    if (!userProfileData.length) {
        const noUser: UserData = {
            id: "",
            userName: "",
            displayName: "",
            createdAt: new Date(),
            avatarUrl: "",
            headerUrl: "",
            bio: ""
        };

        return noUser;
    }

    const userArray = userProfileData as any[];
    const user = userArray[0];

    const userProfile: UserData = {
        id: user.id,
        userName: user["user_name"],
        displayName: user["display_name"],
        createdAt: user["created_at"],
        avatarUrl: user["avatar_url"],
        headerUrl: user["header_url"],
        bio: user.bio
    }

    return userProfile;
}

async function getUserPosts(username: string, userID: string) {
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
                    ${schemas.like.userID} = ${userID}
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

export default async function User({ params }: { params: { username: string } }) {
    const { username } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const userProfile = await getUserData(username);

    if (!userProfile) {
        alert("[!!! ERROR !!!]: Server error check console.");
        return null;
    }

    if (!userProfile.id) notFound();

    const { data, error: sessionErr } = await supabase.auth.getSession();

    if (sessionErr) {
        console.error("[/[username] Session Error]: ", sessionErr);
        alert("[!!! ERROR !!!]: Server error check console.");
        return null;
    }

    if (!data.session) redirect("/");

    const currentUserID = data.session.user.id;
    const currentUser = await getCurrentUser(currentUserID);

    if (!currentUser) {
        alert("[!!! ERROR !!!]: Server error check console.");
        return null;
    }

    if (!currentUser.id) redirect("/");

    const userPosts = await getUserPosts(username, currentUserID);

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

            <IconHeaderComponent currentUser={currentUser} userProfile={userProfile} />

            <div className="flex flex-col ml-5 mb-5">
                <span className="text-xl font-bold">{userProfile.displayName}</span>
                <span className="text-sm text-slate/75">@{userProfile.userName}</span>
                <div>
                    <span>{userProfile.bio}</span>
                </div>
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

            <ProfileDashboardComponent tweets={userPosts} currentUser={currentUser} />
        </div>
    )
}