"use client"

import { Input } from "@material-tailwind/react";
import ProviderLoginSignup from "@/components/Inputs/Buttons/ProviderLoginSignup";
import Button from "@/components/Inputs/Buttons/Button";
import { useState, FormEvent } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type LoginForm = {
    email: string,
    password: string
}

const initLoginForm: LoginForm = {
    email: "",
    password: ""
}

export default function LoginModal() {
    const [loginForm, setLoginForm] = useState(initLoginForm);
    const supabase = createClientComponentClient();
    const router = useRouter();

    function handleLoginForm(e: FormEvent<HTMLInputElement>) {
        const { value, name } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    }

    async function handleLogin() {
        const { email, password } = loginForm;
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        
        if(data.user) {
            router.push("/home");
        }
    }

    return (
        <div className="w-3/5 mx-auto px-8">
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
            <div className="mt-8 mb-4">
                <Input type="email" name="email" color="blue" size="lg" label="Phone, email, username" className="text-white text-xl h-[50px]" onInput={handleLoginForm} />
            </div>
            <div className="mb-8">
                <Input type="password" name="password" color="blue" size="lg" label="Password" className="text-white text-xl h-[50px]" onInput={handleLoginForm} />
            </div>
            <Button className="bg-white/90 my-4 text-black font-bold" onClick={handleLogin}>Log In</Button>
            <Button className="border border-slate/75 text-white">Forgot Password?</Button>
            <div className="my-10 pb-20 text-sm">
                <span className="text-slate/75">Don't have an account? <span className="text-primary cursor-pointer">Sign up</span></span>
            </div>
        </div>
    )
}
