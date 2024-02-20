import { Input } from "@material-tailwind/react"
import { FormEvent, useEffect } from "react";

export default function SignUpStepOne(props: {
    email: string,
    name: string,
    onFormChange: (e: FormEvent<HTMLInputElement>) => void,
    handleUniqueUsername: (uniqueUsername: boolean) => void,
    handleUniqueEmail: (uniqueEmail: boolean) => void,
    handleLoading: (loadingState: boolean) => void
}
) {
    const { email, name, onFormChange, handleUniqueUsername, handleUniqueEmail, handleLoading } = props;

    async function userNameNotTaken(username: string) {
        try {
            const checkUsername = await fetch(`/api/user/${username}`);

            if (checkUsername.status === 404) {
                handleUniqueUsername(true);
                handleLoading(false);
            } else {
                handleUniqueUsername(false);
                handleLoading(false);
            }
        } catch (e) {
            alert("Server error, check console.");
            handleUniqueUsername(false);
            handleLoading(false);
        }
    }

    async function emailNotTaken(email: string) {
        try {
            const checkEmail = await fetch(`/api/user/register/${email}`);

            if (checkEmail.status === 404) {
                handleUniqueEmail(true);
                handleLoading(false);
            } else {
                handleUniqueEmail(false);
                handleLoading(false);
            }
        } catch (e) {
            alert("Server error, check console.");
            handleUniqueEmail(false);
            handleLoading(false);
        }
    }

    useEffect(() => {
        const searchUsername = setTimeout(async () => {
            await userNameNotTaken(name);
        }, 500);

        return () => clearTimeout(searchUsername);
    }, [name]);

    useEffect(() => {
        const searchEmail = setTimeout(async () => {
            await emailNotTaken(email);
        }, 500);

        return () => clearTimeout(searchEmail);
    }, [email])

    return (
        <>
            <div className="my-2">
                <Input name="name" type="text" color="blue" size="lg" label="Name" className="text-white text-xl h-[50px]" onChange={onFormChange} value={name} />
            </div>
            <div className="my-2">
                <Input name="email" type="email" color="blue" size="lg" label="Email" className="text-white text-xl h-[50px]" onChange={onFormChange} value={email} />
            </div>
        </>
    )
}
