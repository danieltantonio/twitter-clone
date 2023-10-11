import InteractionComponent from "./InteractionComponent";

import { BsDot, BsThreeDots } from "react-icons/bs";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

dayjs.extend(relativeTime);

export default async function PostComponent(props: { tweet: Tweet, userData: UserData }) {
  const { tweet, userData } = props;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-4 border-b-2 border-slate/25">
        <div className="mr-3">
          <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
        </div>
        <div className="flex flex-col w-full">
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
          <div className="flex flex-row text-slate/75 text-lg mt-2 justify-between w-full">
            <InteractionComponent tweet={tweet} userData={userData} />
          </div>
        </div>
      </div>
    </div>
  )
}