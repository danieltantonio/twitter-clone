"use client";

import { useState } from "react"
import Cropper, { type Area } from "react-easy-crop";

import { IoMdArrowRoundBack } from "react-icons/io";

import fgClick from "@/lib/onClickForeground";
import getCroppedImg from "@/lib/EditProfile/getCroppedImg";

import type { ProfileData } from "@/lib/types/profile.types";

export default function EditMediaHeaderModal(props: {
    profileData: ProfileData,
    handleHeader: (headerUrl: string) => void,
    handleEditMediaHeader: (editMediaHeader: boolean) => void
}) {
    const { profileData, handleHeader, handleEditMediaHeader } = props;
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const initCroppedAreaPixels: Area = { width: 0, height: 0, x: 0, y: 0 };
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(initCroppedAreaPixels);
    const [initCompleteCrop, setInitCompleteCrop] = useState(initCroppedAreaPixels);

    function completeCrop(croppedArea: Area, croppedAreaPixels: Area) {
        setCroppedAreaPixels(croppedAreaPixels);

        if (!initCompleteCrop.height && !initCompleteCrop.width) {
            setInitCompleteCrop(croppedAreaPixels);
        }
    }

    async function onClickApply(apply: boolean) {
        try {
            const croppedArea = apply ? croppedAreaPixels : initCompleteCrop;
            const croppedImg = await getCroppedImg(profileData.header, croppedArea);

            if (!croppedImg) {
                throw Error("Unable to complete getCroppedImg() promise.");
            }

            handleHeader(croppedImg);
            handleEditMediaHeader(false);
        } catch (e) {
            console.error("[ERROR]: ", e);
        }
    }

    return (
        <div className="fixed top-0 left-0 h-full w-screen bg-slate/50 z-10">
            <div className="flex flex-row justify-center mt-10">
                <div className="bg-black w-[600px] rounded-2xl" onClick={fgClick}>
                    <div className="flex flex-col mx-1">
                        <div className="flex flex-row my-4 justify-between w-full px-4">
                            <div className="flex flex-row">
                                <IoMdArrowRoundBack size={20} className="h-full font-bold cursor-pointer" onClick={() => onClickApply(false)} />
                                <span className="font-bold text-xl ml-10">Edit media</span>
                            </div>
                            <span className="text-black bg-white font-semibold text-sm rounded-full px-4 py-2" onClick={() => onClickApply(true)}>Apply</span>
                        </div>
                        <div className="w-full h-[400px] position relative bg-slate/25">
                            <Cropper
                                image={profileData.header}
                                crop={crop}
                                zoom={zoom}
                                aspect={3 / 1}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={completeCrop}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
