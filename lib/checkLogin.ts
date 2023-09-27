import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function checkLogin(): Promise<boolean> {
    const supabase = createServerComponentClient({ cookies });
    const { error, data } = await supabase.auth.getUser();

    if(error?.status === 401 && !data.user) return false;

    return true;
}