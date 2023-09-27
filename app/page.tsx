"use server"

import { redirect } from "next/navigation";
import FrontPage from "@/components/FrontPageComponent";
import checkLogin from "@/lib/checkLogin";

export default async function Home() {
  if(await checkLogin()) redirect("/home");

  return (
        <FrontPage />
  )
}
