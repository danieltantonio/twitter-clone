import type { UserData } from "@/lib/types/userdata.types";

export default async function TestComponent(props: { userData: UserData }) {
    const { userData } = props;

    console.log("TEST COMPONENT: ", userData);

    return (
        <div>TestComponent</div>
    )
}
