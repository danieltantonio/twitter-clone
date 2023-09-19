import { BsTwitter, BsBell, BsBookmark, BsPeople, BsPerson } from "react-icons/bs";
import { BiHomeCircle, BiSearchAlt2, BiEnvelope, BiDotsHorizontalRounded } from "react-icons/bi";
import { PiDotsThreeCircle } from "react-icons/pi";

import { IconType } from "react-icons/lib/esm/iconBase";
import Link from "next/link";

type NavLink = {
    title: string,
    icon: IconType
}
  
const navLinks: NavLink[] = [
    {
      title: "Home",
      icon:  BiHomeCircle
    },
    {
      title: "Explore",
      icon: BiSearchAlt2
    },
    {
      title: "Notifications",
      icon: BsBell
    },
    {
      title: "Messages",
      icon: BiEnvelope
    },
    {
      title: "Bookmarks",
      icon: BsBookmark
    },
    {
      title: "Communities",
      icon: BsPeople
    },
    {
      title: "Profile",
      icon: BsPerson
    },
    {
      title: "More",
      icon: PiDotsThreeCircle
    }
];

export default function NavComponent() {
  return (
    <header className="sticky top-0 h-screen">
        <div className="flex flex-col h-screen justify-between w-[300px]">
          <div id="head-top" >
            <BsTwitter size={60} className="hover:bg-slate/20 rounded-full p-4" />
            {
              navLinks.map((nl: NavLink, i: number) => {
                return(
                  <Link key={i} href={`/${nl.title.toLowerCase()}`} className="group flex">
                    <div className="flex text-xl m-2 transition duration-100 group-hover:bg-slate/20 rounded-full">
                      <div className="m-2"><nl.icon size={25} /></div>
                      <div className="m-2">{nl.title}</div>
                    </div>
                  </Link>
                );
              })
            }
            <button className="bg-primary w-[90%] py-4 rounded-full font-bold mt-5">Tweet</button>
          </div>
          <div id="head-bot" className="mb-[10px] hover:bg-slate/20 align-middle p-2 rounded-full mx-2 transition duration-400">
            <div className="flex flex-row justify-between align-middle">
              <div className="flex flex-row align-middle h-10">
                <div className="w-[40px] h-[40px] bg-slate rounded-full"></div>
                <div className="flex flex-col mx-2">
                  <span className="font-bold text-lg leading-4">Daniel</span>
                  <span className="text-slate/50 font-ultralight">@Daniel</span>
                </div>
              </div>
              <div className="h-[20px] my-auto"><BiDotsHorizontalRounded size={20}/></div>
            </div>
          </div>
        </div>
      </header>
  )
}