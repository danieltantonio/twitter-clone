"use client";

import { useState } from "react";

import TweetsDisplayDashboard from "../MainSection/TweetsDisplayDashboard";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

type TabSelect = "Posts" | "Replies" | "Media" | "Likes";
const tabSelectInit: TabSelect = "Posts";

export default function ProfileDashboardComponent(props: { tweets: Tweet[], userData: UserData, currentUser: UserData }) {
  const { tweets, userData, currentUser } = props;
  const [tab, setTab] = useState(tabSelectInit);

  function handleClickTab(tabName: TabSelect) {
    if (tabName === tab) return;
    setTab(tabName);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full h-14">
        <div className={`text-sm w-full text-center hover:bg-rlgrey cursor-pointer ${tab === "Posts" ? "bg-rlgrey" : ""}`} onClick={() => handleClickTab("Posts")}>
          <div className="mt-5">
            <span className={tab === "Posts" ? "border-b-4 pb-3 border-primary font-bold" : "text-slate/75"}>Posts</span>
          </div>
        </div>

        <div className={`text-sm w-full text-center hover:bg-rlgrey cursor-pointer ${tab === "Replies" ? "bg-rlgrey" : ""}`} onClick={() => handleClickTab("Replies")}>
          <div className="mt-5">
            <span className={tab === "Replies" ? "border-b-4 pb-3 border-primary font-bold" : "text-slate/75"}>Replies</span>
          </div>
        </div>

        <div className={`text-sm w-full text-center hover:bg-rlgrey cursor-pointer ${tab === "Media" ? "bg-rlgrey" : ""}`} onClick={() => handleClickTab("Media")}>
          <div className="mt-5">
            <span className={tab === "Media" ? "border-b-4 pb-3 border-primary font-bold" : "text-slate/75"}>Media</span>
          </div>
        </div>

        <div className={`text-sm w-full text-center hover:bg-rlgrey cursor-pointer ${tab === "Likes" ? "bg-rlgrey" : ""}`} onClick={() => handleClickTab("Likes")}>
          <div className="mt-5">
            <span className={tab === "Likes" ? "border-b-4 pb-3 border-primary font-bold" : "text-slate/75"}>Likes</span>
          </div>
        </div>
      </div>

      {
        tab === "Posts" && (
          <TweetsDisplayDashboard tweets={tweets} userData={userData} currentUser={currentUser} />
        )
      }

      {
        tab === "Replies" && (
          <TweetsDisplayDashboard tweets={tweets} userData={userData} currentUser={currentUser} />
        )
      }
    </div>
  )
}
