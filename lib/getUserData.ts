import type { UserData } from "./types/userdata.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getUserSessionID(supabase: SupabaseClient<any, "public", any>) {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("getUserSessionID() Error: ", error);
        return null;
    }

    if (!data.session) {
        return { id: "" };
    }

    return { id: data.session.user.id };
}

export async function getUserDataByUsername(supabase: SupabaseClient<any, "public", any>, username: string) {
    const noUser: UserData = {
        id: "",
        userName: "",
        displayName: "",
        createdAt: new Date(),
        avatarUrl: "",
        headerUrl: "",
        bio: ""
    };

    const { data: userProfileData, error: userProfileDataError } = await supabase
        .from("profile")
        .select("*")
        .eq("user_name", username);

    if (userProfileDataError) {
        console.error("[getUserData() Error]: ", userProfileDataError);
        return null;
    }

    if (!userProfileData.length) return noUser;

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

export async function getUserDataByID(supabase: SupabaseClient<any, "public", any>, userID: string | null): Promise<UserData | null> {
    const noUser: UserData = {
        id: "",
        userName: "",
        displayName: "",
        createdAt: new Date(),
        avatarUrl: "",
        headerUrl: "",
        bio: ""
    };

    if (!userID) return noUser;

    const { data: userProfileData, error: userProfileDataError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userID);

    if (userProfileDataError) {
        console.error("[getUserData() Error]: ", userProfileDataError);
        return null;
    }

    if (!userProfileData.length) return noUser;

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