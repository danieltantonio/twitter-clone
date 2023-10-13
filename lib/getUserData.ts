import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { UserData } from "./types/userdata.types";

export default async function getUserData(): Promise<UserData | undefined> {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error({ HomeComponent: error });
    return;
  }

  if (data.user) {
    const { data: userData, error: dataError } = await supabase.from("profile").select("*").eq("id", data.user.id);

    if (dataError) console.error(dataError);

    if (userData) {
      const id = userData[0]["id"];
      const displayName = userData[0]["display_name"];
      const userName = userData[0]["user_name"];

      return ({ id, displayName, userName });
    }
  }
}