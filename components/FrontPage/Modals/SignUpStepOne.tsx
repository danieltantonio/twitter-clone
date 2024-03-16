import { Input } from "@material-tailwind/react"
import { FormEvent, useEffect } from "react";
import * as EmailValidator from "email-validator";

import type { SignupForm } from "@/lib/types/signupform.types";

export default function SignUpStepOne(props: {
    email: string,
    name: string,
    formErrors: SignupForm,
    onFormChange: (e: FormEvent<HTMLInputElement>) => void,
    handleUniqueUsername: (uniqueUsername: boolean) => void,
    handleUniqueEmail: (uniqueEmail: boolean) => void,
    handleLoading: (loadingState: boolean) => void,
    handleFormErrors: (name: string, value: string) => void,
}
) {
    const { email, name, formErrors, onFormChange, handleUniqueUsername, handleUniqueEmail, handleLoading, handleFormErrors } = props;

    function usernameHasSpecialChars(username: string) {
        const hasSpecialChars = username
            .split('')
            .map((char) => char.charCodeAt(0))
            .filter((charCode) => (
                (charCode < 48) ||
                (charCode >= 58 && charCode <= 64) ||
                (charCode >= 91 && charCode <= 94) ||
                (charCode === 96) ||
                (charCode > 123)
            )
            )
        
        if (hasSpecialChars.length) return true;

        return false;
    }

    async function userNameNotTaken(username: string) {
        const badUsername = usernameHasSpecialChars(username);

        if (badUsername) {
            handleUniqueUsername(false);
            handleFormErrors("name", "Username is only allowed to contain letters and underscores");
            handleLoading(false);
            return;
        }

        try {
            const checkUsername = await fetch(`/api/user/${username}`);

            if (checkUsername.status === 404) {
                handleUniqueUsername(true);
                handleFormErrors("name", "");
            } else {
                handleUniqueUsername(false);
            }
        } catch (e) {
            alert("Server error, check console.");
            handleUniqueUsername(false);
        }

        handleLoading(false);
    }

    async function emailNotTaken(email: string) {
        try {
            const checkEmail = await fetch(`/api/user/register/${email}`);

            if (checkEmail.status === 404) {
                const isValidEmail: boolean = EmailValidator.validate(email);

                if (isValidEmail) {
                    handleFormErrors("email", "");
                    handleUniqueEmail(true);
                } else {
                    handleFormErrors("email", "Email currently in use.");
                    handleUniqueEmail(false);
                }
            } else {
                handleUniqueEmail(false);
            }
        } catch (e) {
            alert("Server error, check console.");
            handleUniqueEmail(false);
        }
        handleLoading(false);
    }

    useEffect(() => {
        handleUniqueUsername(false);
        const searchUsername = setTimeout(async () => {
            await userNameNotTaken(name);
        }, 500);

        return () => clearTimeout(searchUsername);
    }, [name]);

    useEffect(() => {
        handleUniqueEmail(false);
        const searchEmail = setTimeout(async () => {
            await emailNotTaken(email);
        }, 500);

        return () => clearTimeout(searchEmail);
    }, [email])

    return (
        <>
            <div className="my-2">
                <Input name="name" type="text" color={formErrors.name.length ? "red" : "blue"} size="lg" label="Name" className="text-white text-xl h-[50px]" onChange={onFormChange} value={name} />
            </div>
            <div className="my-2">
                <Input name="email" type="email" color={formErrors.email.length ? "red" : "blue"} size="lg" label="Email" className="text-white text-xl h-[50px]" onChange={onFormChange} value={email} />
            </div>
        </>
    )
}
