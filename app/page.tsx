import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

import FrontPage from "@/components/FrontPage/FrontPageComponent";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data: isLoggedIn, error } = await supabase.auth.getSession();

  if(isLoggedIn.session) redirect("/home");

  if(error) console.error("IndexComponent Error: ", error);

  return (
        <FrontPage />
  )
}
