import Link from "next/link";
import { headers } from "next/headers";

import { BsTwitter, BsBell, BsBookmark, BsPeople, BsPerson } from "react-icons/bs";
import { BiHomeCircle, BiSearchAlt2, BiEnvelope } from "react-icons/bi";
import { PiDotsThreeCircle } from "react-icons/pi";

import { type IconType } from "react-icons/lib/esm/iconBase";

import TweetButtonComponent from "./TweetButtonComponent";
import ToolTipComponent from "./ToolTipComponent";

type NavLink = {
  title: string,
  icon: IconType
}

const navLinks: NavLink[] = [
  {
    title: "Home",
    icon: BiHomeCircle
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

export default async function NavComponent() {
  const origin = process.env.NEXT_URL || "http://localhost:3000"
  const getCurrentUser = await fetch(`${origin}/api/user`, { headers: headers() });
  const currentUser = await getCurrentUser.json();

  return (
    <header className="sticky top-0 h-screen">
      <div className="flex flex-col h-screen justify-between w-[300px]">
        <div id="head-top" >
          <BsTwitter size={60} className="hover:bg-slate/20 rounded-full p-4" />
          {
            navLinks.map((nl: NavLink, i: number) => {
              return (
                <Link key={i} href={`/${nl.title.toLowerCase()}`} className="group flex">
                  <div className="flex text-xl m-2 transition duration-100 group-hover:bg-slate/20 rounded-full">
                    <div className="m-2"><nl.icon size={25} /></div>
                    <div className="m-2">{nl.title}</div>
                  </div>
                </Link>
              );
            })
          }
          <TweetButtonComponent />
        </div>
        <ToolTipComponent userData={currentUser} />
      </div>
    </header>
  )
}