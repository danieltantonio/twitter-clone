import { IoArrowBackOutline } from "react-icons/io5";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { MdDateRange } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

import { createClient } from "@/lib/supabase/server";
import { getUserDataByID, getUserSessionID, getUserDataByUsername } from "@/lib/getUserData";

import ProfileDashboardComponent from "@/components/Profile/ProfileDashboardComponent";
import IconHeaderComponent from "@/components/Profile/IconHeaderComponent";

import ProfileHeaderComponent from "@/components/Profile/ProfileHeaderComponent";
import type { UserData } from "@/lib/types/userdata.types";

export default async function User({ params }: { params: { username: string } }) {
    const { username } = params;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const userSession = await getUserSessionID(supabase);

    if (userSession.error) {
        console.error(`Session Status Error ${userSession.error.status}: ${userSession.error.message}`);
        return null;
    }

    const getCurrentUser = await getUserDataByID(supabase, userSession.id);

    if (getCurrentUser.error) {
        console.error(`Get User Data Status Error ${getCurrentUser.error.status}: ${getCurrentUser.error.message}`)
        return null;
    }

    const currentUser = getCurrentUser.userData as UserData;

    const getUserProfile = await getUserDataByUsername(supabase, username, currentUser);
    let isAuthorized: boolean = true;

    if (getUserProfile.error) {
        if (getUserProfile.error.status === 500) {
            console.error(`Get User Profile Status Error ${getUserProfile.error.status}: ${getUserProfile.error.message}`);
            return null;
        } else if (getUserProfile.error.status === 404) {
            notFound();
        } else if (getUserProfile.error.status === 401) {
            isAuthorized = false;
        }
    }

    const userProfile = getUserProfile.userData as UserData;

    const userJoinedDate = new Date(userProfile.createdAt);
    const userJoinedYear = userJoinedDate.getFullYear();
    let userJoinedMonth: number | string = userJoinedDate.getMonth();

    const { data: userPosts, error: tweetsErr } = await supabase.from("tweet").select("id").eq("profile_id", userProfile.id);

    if (tweetsErr) {
        console.error("[DB Server Error]: ", tweetsErr);
        return null;
    }

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
            <ProfileHeaderComponent userProfile={userProfile} userPosts={userPosts} />
            <IconHeaderComponent currentUser={currentUser} userProfile={userProfile} />

            <div className="flex flex-col ml-5 mb-5 mt-2">
                <div className="flex flex-row">
                    <span className="text-xl font-bold">{userProfile.displayName}</span>
                    {
                        userProfile.isPrivate && (
                            <IoMdLock className="text-white" />
                        )
                    }
                </div>
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

            <ProfileDashboardComponent currentUser={currentUser} username={username} authorized={isAuthorized} />
        </div>
    )
}