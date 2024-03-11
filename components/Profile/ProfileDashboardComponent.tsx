"use client";

import { useState } from "react";

import TweetsDisplayDashboard from "../MainSection/TweetsDisplayDashboard";

import type { UserData } from "@/lib/types/userdata.types";

type TabSelect = "Posts" | "Replies" | "Media" | "Likes";
const tabSelectInit: TabSelect = "Posts";

function AuthorizedDashboardComponent(props: { currentUser: UserData, username?: string }) {
  const { currentUser, username } = props;
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
          <TweetsDisplayDashboard currentUser={currentUser} username={username} />
        )
      }

      {
        tab === "Replies" && (
          <TweetsDisplayDashboard currentUser={currentUser} username={username} />
        )
      }
    </div>
  )
}

export default function ProfileDashboardComponent(props: { currentUser: UserData, authorized: boolean, username?: string }) {
  const { currentUser, authorized, username } = props;

  return (
    <>
      {
        authorized ?
          <AuthorizedDashboardComponent currentUser={currentUser} username={username} />
          :
          <div className="flex flex-col px-32">
            <span className="text-3xl font-bold">These posts are protected</span>
            <span className="text-slate/75 text-sm">Only approved followers can see @{username}’s posts. To request access, click Follow. <span className="text-primary">Learn more</span></span>
          </div>
      }
    </>
  )
}
