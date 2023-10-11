"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { CgClose } from "react-icons/cg";
import { BsTwitter } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useModalStore } from "@/lib/store/modalStore";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import { SignupForm } from "@/lib/types/signupform.types";

const initSignupForm: SignupForm = {
    name: "",
    email: "",
    password: "",
    confirmPass: ""
}

export default function Modal(props: { className: string, open: boolean, handleClose: () => void }) {
    const { className, open, handleClose } = props;
    const [signupStep, setSignupStep] = useState(1);
    const [signupForm, setSignupForm] = useState(initSignupForm);
    const { loginModal, signupModal, setLoginModal, setSignupModal } = useModalStore();

    const params = useSearchParams();

    function handleOpenLoginModal() {
        setLoginModal(true);
    }

    function handleOpenSignupModal() {
        setSignupModal(true);
    }

    function handleCloseModal() {
        handleClose();
        setSignupForm(initSignupForm);
        setSignupStep(1);
    }

    function handleSignupStep() {
        setSignupStep(signupStep + 1);
    }

    function handleSignupForm(formData: { value: string, name: string }) {
        const { value, name } = formData;
        setSignupForm({ ...signupForm, [name]: value });
    }

    function handleSignUpStepBack() {
        if(signupStep === 1) {
            handleCloseModal();
        } else {
            setSignupStep(signupStep - 1);
        }
    }

    function handleInputClickStepThree() {
        setSignupStep(1);
    }

    useEffect(() => {
        if (params.has("login") && !params.has("register")) {
            const loginParam = params.get("login");
            const loginParamVal = loginParam === "true" ? true : false;

            if (loginParamVal) handleOpenLoginModal();
        }

        if (params.has("signup") && !params.has("login")) {
            const signupParam = params.get("signup");
            const signupParamVal = signupParam === "true" ? true : false;

            if (signupParamVal) handleOpenSignupModal();
        }

    }, [params]);

    return (
        <Dialog open={open} onClose={handleCloseModal} className={`absolute top-0 left-0 bg-slate/40 w-screen h-screen ${className}`}>
            <div className="relative">
                <Dialog.Panel className="absolute top-36 left-1/3 bg-black w-[600px] rounded-2xl py-2">
                    <div className="flex flex-col">
                        <div className="flex flex-row mb-3">
                            <div className="relative">
                                <div className="ml-4 h-full left-4 top-1 cursor-pointer" onClick={handleSignUpStepBack}>
                                    {
                                        signupStep === 1 ?
                                            <CgClose size={18} className="h-full font-bold" />
                                            :
                                            <IoMdArrowRoundBack size={18} className="h-full font-bold" />
                                    }
                                </div>
                            </div>
                            {
                                !signupModal ?
                                    <div className="flex flex-row justify-center w-full">
                                        <BsTwitter size={25} />
                                    </div>
                                    :
                                    <div className="absolute left-16 top-1">
                                        <span className="font-bold text-lg">{`Step ${signupStep} of 3`}</span>
                                    </div>

                            }
                        </div>
                        {
                            loginModal && <LoginModal />
                        }
                        {
                            signupModal && <SignupModal handleInputClickStepThree={handleInputClickStepThree} signupForm={signupForm} signupStep={signupStep} handleSignupStep={handleSignupStep} handleSignupForm={handleSignupForm} />
                        }
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
