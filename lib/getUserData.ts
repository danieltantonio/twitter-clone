import type { UserData } from "./types/userdata.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getUserSessionID(supabase: SupabaseClient<any, "public", any>): Promise<{ error: { status: 500 | 403, message: string } | null, id: string | null }> {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("getUserSessionID() Error: ", error);
        return { error: { status: 500, message: "Server error retrieving session. Check logs for details." }, id: null };
    }

    if (!data.session) {
        return { error: { status: 403, message: "Forbidden access, please sign in." }, id: null };
    }

    return { error: null, id: data.session.user.id };
}

export async function getUserDataByUsername(supabase: SupabaseClient<any, "public", any>, username: string, currentUser: UserData): Promise<{ error: { status: 500 | 404 | 401, message: string } | null, userData: UserData | null}> {
    
    const { data: userProfileData, error: userProfileDataError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_name", username);
    
    if (userProfileDataError) {
        console.error("[getUserData() Error]: ", userProfileDataError);
        return { error: { status: 500, message: "Server error retrieving profile data. Check logs for details." }, userData: null };
    }
    
    if (!userProfileData.length) return { error: { status: 404, message: "No user found with provided username." }, userData: null };
    
    const userArray = userProfileData as any[];
    const user = userArray[0];
    
    let currentUserOrIsFollowing: boolean = username === currentUser.userName; // Checks to see if it is the current user or is_following passes.

    /* 
    * Check to see if:
    * - User's profile is private or public
    * - If user's profile is public returns `true`.
    * - If user's profile is private. If currentUser is not following user, returns `false`.
    * Returns: boolean
    */
    if(!currentUserOrIsFollowing) {
        const { data: isFollowing, error: isFollowingErr } = await supabase
             .rpc('is_following', {
                 current_profile_id: currentUser.id,
                 requested_profile_id: user.id
             })
         if (isFollowingErr) console.error(isFollowingErr)
         else currentUserOrIsFollowing = isFollowing;
    }

    
    const userProfile: UserData = {
        id: user.id,
        userName: user["user_name"],
        displayName: user["display_name"],
        createdAt: user["created_at"],
        avatarUrl: user["avatar_url"],
        headerUrl: user["header_url"],
        bio: user.bio,
        isPrivate: user["private_profile"],
    }
    
    if(!currentUserOrIsFollowing) return { error: { status: 401, message: "Unahotirzed access." }, userData: userProfile };

    return { error: null, userData: userProfile };
}

export async function getUserDataByID(supabase: SupabaseClient<any, "public", any>, userID: string | null): Promise<{ error: { status: 500 | 404, message: string } | null, userData: UserData | null }> {
    if (!userID) return { error: { status: 404, message: "Missing ID field" }, userData: null };

    const { data: userProfileData, error: userProfileDataError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", userID);

    if (userProfileDataError) {
        console.error("[getUserData() Error]: ", userProfileDataError);
        return { error: { status: 500, message: "Error retrieving user data. Check logs for details." }, userData: null };
    }

    if (!userProfileData.length) return { error: { status: 404, message: "No user found with provided id." }, userData: null};

    const userArray = userProfileData as any[];
    const user = userArray[0];

    const userProfile: UserData = {
        id: user.id,
        userName: user["user_name"],
        displayName: user["display_name"],
        createdAt: user["created_at"],
        avatarUrl: user["avatar_url"],
        headerUrl: user["header_url"],
        bio: user.bio,
        isPrivate: user["private_profile"],
        init: user["init"]
    }

    return { error: null, userData: userProfile };
}