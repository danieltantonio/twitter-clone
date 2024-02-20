"use client"

import { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

import Button from "../../Inputs/Buttons/Button";
import SignUpStepOne from "./SignUpStepOne";
import SignUpStepTwo from "./SignUpStepTwo";
import SignUpStepThree from "./SignUpStepThree";

import type { SignupForm } from "@/lib/types/signupform.types";

export default function SignupModal(props: { handleInputClickStepThree: () => void, signupForm: SignupForm, signupStep: number, handleSignupStep: () => void, handleSignupForm: (formData: { value: string, name: string }) => void }) {
  const router = useRouter();
  const { signupForm, signupStep, handleSignupStep, handleSignupForm, handleInputClickStepThree } = props;
  const [nextStep, setNextStep] = useState(true);
  const [signupLoading, setSignupLoading] = useState(false);
  const [isUniqueUsername, setIsUniqueUsername] = useState(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleFormChange(formData: { value: string, name: string }) {
    const { value, name } = formData;
    handleSignupForm({ value, name });
  }

  function handleNextStep(isValidEmail: boolean, isValidUsername: boolean, isValidPassword: boolean, isValidConfirmPass: boolean) {
    if (signupStep === 1 && isValidEmail && isValidUsername && !isLoading) {
      setNextStep(false);
    } else if (signupStep === 2 && isValidPassword && isValidConfirmPass && !isLoading) {
      setNextStep(false);
    } else {
      setNextStep(true);
    }
  }

  async function handleSignup() {
    const { email, name, password } = signupForm;
    const supabase = await createClient();

    setSignupLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: name,
          email: email
        },
        emailRedirectTo: `${location.origin}/home`
      }
    });

    if (error) {
      console.error("Sign up error: ", error)
    } else {
      if (data.user) router.push("/home");
    }

  }

  function handleUniqueUsername(uniqueUsername: boolean) {
    setIsUniqueUsername(uniqueUsername);
  }

  function handleUniqueEmail(uniqueEmail: boolean) {
    setIsUniqueEmail(uniqueEmail);
  }

  async function onFormChange(e: any) { // FIX ME
    const { value, name } = e.target;
    if(name === "name" || name === "email") handleLoading(true);
    handleFormChange({ value, name });
  }

  function handleLoading(loadingState: boolean) {
    setIsLoading(loadingState);
  }

  useEffect(() => {
    const isValidName = signupForm.name.length >= 6 && signupForm.name.length <= 12 && isUniqueUsername;
    const isValidPassword = signupForm.password.length >= 6 && signupForm.password.length <= 12;
    const isValidConfirmPass = signupForm.confirmPass === signupForm.password;
    const isValidEmail = isUniqueEmail;

    handleNextStep(isValidName, isValidEmail, isValidPassword, isValidConfirmPass);

  }, [signupForm, signupStep, isUniqueUsername, isUniqueEmail]);

  return (
    <div className="mx-auto w-3/4 flex flex-col relative">
      <div className="my-4 flex flex-col">
        <span className="font-bold text-4xl">Create your account</span>
        <span className="text-md">
          {
            signupStep === 1 && "Name & Email"
          }
          {
            signupStep === 2 && "Password"
          }
          {
            signupStep === 3 && "Confirm details"
          }
        </span>
      </div>
      {
        signupStep === 1 && <SignUpStepOne email={signupForm.email} name={signupForm.name} onFormChange={onFormChange} handleUniqueUsername={handleUniqueUsername} handleUniqueEmail={handleUniqueEmail} handleLoading={handleLoading}/>
      }
      {
        signupStep === 2 && <SignUpStepTwo password={signupForm.password} confirmPass={signupForm.confirmPass} onFormChange={onFormChange} />
      }
      {
        signupStep === 3 && <SignUpStepThree email={signupForm.email} name={signupForm.name} handleInputClickStepThree={handleInputClickStepThree} />
      }
      <div>
        {
          signupStep !== 3 ?
            <Button className="bg-white/90 my-4 text-black font-bold" onClick={handleSignupStep} disabled={nextStep}>Next</Button>
            :
            <Button className="bg-primary my-4 text-white font-bold" onClick={handleSignup}>Sign up</Button>
        }
      </div>
      {

        signupLoading && (
          <div className="absolute h-full w-full bg-black flex flex-col justify-center">
            <Spinner className="mx-auto h-12 w-12" color="blue" />
          </div>
        )
      }
    </div>
  )
}
