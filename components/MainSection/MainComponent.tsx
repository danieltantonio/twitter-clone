import WriteTweetContainer from "../WriteTweetContainer";
import TweetsDisplayDashboard from "./TweetsDisplayDashboard";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { PostTweet } from "@/lib/ServerActions/TweetActions";

import type { UserData } from "@/lib/types/userdata.types";
import type { Tweet } from "@/lib/types/tweet.types";

async function HomeOption(props: { label: string, className?: string }) {
  const { label, className } = props;
  let includedClasses = "w-1/2 text-center p-4 h-full hover:bg-white/10 font-semibold text-sm group";

  if (className) includedClasses = includedClasses.concat(" ", className);

  return (
    <div className={includedClasses}>
      <span>{label}</span>
    </div>
  )
}

export default async function MainComponent(props: { currentUser: UserData }) {
  const { currentUser } = props;
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data: tweetsData, error } = await supabase
    .from("secured_tweets")
    .select("*")
    .eq("is_reply", false);

  if (error) {
    console.error(error);
    return null;
  }

  const fetchedTweets = tweetsData as Tweet[];

  async function handlePostTweetServerAction() {
    "use server";
    revalidatePath("/");
  }

  async function handleDeleteTweet() {
    "use server";
    revalidatePath("/");
  }

  return (
    <>
      <div className="sticky top-0 flex flex-col border-b border-slate/25 bg-black/50 backdrop-blur-sm">
        <div className="p-4 w-full">
          <span className="font-semibold text-xl">Home</span>
        </div>
        <div className="w-full flex flex-row">
          <HomeOption label="For you" className="border-b-2" />
          <HomeOption label="Following" />
        </div>
      </div>

      <form action={handlePostTweetServerAction}>
        <WriteTweetContainer currentUser={currentUser} />
      </form>

      <form action={handleDeleteTweet}>
        <TweetsDisplayDashboard currentUser={currentUser} fetchedTweets={fetchedTweets} />
      </form>
    </>
  )
}
