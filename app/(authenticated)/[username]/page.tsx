import { IoArrowBackOutline } from "react-icons/io5";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { MdDateRange } from "react-icons/md";

import ProfileDashboardComponent from "@/components/Profile/ProfileDashboardComponent";
import IconHeaderComponent from "@/components/Profile/IconHeaderComponent";

import type { UserData } from "@/lib/types/userdata.types";

export default async function User({ params }: { params: { username: string } }) {
    const { username } = params;

    const getUserProfileData = await fetch(`http://localhost:3000/api/user/${username}`);

    if(!getUserProfileData.ok) notFound();

    const userProfile = await getUserProfileData.json();

    const userJoinedDate = new Date(userProfile.createdAt);
    const userJoinedYear = userJoinedDate.getFullYear();
    let userJoinedMonth: number | string = userJoinedDate.getMonth();

    const getUserPosts = await fetch(`http://localhost:3000/api/tweet/${username}`, { headers: headers() });
    const userPosts = await getUserPosts.json();

    const getCurrentUser = await fetch("http://localhost:3000/api/user", { headers: headers() });
    const currentUser = await getCurrentUser.json() as UserData;
    
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