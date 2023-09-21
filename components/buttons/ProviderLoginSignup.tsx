import Image, { StaticImageData } from "next/image";
import googleG from "@/public/googleG.webp";
import appleLogo from "@/public/appleLogo.webp";

import { Provider, BtnType } from "@/lib/types/buttoninfo.types";

export default function ProviderLoginSignup(props: { provider: Provider, btnType: BtnType }) {
    const { provider, btnType } = props;

    return (
        <div className="flex flex-col my-2">
            <div className="flex flex-row text-black bg-white rounded-full py-2 justify-center">
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
            </div>
        </div>
    )
}