import WriteTweetComponent from "./WriteTweetComponent"
import TweetsDisplayDashboard from "./TweetsDisplayDashboard";

import getUserData from "@/lib/getUserData"

import type { UserData } from "@/lib/types/userdata.types";

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

export default async function MainComponent() {
  const userData: UserData | undefined = await getUserData();
  let tweets;

  if(userData) tweets = await getTweets(userData);

  async function getTweets(userData: UserData) {
    const res = await fetch(`http://localhost:3000/api/${userData.id}/getTweets`);
    const tweetsJSON = await res.json();

    return tweetsJSON;
  }

  return (
    <>
      {
        userData && (
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
              <div className="flex flex-col w-full mx-2">
                <WriteTweetComponent userData={userData} />
              </div>
            </div>
            {
              tweets && <TweetsDisplayDashboard tweets={tweets} userData={userData} />
            }
          </>
        )
      }
    </>
  )
}
