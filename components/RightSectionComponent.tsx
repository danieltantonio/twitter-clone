import statToString from "@/lib/statToString";

import Link from "next/link";

import { BiSearch } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

type Trend = {
    trending: string,
    title: string,
    stats: number
}

const trendingTopics: Trend[] = [
    {
        trending: "Trending in United States",
        title: "Neural-Linked Robo-Snakes",
        stats: 14359
    },
    {
        trending: "CyberSec",
        title: "#NeuroHackRevolt",
        stats: 5344
    },
    {
        trending: "Music",
        title: "Holo-Idol",
        stats: 74032
    },
    {
        trending: "Anime",
        title: "Tengen Toppa Gurren Lagann",
        stats: 2742
    }
];

function TrendComponent() {
    return (
        <>
            {
                trendingTopics.map((t: Trend, i: number) => {
                    return (
                        <div className="flex flex-col w-full text-slate/75 px-4 py-1" key={i}>
                            <div className="flex flex-row w-full justify-between">
                                <div>
                                    <span className="text-xs font-extralight">{t.trending}</span>
                                </div>
                                <div>
                                    <BsThreeDots className="h-full"/>
                                </div>
                            </div>
                            <div>
                                <span className="font-bold text-white">{t.title}</span>
                            </div>
                            <div>
                                <span className="text-xs font-extralight">{statToString(t.stats)} posts</span>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default function RightSectionComponent() {
  return (
    <section className="sticky flex flex-col top-0 h-screen w-[350px] mx-6 pt-2">
        <div className="flex flex-row bg-rlgrey rounded-full justify-between mb-1">
            <div className="flex flex-row w-full">
                <div className="text-xl text-slate/60 mx-4 align-center">
                    <BiSearch className="h-full"/>
                </div>
                <div className="w-full font-extralight">
                    <form action="#">
                        <input type="text" placeholder="Search" className="bg-transparent h-[40px] w-full placeholder:text-sm"/>
                    </form>
                </div>
            </div>
            <div className="mx-2">
                <AiFillCloseCircle className="h-full w-[25px]"/>
            </div>
        </div>

        <div className="flex flex-col bg-rdgrey rounded-2xl mb-4">
            <span className="text-xl font-bold my-4 px-4">What&apos;s happening</span>
            <TrendComponent /> 
            <div className="p-4 w-full">
                <span className="font-light text-sm text-primary">Show more</span>
            </div>
        </div>

        <div className="flex flex-col bg-rdgrey rounded-2xl">
            <span className="text-xl font-bold my-4 px-4">Who to follow</span>
            <div className="flex flex-col">
                <div className="flex flex-row px-4 my-2 w-full align-center justify-between">
                    <div className="flex flex-row">
                        <div>
                            <div className="w-[40px] h-[40px] bg-slate rounded-full"></div>
                        </div>
                        <div className="flex flex-col ml-2">
                            <span className="text-white font-bold">Neon</span>
                            <span className="text-slate/75 text-sm font-extralight">@NeonCyberWave</span>
                        </div>
                    </div>
                    <button className="mt-2 bg-rwhite text-rdgrey text-sm font-bold px-4 rounded-full h-8">Follow</button>
                </div>

                <div className="flex flex-row px-4 my-2 w-full align-center justify-between">
                    <div className="flex flex-row">
                        <div>
                            <div className="w-[40px] h-[40px] bg-slate rounded-full"></div>
                        </div>
                        <div className="flex flex-col ml-2">
                            <span className="text-white font-bold">Neon</span>
                            <span className="text-slate/75 text-sm font-extralight">@NeonCyberWave</span>
                        </div>
                    </div>
                    <button className="mt-2 bg-rwhite text-rdgrey text-sm font-bold px-4 rounded-full h-8">Follow</button>
                </div>

                <div className="flex flex-row px-4 my-2 w-full align-center justify-between">
                    <div className="flex flex-row">
                        <div>
                            <div className="w-[40px] h-[40px] bg-slate rounded-full"></div>
                        </div>
                        <div className="flex flex-col ml-2">
                            <span className="text-white font-bold">Neon</span>
                            <span className="text-slate/75 text-sm font-extralight">@NeonCyberWave</span>
                        </div>
                    </div>
                    <button className="mt-2 bg-rwhite text-rdgrey text-sm font-bold px-4 rounded-full h-8">Follow</button>
                </div>
            </div>
            <div className="p-4 w-full">
                <span className="font-light text-sm text-primary">Show more</span>
            </div>
        </div>

        <div className="p-4 font-extralight text-slate/75 text-xs flex flex-wrap w-full flex-row">
            <Link href="/"><span className="mx-1">Terms of Service</span></Link>
            <Link href="/"><span className="mx-1">Privacy Policy</span></Link>
            <Link href="/"><span className="mx-1">Cookie Policy</span></Link>
            <Link href="/"><span className="mx-1">Accessibility</span></Link>
            <Link href="/"><span className="mx-1">Ads info</span></Link>
            <Link href="/">
                <div className="flex flex-row mr-1">
                    <span>More</span>
                    <BsThreeDots className="h-full"/>
                </div>
            </Link>
            <span className="mx-1">&copy; 2024 Daniel waz here</span>
        </div>
    </section>
  )
}
