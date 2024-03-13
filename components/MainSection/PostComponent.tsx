"use client"

import InteractionComponent from "./PostComponent/InteractionComponent";
import PostContentComponent from "./PostComponent/PostContentComponent";
import PostAuthorIconComponent from "./PostComponent/PostAuthorIconComponent";

import { useRouter } from "next/navigation";

import type { Tweet } from "@/lib/types/tweet.types";
import type { UserData } from "@/lib/types/userdata.types";

export default function PostComponent(props: { tweet: Tweet, currentUser: UserData, isThread?: boolean }) {
  const { tweet, currentUser, isThread } = props;
  const router = useRouter();

  let threadLine: boolean = true;

  function handleBackgroundClick() {
    router.push(`/${tweet.user_name}/status/${tweet.id}`);
  }

  if(!isThread) threadLine = false;

  return (
    <div className="flex flex-col cursor-pointer hover:bg-slate/5" onClick={handleBackgroundClick}>
      <div className={`flex flex-row border-slate/25 p-2 ${threadLine ? "" : "border-b-2" }`}>
        <PostAuthorIconComponent tweet={tweet} isThread={threadLine} />
        <div className="flex flex-col w-full">
          <PostContentComponent tweet={tweet} currentUser={currentUser} />
          <div>
            <InteractionComponent tweet={tweet} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  )
}