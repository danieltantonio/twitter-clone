"use client"

import statToString from "@/lib/statToString";

import { AiOutlineHeart } from "react-icons/ai";
import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { LuShare } from "react-icons/lu";
import { IconType } from "react-icons/lib/esm/iconBase";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { Tweet } from "@/lib/types/tweet.types";

dayjs.extend(relativeTime);

type PostInteraction = {
    icon: IconType,
    stats: string
}

const postInteractions: PostInteraction[] = [
    {
        icon: FaRegComment,
        stats: statToString(204)
    },
    {
        icon: FaRetweet,
        stats: statToString(1234)
    },
    {
        icon: AiOutlineHeart,
        stats: statToString(62300)
    },
    {
        icon: IoIosStats,
        stats: statToString(3900000)
    }
];

function InteractionComponent() {
    return (
        <>
            {
                postInteractions.map((pi: PostInteraction, i: number) => {
                    return(
                        <div className="flex flex-row items-center" key={i}>
                            <div className="h-full p-2 rounded-full">
                                <pi.icon className="h-full"/> 
                            </div>
                            <span className="text-sm font-light px-2">{pi.stats}</span>
                        </div>
                    )
                })
            }
            <div className="flex flex-row items-center justify-center">
                <div className="h-full p-2 rounded-full">
                    <LuShare className="h-full"/>
                </div>
            </div>
        </>
    )
}

export default function PostComponent(props: { tweet: Tweet }) {
  const { tweet } = props;

  return (
    <div className="flex flex-col">
        <div className="flex flex-row p-4 border-b-2 border-slate/25">
          <div className="mr-3">
            <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between w-full">
              <div className="flex flex-row text-sm justify-between">
                <span className="font-bold">{tweet.profile["display_name"]}</span>
                <div className="flex flex-row ml-2 font-light">
                  <span className="text-slate/75">@{tweet.profile["user_name"]}</span>
                  <BsDot className="h-full text-slate/75" />
                  <span className="text-slate/75">{dayjs(tweet["created_at"]).fromNow()}</span>
                </div>
              </div>
              <div>
                <BsThreeDots className="h-full text-slate/75" />
              </div>
            </div>
            <div id="post" className="text-sm font-light mb-2">
              <span>{tweet["post_content"]}</span>
            </div>
            <div className="flex flex-row text-slate/75 text-lg mt-2 justify-between w-full">
                <InteractionComponent />
            </div>
          </div>
        </div>
      </div>
  )
}