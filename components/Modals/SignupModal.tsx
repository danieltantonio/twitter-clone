"use client"

import Button from "../Inputs/Buttons/Button";
import { SignupForm } from "@/lib/types/signupform.types";
import { FormEvent, useState, useEffect } from "react";
import * as EmailValidator from "email-validator";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import SignUpStepOne from "./SignUpStepOne";
import SignUpStepTwo from "./SignUpStepTwo";
import SignUpStepThree from "./SignUpStepThree";

export default function SignupModal(props: { handleInputClickStepThree: () => void, signupForm: SignupForm, signupStep: number, handleSignupStep: () => void, handleSignupForm: (formData: { value: string, name: string }) => void }) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { signupForm, signupStep, handleSignupStep, handleSignupForm, handleInputClickStepThree } = props;
  const [nextStep, setNextStep] = useState(true);

  function handleFormChange(formData: { value: string, name: string }) {
    const { value, name } = formData;
    handleSignupForm({ value, name });
  }

  function handleNextStep(isValidEmail: boolean, isValidUsername: boolean, isValidPassword: boolean, isValidConfirmPass: boolean) {
    if (signupStep === 1 && isValidEmail && isValidUsername) {
      setNextStep(false);
    } else if (signupStep === 2 && isValidPassword && isValidConfirmPass) {
      setNextStep(false);
    } else {
      setNextStep(true);
    }
  }

  function onFormChange(e: FormEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    handleFormChange({ value, name });
  }

  async function handleSignup() {
    const { email, name, password } = signupForm;
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: name
        },
        emailRedirectTo: `${location.origin}/home`
      }
    });
    router.refresh();
  }

  useEffect(() => {
    const isValidName = signupForm.name.length >= 6 && signupForm.name.length <= 12;
    const isValidEmail: boolean = EmailValidator.validate(signupForm.email);
    const isValidPassword = signupForm.password.length >= 6 && signupForm.password.length <= 12;
    const isValidConfirmPass = signupForm.confirmPass === signupForm.password;

    handleNextStep(isValidName, isValidEmail, isValidPassword, isValidConfirmPass);

  }, [signupForm, signupStep]);

  return (
    <div className="mx-auto w-3/4 flex flex-col">
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
        signupStep === 1 && <SignUpStepOne email={signupForm.email} name={signupForm.name} onFormChange={onFormChange} />
      }
      {
        signupStep === 2 && <SignUpStepTwo password={signupForm.password} confirmPass={signupForm.confirmPass} onFormChange={onFormChange} />
      }
      {
        signupStep === 3 && <SignUpStepThree email={signupForm.email} name={signupForm.name} handleInputClickStepThree={handleInputClickStepThree}/>
      }
      <div>
        {
          signupStep !== 3 ?
            <Button className="bg-white/90 my-4 text-black font-bold" onClick={handleSignupStep} disabled={nextStep}>Next</Button>
            :
            <Button className="bg-primary my-4 text-white font-bold" onClick={handleSignup}>Sign up</Button>
        }
      </div>
    </div>
  )
}
