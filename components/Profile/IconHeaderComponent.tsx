import Image from "next/image";
import EditProfileButton from "./EditProfileButton";

import type { UserData } from "@/lib/types/userdata.types";

export default function IconHeaderComponent(props: { currentUser: UserData, userProfile: UserData }) {
    const { currentUser, userProfile } = props;

    return (
        <>
            <div className="w-full relative">
                <Image src={userProfile.headerUrl} alt="" width={1500} height={500} />
                <Image src={userProfile.avatarUrl} alt="" className="rounded-full absolute top-[130px] left-4 border-4 border-black" height={130} width={130} />
            </div>
            {
                (currentUser.userName !== userProfile.userName) && (
                    <div className="w-full">
                        <span className="float-right border rounded-full font-semibold border-slate/75 px-4 py-2 m-2">Follow</span>
                    </div>
                )
            }

            {
                currentUser.userName === userProfile.userName && (
                    <EditProfileButton currentUser={currentUser} />
                )
            }
        </>
    )
}
