"use client"

import { BsTwitter } from "react-icons/bs";
import ProviderLoginSignup from "@/components/Inputs/Buttons/ProviderLoginSignup";
import Link from "next/link";
import Modal from "@/components/Modals/Modal";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useModalStore } from "@/lib/store/modalStore";

import Button from "./Inputs/Buttons/Button";

export default function FrontPage() {
    const params = useSearchParams();
    const [openModal, setOpenModal] = useState(false);
    const { setLoginModal, setSignupModal } = useModalStore();

    function handleOpenModal() {
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
        setLoginModal(false);
        setSignupModal(false);
    }

    function onClickLogin() {
        handleOpenModal();
        setLoginModal(true);
    }

    function onClickSignup() {
        handleOpenModal();
        setSignupModal(true);
    }

    useEffect(() => {
        if (params.has("login") || params.has("signup")) handleOpenModal();
    }, [params]);

    return (
        <>
            <div className="h-screen w-screen relative">
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
                                                <ProviderLoginSignup btnType="Sign Up" provider="Google" className="my-2" />
                                                <ProviderLoginSignup btnType="Sign Up" provider="Apple" className="my-2" />
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
                                                <Button className="text-white bg-primary font-semibold" onClick={onClickSignup}>Create account</Button>
                                                <div>
                                                    <span className="text-slate text-xs leading-none">
                                                        By signing up you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use.</span>
                                                    </span>
                                                </div>
                                                <div className="mt-14">
                                                    <span className="font-bold">Already have an account?</span>
                                                    <Button className="my-4 border border-rlgrey font-semibold text-primary" onClick={onClickLogin}>Sign in</Button>
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
                <Modal open={openModal} handleClose={handleCloseModal} />
            </div>
        </>
    )
}
