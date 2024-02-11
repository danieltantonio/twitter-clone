"use client";

import { useState } from "react"

import EditProfileModal from "./Modals/EditProfileModal";

import type { UserData } from "@/lib/types/userdata.types";

export default function EditProfileButton(props: { currentUser: UserData, }) {
    const { currentUser } = props;
    const [openEditProfile, setOpenEditProfile] = useState(false);

    function openModal() {
        setOpenEditProfile(true);
    }

    function closeModal() {
        setOpenEditProfile(false);
    }

    return (
        <>
            {
                (openEditProfile) && (
                    <EditProfileModal
                        openEditProfile={openEditProfile}
                        currentUser={currentUser}
                        closeModal={closeModal}
                    />
                )
            }
            <div className="w-full">
                <span className="float-right border rounded-full font-semibold border-slate/75 px-4 py-2 mt-2 mb-5 mx-2" onClick={openModal}>Edit Profile</span>
            </div>
        </>
    )
}
