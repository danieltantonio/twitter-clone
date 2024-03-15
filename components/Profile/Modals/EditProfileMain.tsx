"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { CgClose } from "react-icons/cg";
import { TbCameraPlus } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

import { Input, Textarea, Switch, Typography } from "@material-tailwind/react";

import fgClick from "@/lib/onClickForeground";

import type { ChangeEvent } from "react";
import type { ProfileData } from "@/lib/types/profile.types";

export default function EditProfileMain(props: {
    profileData: ProfileData,
    initProfile?: boolean,
    closeModal?: () => void,
    handleAvatar: (handleAvatar: string) => void,
    handleHeader: (headerUrl: string) => void,
    handleEditMediaAvatar: (handleMediaAvatar: boolean) => void,
    handleEditMediaHeader: (handleMediaHeader: boolean) => void,
    onChangeProfileData: (data: any) => void,
}) {

    const {
        profileData,
        initProfile,
        closeModal,
        handleAvatar,
        handleEditMediaAvatar,
        handleHeader,
        handleEditMediaHeader,
        onChangeProfileData,
    } = props;

    const router = useRouter();
    const [privateProfile, setPrivateProfile] = useState(profileData.private);

    const hiddenAvatarFileInput = useRef<HTMLInputElement>(null);
    const hiddenHeaderFileInput = useRef<HTMLInputElement>(null);

    const defaultAvatar = "https://cltgswnlsgvjrfszkaiz.supabase.co/storage/v1/object/public/avatar/default.jpg";
    const defaultHeader = "https://cltgswnlsgvjrfszkaiz.supabase.co/storage/v1/object/public/header/default.jpg";

    function handleClickAvatar() {
        if (hiddenAvatarFileInput.current) hiddenAvatarFileInput.current.click();
    }

    function handleClickHeader() {
        if (hiddenHeaderFileInput.current) hiddenHeaderFileInput.current.click();
    }

    function handleClickDeleteHeaderImg() {
        handleHeader(defaultHeader);
    }

    function handleAvatarInputOnChange(e: ChangeEvent<HTMLInputElement>) {
        const allowedFileTypes = ["image/jpeg", "image/png"];
        const fileList = e.target.files;

        if (!fileList) return null;

        const file = fileList[0];

        if (allowedFileTypes.includes(file.type)) {
            const tempFileURL = URL.createObjectURL(file);
            handleAvatar(tempFileURL);
            handleEditMediaAvatar(true);
        }
    }

    function handleHeaderInputOnChange(e: ChangeEvent<HTMLInputElement>) {
        const allowedFileTypes = ["image/jpeg", "image/png"];
        const fileList = e.target.files;

        if (!fileList) return null;

        const file = fileList[0];

        if (allowedFileTypes.includes(file.type)) {
            const tempFileURL = URL.createObjectURL(file);
            handleHeader(tempFileURL);
            handleEditMediaHeader(true);
        }

    }

    async function saveChanges() {
        const formData = new FormData();
        const getNewAvatar = await fetch(profileData.avatar);
        const getNewHeader = await fetch(profileData.header);
        const newAvatarBlob = await getNewAvatar.blob();
        const newHeaderBlob = await getNewHeader.blob();

        const newAvatar = profileData.avatar !== defaultAvatar ? newAvatarBlob : defaultAvatar;
        const newHeader = profileData.header !== defaultHeader ? newHeaderBlob : defaultHeader;

        formData.append("avatar", newAvatar);
        formData.append("header", newHeader);
        formData.append("name", profileData.name);
        formData.append("bio", profileData.bio);
        formData.append("private", privateProfile ? "true" : "false");

        await fetch(`/api/user/edit_profile`, {
            method: "POST",
            credentials: "same-origin",
            body: formData
        });

        if (initProfile) {
            router.push("/home");
            router.refresh();
        }
    }

    return (
        <div className="fixed top-0 left-0 h-full w-screen bg-rdgrey/50 z-10" onClick={closeModal}>
            <div className="flex flex-row justify-center mt-10">
                <div className="bg-black w-[600px] rounded-2xl" onClick={fgClick}>
                    <div className="flex flex-col mx-1">
                        <div className="flex flex-row mt-4 justify-between w-full">
                            <div className="flex flex-row">
                                {
                                    !initProfile ?
                                        <CgClose size={20} className="h-full font-bold cursor-pointer" onClick={closeModal} />
                                        :
                                        null
                                }
                                <span className="font-bold text-xl ml-10">Edit profile</span>
                            </div>
                            <span className="cursor-pointer text-black bg-white font-semibold text-sm rounded-full px-4 py-2" onClick={saveChanges}>Save</span>
                        </div>
                        <div className="w-full relative my-2 pb-10">
                            <div className="w-full h-[200px] relative">
                                <Image src={profileData.header} alt="" height={500} width={1500} className="opacity-50" />
                                <input
                                    type="file"
                                    name="header"
                                    ref={hiddenHeaderFileInput}
                                    onChange={handleHeaderInputOnChange}
                                    className="hidden"
                                />
                                {
                                    (profileData.header !== defaultHeader) && (
                                        <div className="absolute top-[50%] left-[40%] flex flex-row">
                                            <div className="rounded-full bg-rlgrey/50 p-2 hover:cursor-pointer hover:bg-slate mx-3" onClick={handleClickHeader}>
                                                <TbCameraPlus className="text-3xl" />
                                            </div>
                                            <div className="rounded-full bg-rlgrey/50 p-2 hover:cursor-pointer hover:bg-slate mx-3">
                                                <IoClose className="text-3xl" onClick={handleClickDeleteHeaderImg} />
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    (profileData.header === defaultHeader) && (
                                        <div className="absolute top-[50%] left-[50%]">
                                            <div className="rounded-full bg-rlgrey/50 p-2 hover:cursor-pointer hover:bg-slate" onClick={handleClickHeader}>
                                                <TbCameraPlus className="text-3xl" />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="absolute top-[130px] left-4">
                                <div className="relative">
                                    <div className="w-[130px] h-[130px] relative rounded-full bg-black">
                                        <Image alt="" src={profileData.avatar} height={400} width={400} className="rounded-full border-4 border-black opacity-75" />
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
                        </div>
                        <div className="py-8 px-2">
                            <div className="mb-4">
                                <Switch color="blue" label={
                                    <div>
                                        <Typography className="font-semibold text-white">Private Profile</Typography>
                                        <Typography variant="small" className="text-slate">Only users who are following you can see your posts, replies, and your profile.</Typography>
                                    </div>
                                } checked={privateProfile} onClick={() => setPrivateProfile(!privateProfile)} />
                            </div>
                            <div className="mb-8">
                                <Input type="text" name="name" color="blue" size="lg" label="Name" className="text-white text-xl h-[50px]" value={profileData.name} onChange={onChangeProfileData} />
                            </div>
                            <div className="mb-8">
                                <Textarea name="bio" color="blue" size="lg" label="Bio" className="text-white text-xl" value={profileData.bio} onChange={onChangeProfileData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
