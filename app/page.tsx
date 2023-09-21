import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();

  if(error?.status === 401 && !data.user) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}
