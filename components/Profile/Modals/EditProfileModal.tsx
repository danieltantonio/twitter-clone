"use client";
import { CgClose } from "react-icons/cg";
import { TbCameraPlus } from "react-icons/tb";
import { useRef, useState } from "react";
import Image from "next/image";

import { useEditProfileModalState } from "@/lib/store/editProfileModal";
import fgClick from "@/lib/onClickForeground";

import type { UserData } from "@/lib/types/userdata.types";

type ProfilePics = {
    avatar: string,
    header: string
}


export default function EditProfileModal(props: { currentUser: UserData }) {
    const { currentUser } = props;
    const hiddenAvatarFileInput = useRef<HTMLInputElement>(null);
    const hiddenHeaderFileInput = useRef<HTMLInputElement>(null);
    const setEditProfileModal = useEditProfileModalState((state) => state.setEditProfileModal);
    const editProfileModal = useEditProfileModalState((state) => state.editProfileModal);

    const initProfilePics: ProfilePics = { avatar: currentUser.avatarUrl, header: currentUser.headerUrl };
    const [profilePics, setProfilePics] = useState(initProfilePics);

    function handleClickAvatar() {
        if (hiddenAvatarFileInput.current) hiddenAvatarFileInput.current.click();
    }

    function handleAvatarInputOnChange(e: any) { // FIX ME
        const file = e.target.files[0];
        const tempFileURL = URL.createObjectURL(file);
        setProfilePics({ ...profilePics, avatar: tempFileURL });
    }

    function handleClickHeader() {
        if (hiddenHeaderFileInput.current) hiddenHeaderFileInput.current.click();
    }

    function handleHeaderInputOnChange(e: any) { // FIX ME
        const file = e.target.files[0];
        const tempFileURL = URL.createObjectURL(file);
        setProfilePics({ ...profilePics, header: tempFileURL });
    }

    return (
        <>
            {
                editProfileModal && (
                    <div className="fixed top-0 left-0 h-full w-screen bg-slate/50 z-10" onClick={() => setEditProfileModal(false)}>
                        <div className="flex flex-row justify-center mt-10">
                            <div className="bg-black w-[600px] rounded-2xl" onClick={fgClick}>
                                <div className="flex flex-col mx-1">
                                    <div className="flex flex-row mt-4 justify-between w-full">
                                        <div className="flex flex-row">
                                            <CgClose size={20} className="h-full font-bold cursor-pointer" onClick={() => setEditProfileModal(false)} />
                                            <span className="font-bold text-xl ml-10">Edit profile</span>
                                        </div>
                                        <span className="text-black bg-white font-semibold text-sm rounded-full px-4 py-2">Save</span>
                                    </div>
                                    <div className="w-full relative mt-2">
                                        <form action="">
                                            <div className="w-full h-[200px] relative">
                                                <Image src={profilePics.header} alt="" height={500} width={1500} className="opacity-50" />
                                                <input 
                                                    type="file" 
                                                    name="header"
                                                    ref={hiddenHeaderFileInput}
                                                    onChange={handleHeaderInputOnChange}
                                                    className="hidden"
                                                />
                                                <div className="absolute top-[50%] left-[50%] rounded-full bg-rlgrey/50 p-2 hover:cursor-pointer hover:bg-slate" onClick={handleClickHeader}>
                                                    <TbCameraPlus className="text-3xl" />
                                                </div>
                                            </div>
                                            <div className="absolute top-[130px] left-4">
                                                <div className="relative">
                                                    <div className="w-[130px] h-[130px] relative">
                                                        <Image alt="" src={profilePics.avatar} height={400} width={400} className="rounded-full border-4 border-black" />
                                                        <input
                                                            type="file"
                                                            name="avatar"
                                                            ref={hiddenAvatarFileInput}
                                                            onChange={handleAvatarInputOnChange}
                                                            className="hidden"
                                                        />
                                                        <div className="absolute top-[43px] left-[42px] rounded-full bg-rlgrey/50 p-2 hover:cursor-pointer hover:bg-slate" onClick={handleClickAvatar}>
                                                            <TbCameraPlus className="text-3xl" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="w-full">
                <span className="float-right border rounded-full font-semibold border-slate/75 px-4 py-2 mt-2 mb-5 mx-2" onClick={() => setEditProfileModal(true)}>Edit Profile</span>
            </div>
        </>
    )
}
