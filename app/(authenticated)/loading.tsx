"use client"
import { Spinner } from "@material-tailwind/react"

export default function AuthenticatedLoading() {
    return (
        <div className="relative h-full w-full flex flex-col justify-center">
            <div className="mx-auto">
                <Spinner className="w-12 h-12" color="blue"/>
            </div>
        </div>
    )
}
