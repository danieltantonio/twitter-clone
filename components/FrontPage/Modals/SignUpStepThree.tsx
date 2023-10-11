import { Input } from "@material-tailwind/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Link from "next/link";

export default function SignUpStepThree(props: { handleInputClickStepThree: () => void, email: string, name: string }) {
    const { email, name, handleInputClickStepThree } = props;

    return (
        <>
            <div className="my-2">
                <Input name="name" type="text" color="blue" size="lg" label="Name" className="text-white text-xl h-[50px]" value={name} icon={<IoIosCheckmarkCircle className="text-green"/>} onClick={() => handleInputClickStepThree()}/>
            </div>
            <div className="my-2">
                <Input name="email" type="email" color="blue" size="lg" label="Email" className="text-white text-xl h-[50px]" value={email} icon={<IoIosCheckmarkCircle className="text-green"/>} onClick={() => handleInputClickStepThree()}/>
            </div>
            <div className="mt-20 text-slate/75 text-xs">
                <span>By signing up, you agree to the <Link href="#"><span className="text-primary">Terms of Service</span></Link> and <Link href="#"><span className="text-primary">Privacy Policy</span></Link>
                , including <Link href="#"><span className="text-primary">Cookie Use</span></Link>.
                Twitter may use your contact information, including your email address and phone number for purposes outlined in our 
                Privacy Policy, like keeping your account secure and personalizing our services, including ads. <Link href="#"><span className="text-primary">Learn more</span></Link>. 
                Others will be able to find you by email or phone number, when provided, unless you choose otherwise <Link href="#"><span className="text-primary">here</span></Link>.</span>
            </div>
        </>
    )
}
