import { Input } from "@material-tailwind/react"
import { FormEvent } from "react";

export default function SignUpStepTwo(props: { onFormChange: (e: FormEvent<HTMLInputElement>) => void, password: string, confirmPass: string }) {
    const { onFormChange, password, confirmPass } = props;

    return (
        <>
            <div className="my-2">
                <Input name="password" type="password" color="blue" size="lg" label="Password" className="text-white text-xl h-[50px]" onInput={onFormChange} value={password}/>
            </div>
            <div className="my-2">
                <Input name="confirmPass" type="password" color="blue" size="lg" label="Confirm Password" className="text-white text-xl h-[50px]" onInput={onFormChange} value={confirmPass}/>
            </div>
        </>
    )
}
