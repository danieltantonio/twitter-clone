"use client"

import { Input } from "@material-tailwind/react";
import ProviderLoginSignup from "@/components/Inputs/Buttons/ProviderLoginSignup";
import Button from "@/components/Inputs/Buttons/Button";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@material-tailwind/react";

import { LoginAction } from "@/lib/ServerActions/AuthActions";

export default function LoginModal() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleLoginAction(formData: FormData) {
        setIsLoading(true);
        await LoginAction(formData);
        router.push("/home");
    }

    return (
        <div className="w-3/5 mx-auto px-8 relative">
            <div className="my-8">
                <span className="font-bold text-3xl">Sign in to Twitter</span>
            </div>
            <ProviderLoginSignup btnType="Log In" provider="Google" className="my-6" />
            <ProviderLoginSignup btnType="Log In" provider="Apple" className="my-6" />
            <div className="flex flex-row my-2">
                <div className="flex flex-col justify-center w-full">
                    <div className="h-[1px] bg-rlgrey"></div>
                </div>
                <div className="mx-2">
                    <span className="text-md">or</span>
                </div>
                <div className="flex flex-col justify-center w-full">
                    <div className="h-[1px] bg-rlgrey"></div>
                </div>
            </div>
            <form action={handleLoginAction}>
                <div className="mt-8 mb-4">
                    <Input type="email" name="email" color="blue" size="lg" label="Phone, email, username" className="text-white text-xl h-[50px]" />
                </div>
                <div className="mb-8">
                    <Input type="password" name="password" color="blue" size="lg" label="Password" className="text-white text-xl h-[50px]" />
                </div>
                <Button className="bg-white/90 my-4 text-black font-bold"><button type="submit">Login</button></Button>
            </form>
            <Button className="border border-slate/75 text-white">Forgot Password?</Button>
            <div className="my-10 pb-20 text-sm">
                <span className="text-slate/75">Don&apos;t have an account? <span className="text-primary cursor-pointer">Sign up</span></span>
            </div>
            {
                isLoading && (
                    <div className="absolute h-full w-full top-0 left-0 bg-black">
                        <div className="flex flex-row w-full h-full justify-center">
                            <div className="flex flex-col h-full justify-center">
                                <Spinner color="blue" className="h-12 w-12" />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
