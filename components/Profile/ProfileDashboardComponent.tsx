import AuthorizedDashboard from "./AuthorizedDashboard";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import type { UserData } from "@/lib/types/userdata.types";

export default async function ProfileDashboardComponent(props: { currentUser: UserData, authorized: boolean, username: string }) {
  const { currentUser, authorized, username } = props;
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data: fetchedTweets, error } = await supabase
    .from("secured_tweets")
    .select("*")
    .eq("user_name", username)
    .eq("is_reply", false);

  if (error) {
    console.error(error);
    return null;
  }

  async function handleDeleteTweet() {
    "use server";
    revalidatePath("/");
  }

  return (
    <>
      {
        authorized ?
          <form action={handleDeleteTweet}>
            <AuthorizedDashboard currentUser={currentUser} username={username} fetchedTweets={fetchedTweets} />
          </form>
          :
          <div className="flex flex-col px-32">
            <span className="text-3xl font-bold">These posts are protected</span>
            <span className="text-slate/75 text-sm">Only approved followers can see @{username}’s posts. To request access, click Follow. <span className="text-primary">Learn more</span></span>
          </div>
      }
    </>
  )
}
