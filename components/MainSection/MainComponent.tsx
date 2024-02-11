import WriteTweetComponent from "./WriteTweetComponent"
import TweetsDisplayDashboard from "./TweetsDisplayDashboard";
import WriteTweetInteractionComponent from "./WriteTweetInteractionComponent";

import { PostTweet } from "@/lib/ServerActions/TweetActions";

import type { UserData } from "@/lib/types/userdata.types";
import type { Tweet } from "@/lib/types/tweet.types";

function HomeOption(props: { label: string, className?: string }): JSX.Element {
  const { label, className } = props;
  let includedClasses = "w-1/2 text-center p-4 h-full hover:bg-white/10 font-semibold text-sm group";

  if (className) includedClasses = includedClasses.concat(" ", className);

  return (
    <div className={includedClasses}>
      <span>{label}</span>
    </div>
  )
}

export default async function MainComponent(props: { currentUser: UserData, tweets: Tweet[] }) {
  const { tweets, currentUser } = props;

  async function handlePostTweetServerAction(formData: FormData) {
    "use server";
    await PostTweet(formData, currentUser.id);
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

      <div className="flex flex-row w-full border-b border-slate/25 p-2 mt-2">
        <div className="mx-2">
          <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
        </div>
        <div className="flex flex-col w-full">
          <form action={handlePostTweetServerAction}>
            <WriteTweetComponent />
            <WriteTweetInteractionComponent />
          </form>
        </div>
      </div>
      <TweetsDisplayDashboard tweets={tweets} currentUser={currentUser} />
    </>
  )
}
