"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const page = () => {
    const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
        router.push(`/dashboard/${session?.user.id}/overview`);
    }, [session]);

    return
}

export default page;