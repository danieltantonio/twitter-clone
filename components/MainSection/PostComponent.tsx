"use client"

import InteractionComponent from "./InteractionComponent";

import { BsDot, BsThreeDots } from "react-icons/bs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/navigation";
import Image from "next/image";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

dayjs.extend(relativeTime);

export default function PostComponent(props: { tweet: Tweet, userData: UserData }) {
  const { tweet, userData } = props;
  const router = useRouter();

  function handleBackgroundClick() {
    router.push(`/${userData.userName}/status/${tweet.id}`);
  }

  return (
    <div className="flex flex-col cursor-pointer hover:bg-slate/5 relative" onClick={handleBackgroundClick}>
      <div className="flex flex-row border-slate/25 p-2 border-b-2">
        <div className="mx-2">
          <Image src={userData.avatarUrl} alt="" className="rounded-full" width={40} height={40}/>
        </div>
        <div className="flex flex-col w-full">
          <div className="ml-2">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row text-sm justify-between">
                <span className="font-bold">{tweet.authorInfo.authorDisplayName}</span>
                <div className="flex flex-row ml-2 font-light">
                  <span className="text-slate/75">@{tweet.authorInfo.authorUserName}</span>
                  <BsDot className="h-full text-slate/75" />
                  <span className="text-slate/75">{dayjs(tweet.createdAt).fromNow()}</span>
                </div>
              </div>
              <div>
                <BsThreeDots className="h-full text-slate/75" />
              </div>
            </div>
            <div id="post" className="text-sm font-light mb-2">
              <span>{tweet.textContent}</span>
            </div>
          </div>
          <div>
            <InteractionComponent tweet={tweet} userData={userData} />
          </div>
        </div>
      </div>
    </div>
  )
}