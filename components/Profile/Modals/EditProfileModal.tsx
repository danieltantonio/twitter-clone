"use client";
import { useState } from "react";

import EditProfileMain from "./EditProfileMain";
import EditMediaAvatarModal from "./EditMediaAvatarModal";
import EditMediaHeaderModal from "./EditMediaHeaderModal";

import type { UserData } from "@/lib/types/userdata.types";
import type { EditMedia, ProfileData } from "@/lib/types/profile.types";
import type { ChangeEvent } from "react";

export default function EditProfileModal(
    props: {
        openEditProfile: boolean
        currentUser: UserData,
        closeModal: () => void,
    }
) {

    const { currentUser, closeModal } = props;
    const initEditMedia: EditMedia = { editMediaAvatar: false, editMediaHeader: false };
    const initProfileData: ProfileData = { avatar: currentUser.avatarUrl, header: currentUser.headerUrl, name: currentUser.displayName, bio: currentUser.bio };
    const [editMedia, setEditMedia] = useState(initEditMedia);
    const [profileData, setProfileData] = useState(initProfileData);

    function handleAvatar(avatarUrl: string) {
        setProfileData({ ...profileData, avatar: avatarUrl });
    }

    function handleHeader(headerUrl: string) {
        setProfileData({ ...profileData, header: headerUrl });
    }

    function handleEditMediaAvatar(editMediaAvatar: boolean) {
        setEditMedia({ editMediaHeader: false, editMediaAvatar });
    }

    function handleEditMediaHeader(editMediaHeader: boolean) {
        setEditMedia({ editMediaAvatar: false, editMediaHeader });
    }

    function onChangeProfileData(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    }

    return (
        <>
            {
                (!editMedia.editMediaAvatar && !editMedia.editMediaHeader) && (
                    <EditProfileMain
                        profileData={profileData}
                        closeModal={closeModal}
                        handleAvatar={handleAvatar}
                        handleEditMediaAvatar={handleEditMediaAvatar}
                        handleHeader={handleHeader}
                        handleEditMediaHeader={handleEditMediaHeader}
                        onChangeProfileData={onChangeProfileData}
                    />
                )
            }
            {
                (editMedia.editMediaAvatar && !editMedia.editMediaHeader) && (
                    <EditMediaAvatarModal
                        profileData={profileData}
                        handleAvatar={handleAvatar}
                        handleEditMediaAvatar={handleEditMediaAvatar}
                    />
                )
            }
            {
                (!editMedia.editMediaAvatar && editMedia.editMediaHeader) && (
                    <EditMediaHeaderModal
                        profileData={profileData}
                        handleHeader={handleHeader}
                        handleEditMediaHeader={handleEditMediaHeader}
                    />
                )
            }
        </>
    )
}
