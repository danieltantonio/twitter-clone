"use server"

import { createClient } from "../supabase/server";
import { cookies } from "next/headers";

export async function LoginAction (formData: FormData) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const emailFormData = formData.get("email") as FormDataEntryValue;
    const passwordFormData = formData.get("password") as FormDataEntryValue;
    let email: string = emailFormData.toString();
    let password: string = passwordFormData.toString();

    if(!email.length || !password.length) {
        console.error("Error missing: Email or password!");
        return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if(error) {
        console.error("Auth Error: ", error);
        return error;
    }

    if(data) {
        console.log(`User Login: ${data.user.id} @ ${Date()}`)
    }
}