import PostComponent from "./PostComponent";

import { revalidatePath } from "next/cache";

import type { Tweet } from "@/lib/types/tweet.types"
import type { UserData } from "@/lib/types/userdata.types"

export default async function ServerPostComponent(props: { tweet: Tweet, currentUser: UserData }) {
    const { tweet, currentUser } = props;

    async function handleDeleteTweet() {
        "use server";
        revalidatePath("/");
    }

    return (
        <form action={handleDeleteTweet}>
            <PostComponent tweet={tweet} currentUser={currentUser} />
        </form>
    )
}
