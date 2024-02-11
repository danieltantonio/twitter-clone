import { Input } from "@material-tailwind/react"
import { FormEvent } from "react";

export default function SignUpStepOne(props: { onFormChange: (e: FormEvent<HTMLInputElement>) => void, email: string, name: string }) {
    const { onFormChange, email, name } = props;

    return (
        <>
            <div className="my-2">
                <Input name="name" type="text" color="blue" size="lg" label="Name" className="text-white text-xl h-[50px]" onChange={onFormChange} value={name}/>
            </div>
            <div className="my-2">
                <Input name="email" type="email" color="blue" size="lg" label="Email" className="text-white text-xl h-[50px]" onChange={onFormChange} value={email}/>
            </div>
        </>
    )
}
