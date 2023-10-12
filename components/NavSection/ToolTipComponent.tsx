"use client"

import { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "@material-tailwind/react"

import { BiDotsHorizontalRounded } from "react-icons/bi";

import type { UserData } from "@/lib/types/userdata.types";

export default function ToolTipComponent(props: { userData: UserData }) {
    const { userData } = props;

    const [logoutTooltip, setLogoutTooltip] = useState(false);
    const [clickedLogout, setClickedLogout] = useState(false);
    const supabase = createClientComponentClient();
    const router = useRouter();

    function handleOpenLogoutTooltip() {
        setLogoutTooltip(true);
    }

    function handleCloseLogoutTooltip() {
        setLogoutTooltip(false);
    }

    async function handleLogout() {
        setClickedLogout(true);
        await supabase.auth.signOut();
        router.replace("/");
    }

    return (
        <>
            <Tooltip
                content={
                    <div className="flex flex-col" onClick={handleLogout}>
                        <div className="relative h-[40px] flex flex-col justify-center hover:bg-rlgrey/30 hover:cursor-pointer p-4 rounded-lg">
                            <span className="font-bold text-lg">Log out @{userData.userName}</span>
                        {
                            clickedLogout && (
                                <div className="absolute h-full w-full top-0 left-0 flex flex-col justify-center bg-black rounded-lg">
                                    <Spinner color="blue" className="mx-auto"/>
                                </div>
                            )
                        }
                        </div>
                    </div>
                }
                open={logoutTooltip}
                className="z-50 border border-rlgrey drop-shadow-tooltip p-0"
            >
                <div id="head-bot" className="mb-[10px] hover:bg-slate/20 hover:cursor-pointer align-middle p-2 rounded-full mx-2 transition duration-400" onClick={handleOpenLogoutTooltip}>
                    <div className="flex flex-row justify-between align-middle">
                        <div className="flex flex-row align-middle h-10">
                            <div className="w-[40px] h-[40px] bg-slate rounded-full"></div>
                            <div className="flex flex-col mx-2">
                                <span className="font-bold text-lg leading-4">{userData.displayName}</span>
                                <span className="text-slate/50 font-ultralight">@{userData.userName}</span>
                            </div>
                        </div>
                        <div className="h-[20px] my-auto"><BiDotsHorizontalRounded size={20} /></div>
                    </div>
                </div>
            </Tooltip>
            {
                logoutTooltip && <div id="tooltip-click" className="absolute h-full w-full left-0 top-0" onClick={handleCloseLogoutTooltip}></div>
            }
        </>
    )
}
