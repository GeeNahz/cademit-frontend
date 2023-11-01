"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FaEnvelope, FaPhone } from "react-icons/fa6"

import { ProspectRecord } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";

type ProspectData = {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    approved?: boolean;
}
type ProspectCardProps = {
    data: ProspectData;
};

function ProspectCard({ data }: ProspectCardProps) {
    const { data: session } = useSession();
    
    const statusColor = clsx(
        "relative max-w-md w-80 shadow rounded-md p-5 bg-white border-t-8",
        {
            "border-primary": data.approved,
            "border-error": !data.approved,
        }
    );

    return (
        <Link href={`/dashboard/${session?.user.id}/prospects/${data._id}`} className={statusColor}>
            <div className="name-image">
                <div className="flex items-start justify-between gap-3">
                    <p className="font-light text-xs text-stone-500">Full name</p>

                    <p className="first-letter text-white bg-sky-500 font-semibold text-sm h-6 w-6 rounded-full flex items-center justify-center">
                        {data.first_name[0].toUpperCase()}
                    </p>
                </div>
                <p className="font-bold text-base">{data.first_name + " " + data.last_name}</p>
            </div>

            <div className="mt-4">
                <p className="font-light text-xs text-stone-500 mb-3">Contact</p>

                <div className="summary space-y-2">
                    <div className="flex gap-3 items-center justify-start">
                        <p><FaEnvelope /></p>
                        <p className="text-sm font-inter">{data.email}</p>
                    </div>
                    <div className="flex gap-3 items-center justify-start">
                        <p><FaPhone /></p>
                        <p className="text-sm font-inter">{data.phone}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}


async function getProspects() {
    try {
        const response = await fetch("/api/v1/prospects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return response.json()
        } else {
            throw new Error(`${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export default function Prospects() {
    const [prospects, setProspects] = useState<ProspectRecord[]>([]);

    async function fetchProspects() {
        try {
            const data = await getProspects();
            setProspects(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProspects();
    }, []);

    return (
        <div className="flex flex-wrap gap-5">
            {prospects.map((prospect: ProspectRecord) => (
                <ProspectCard
                    key={prospect._id}
                    data={{ _id: (prospect._id as string), email: prospect.email, first_name: prospect.first_name, last_name: prospect.last_name, phone: (prospect.phone as string), approved: prospect.is_approved }}
                />
            ))}
        </div>
    )
}