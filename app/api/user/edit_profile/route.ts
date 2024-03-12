import { NextResponse, type NextRequest } from "next/server"; 
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const data = await req.formData();

    const avatarName: string = uuidv4();
    const headerName: string = uuidv4();

    const dataObjStr = Object(data.get("profileData"));
    const dataObj = JSON.parse(dataObjStr);

    const defaultAvatar = "https://cltgswnlsgvjrfszkaiz.supabase.co/storage/v1/object/public/avatar/default.jpg";
    const defaultHeader = "https://cltgswnlsgvjrfszkaiz.supabase.co/storage/v1/object/public/header/default.jpg";

    const { data: session, error } = await supabase.auth.getSession();

    if(error) {
        console.error("RUH ROH RAGGY", error);
        return NextResponse.json({ "Server Session Error":  "Check Console." });
    }

    if(!session.session) {
        console.error("Session Error: No active session.");
        return NextResponse.json({ "Server Session Error": "No active session. Please log-in." }, {
            status: 401
        });
    }

    const currentUser = session.session.user.id;

    if(dataObj.avatar !== defaultAvatar) {
        const { error: uploadAvatarErr } = await supabase
            .storage
            .from("avatar")
            .upload(`${currentUser}/${avatarName}.jpg`, dataObj.avatar, {
                upsert: false,
                contentType: "image/jpeg"
        });
    
        if (uploadAvatarErr) {
            console.error("Upload Avatar Error: ", uploadAvatarErr);
            return NextResponse.json({ "Avatar Upload Error": "Failed to upload avatar. Check console." }, {
                status: 500
            });
        }
    }

    if(dataObj.header !== defaultHeader) {
        const { error: uploadHeaderErr } = await supabase
            .storage
            .from("header")
            .upload(`${currentUser}/${headerName}.jpg`, dataObj.header, {
                upsert: false,
                contentType: "image/jpeg"
        });
    
        if (uploadHeaderErr) {
            console.error("Upload Header Error: ", uploadHeaderErr);
            return NextResponse.json({ "Header Upload Error": "Failed to upload header. Check console."}, {
                status: 500
            });
        }
    }

    const { data: uploadedAvatarUrl } = await supabase.storage.from("avatar").getPublicUrl(`${currentUser}/${avatarName}.jpg`);
    const { data: uploadedHeaderUrl } = await supabase.storage.from("header").getPublicUrl(`${currentUser}/${headerName}.jpg`);

    const avatarUrl = dataObj.avatar !== defaultAvatar ? uploadedAvatarUrl.publicUrl : defaultAvatar;
    const headerUrl = dataObj.header !== defaultHeader ? uploadedHeaderUrl.publicUrl : defaultHeader;

    const { data: updateProfile, error: updateProfileErr } = await supabase
    .from("profile")
    .update({
        display_name: dataObj.name,
        bio: dataObj.bio,
        avatar_url: avatarUrl,
        header_url: headerUrl,
        private_profile: dataObj.private
    })
    .eq("id", currentUser);

    if(updateProfileErr) {
        console.error("Update Profile Error: ", updateProfileErr);
        return NextResponse.json({ Error: "Update Profile Error. Check console." }, {
            status: 500
        });
    }

    if(dataObj.init) {
        const { data, error: initErr } = await supabase
            .from("profile")
            .update({
                init: true
            })
            .eq("id", currentUser);

        if(initErr) {
            console.error(`/api/edit_profile 500 Error: ${initErr}`);
            return NextResponse.json({ Error: "Init Profile Error. Check console." }, {
                status: 500
            });
        }
    }

    return NextResponse.json({ Success: "Successfully updated profile." });
}