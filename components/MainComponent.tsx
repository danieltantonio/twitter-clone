"use client"
import PostComponent from "./PostComponent";

import { AiOutlinePicture, AiOutlineFileGif, AiOutlineSchedule, AiOutlineHeart } from "react-icons/ai";
import { BiPoll } from "react-icons/bi";
import { HiOutlineEmojiHappy } from "react-icons/hi";

function checkIfScrollBar(e: React.ChangeEvent<HTMLInputElement>) {
  e.target.style.height = "auto";
  const scHeight = e.target.scrollHeight;
  e.target.style.height = `${scHeight}px`;
}

function HomeOption(props: { label: string, className?: string }): JSX.Element {
  const { label, className } = props;
  let includedClasses = "w-1/2 text-center p-4 h-full hover:bg-white/10 font-semibold text-sm group";

  if(className) includedClasses = includedClasses.concat(" ", className);

  return (
    <div className={includedClasses}>
      <span>{label}</span>
    </div>
  )
}

export default function MainComponent() {
  return (
    <main className="w-[600px] border-x border-slate/25 flex flex-col">
      <div className="sticky top-0 flex flex-col border-b border-slate/25 bg-black/50 backdrop-blur-sm">
        <div className="p-4 w-full">
          <span className="font-semibold text-xl">Home</span>
        </div>
        <div className="w-full flex flex-row">
          <HomeOption label="For you" className="border-b-2"/>
          <HomeOption label="Following" />
        </div>
      </div>

      <div className="flex flex-row w-full border-b border-slate/25 p-2 mt-2">
        <div className="mx-2">
          <div className="h-[40px] w-[40px] bg-slate rounded-full"></div>
        </div>
        <div className="flex flex-col w-full mx-2">
          <textarea name="tweet" className="resize-none w-full bg-transparent text-xl placeholder:font-thin" placeholder="What is happening?" onInput={checkIfScrollBar}></textarea>
          <div className="flex flex-row justify-between mt-2">
            <div className="flex flex-row w-1/3 justify-between mt-2 text-primary text-xl">
              <AiOutlinePicture />
              <AiOutlineFileGif />
              <BiPoll />
              <HiOutlineEmojiHappy />
              <AiOutlineSchedule />
            </div>
            <div>
              <button className="text-white px-4 py-2 bg-primary font-bold rounded-full text-sm">Tweet</button>
            </div>
          </div>
        </div>
      </div>
      <PostComponent />
      <PostComponent />
      <PostComponent />
    </main>
  )
}
