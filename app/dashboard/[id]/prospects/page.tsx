"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FaEnvelope, FaPhone } from "react-icons/fa6"

import { ProspectRecord } from "@/app/types";
import clsx from "clsx";

type ProspectCardProps = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    approved?: boolean;
};

function ProspectCard({ id, first_name, last_name, email, phone, approved, }: ProspectCardProps) {
    const badgeColor = clsx(
        "absolute top-3 right-3 badge badge-xs",
        {
            "badge-primary": approved,
            "badge-error": !approved,
        }
    );
    
    return (
        <Link href={`/dashboard/kladf-asdfjl-as2kj/prospects/${id}`} className="relative max-w-md w-80 shadow rounded-md p-5 bg-white">
            <div title="approved" className={badgeColor}></div>
            
            <div className="name-image flex items-center justify-start gap-3">
                <p className="first-letter text-white bg-sky-500 font-semibold text-2xl h-10 w-10 rounded-full flex items-center justify-center">
                    {first_name[0].toUpperCase()}
                </p>

                <p className="font-semibold text-lg">{first_name + " " + last_name}</p>
            </div>

            <div className="summary mt-4 ml-2 space-y-2">
                <div className="flex gap-3 items-center justify-start">
                    <p><FaEnvelope /></p>
                    <p className="text-sm font-inter">{email}</p>
                </div>
                <div className="flex gap-3 items-center justify-start">
                    <p><FaPhone /></p>
                    <p className="text-sm font-inter">{phone}</p>
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
                    id={prospect._id as string}
                    first_name={prospect.first_name}
                    last_name={prospect.last_name}
                    email={prospect.email}
                    phone={prospect.phone as string}
                    approved={prospect.is_approved}
                />
            ))}
        </div>
    )
}