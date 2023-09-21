"use client"

import Link from "next/link";
import { BsTwitter } from "react-icons/bs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import ProviderLoginSignup from "../../components/buttons/ProviderLoginSignup";

export default async function LoginComponent() {
    const supabase = createClientComponentClient();
    const { error, data } = await supabase.auth.getUser();
    
    if(error?.status !== 401 && data.user) redirect("/home");
    
    return (
        <div className="h-screen w-screen">
            <div className="h-full flex flex-col justify-center">
                <div className="h-full flex flex-row justify-center">
                    <div className="h-full flex flex-col justify-between w-3/4">
                        <div className="h-full flex flex-col justify-center">
                            <div className="flex flex-row">
                                <div className="w-1/2 flex flex-row justify-center h-full">
                                    <div className="flex flex-col justify-center">
                                        <BsTwitter size={400} />
                                    </div>
                                </div>
                                <div className="w-1/2 flex flex-row justify-center">
                                    <div className="flex flex-col justify-center h-full">
                                        <span className="text-6xl font-bold my-10">Happening now</span>
                                        <div className="flex flex-col w-3/5">
                                            <span className="font-bold text-3xl mt-2 mb-4">Join today.</span>
                                            <ProviderLoginSignup btnType="Sign Up" provider="Google" />
                                            <ProviderLoginSignup btnType="Sign Up" provider="Apple" />
                                            <div className="flex flex-row my-2">
                                                <div className="flex flex-col justify-center w-full">
                                                    <div className="h-[1px] bg-rlgrey"></div>
                                                </div>
                                                <div className="mx-2">
                                                    <span className="text-sm">or</span>
                                                </div>
                                                <div className="flex flex-col justify-center w-full">
                                                    <div className="h-[1px] bg-rlgrey"></div>
                                                </div>
                                            </div>
                                            <div className="flex flex-row text-white bg-primary rounded-full py-2 justify-center">
                                                <span className="font-semibold">Create account</span>
                                            </div>
                                            <div>
                                                <span className="text-slate text-xs leading-none">
                                                    By signing up you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use.</span>
                                                </span>
                                            </div>

                                            <div className="mt-14">
                                                <span className="font-bold">Already have an account?</span>
                                                <div className="flex flex-row my-4 text-white border border-rlgrey rounded-full py-2 justify-center">
                                                    <span className="font-semibold text-primary">Sign in</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="flex flex-row mb-4 text-xs font-extralight text-slate justify-between">
                            <Link href="#">About</Link>
                            <Link href="#">Help Center</Link>
                            <Link href="#">Terms of Service</Link>
                            <Link href="#">Privacy Policy</Link>
                            <Link href="#">Cookie Policy</Link>
                            <Link href="#">Accessibility</Link>
                            <Link href="#">Ads info</Link>
                            <Link href="#">Blog</Link>
                            <Link href="#">Status</Link>
                            <Link href="#">Careers</Link>
                            <Link href="#">Brand Resources</Link>
                            <Link href="#">Advertising</Link>
                            <Link href="#">Marketing</Link>
                            <Link href="#">Twitter for Business</Link>
                            <Link href="#">Developers</Link>
                            <Link href="#">Directory</Link>
                            <Link href="#">Settings</Link>
                            <span>&copy; 2023 Daniel waz here</span>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    )
}
