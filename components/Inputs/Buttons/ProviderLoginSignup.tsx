"use client"

import Image, { StaticImageData } from "next/image";
import Button from "./Button";

import googleG from "@/public/googleG.webp";
import appleLogo from "@/public/appleLogo.webp";

import { Provider, BtnType } from "@/lib/types/buttoninfo.types";

export default function ProviderLoginSignup(props: { provider: Provider, btnType: BtnType, className?: string, disabled?: boolean, onClick?: (e?: MouseEvent | null) => void }) {
    const { provider, btnType, className, disabled, onClick } = props;

    return (
        <div className={`${className}`}>
            <Button className="text-black bg-white" disabled={disabled} onClick={onClick}>
                <div className="mx-2 flex flex-col justify-center">
                    <Image
                        src={
                            provider === "Google" ?
                                googleG
                                :
                                appleLogo
                        }
                        alt={`${provider} logo`}
                        width={17}
                    />
                </div>
                <span className="font-semibold">
                    {`${btnType} with ${provider}`}
                </span>
            </Button>
        </div >
    )
}