import Link from "next/link";
import SignupLoginComponent from "./SignupLoginComponent";

export default function FrontPage() {
    return (
        <>
            <div className="h-screen w-screen relative">
                <div className="h-full flex flex-col justify-center">
                    <div className="h-full flex flex-row justify-center">
                        <div className="h-full flex flex-col justify-between w-3/4">
                            <SignupLoginComponent />                           
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
            </div>
        </>
    )
}
