import { createClient } from "./supabase/server";
import { cookies } from "next/headers";

export default async function getUserData(cookieStore: ReturnType<typeof cookies>) {
  const supabase = await createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  if(error) {
    console.error("getUserData() Error: ", error);
    return;
  }

  if(!data.user) {
    return;
  }

  const authUser = data.user;
  const { data: userProfiles, error: sqlErr } = await supabase.from("profile").select("*").eq("id", authUser.id);

  if(sqlErr) {
    console.error("getUserData() SQL Error: ", sqlErr);
    return;
  }

  const users = userProfiles as any[];
  const user = users[0];
  const id = user.id;
  const userName = user["user_name"];
  const displayName = user["display_name"];

  return ({ id, userName, displayName });
}