"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { FaEnvelope, FaPhone, FaFilter, FaFilterCircleXmark } from "react-icons/fa6"

import { ProspectRecord } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Header from "../../components/Header";
import ModalPopup from "@/app/components/ModalPopup";
import MessageBox from "@/app/components/MessageBox";
import { FETCH_STATUS } from "@/utils/status";

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

type ProspectFilterBy = "all" | "approved" | "not approved";

export default function Prospects() {
    const [prospects, setProspects] = useState<ProspectRecord[]>([]);
    const [userData, setUserData] = useState<ProspectRecord[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    // const [filter, setFilter] = useState<ProspectFilterBy>("all");
    const [errorMessage, setErrorMessage] = useState("unable to fetch data. Please reload to try again.");

    async function fetchProspects() {
        setStatus(FETCH_STATUS.LOADING);
        try {
            const data = await getProspects();
            setProspects(data);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error: any) {
            setStatus(FETCH_STATUS.ERROR);
            setErrorMessage(error.message);
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProspects();
    }, []);

    useEffect(() => {
        setUserData(prospects);
    }, [prospects]);


    function filterProspects(filterBy: ProspectFilterBy) {
        let prospectList = prospects.filter((prospect: ProspectRecord) => {
            if (filterBy === "approved") {
                return prospect.is_approved;
            } else if (filterBy === "not approved") {
                return !prospect.is_approved;
            } else {
                return prospect;
            }
        });

        setUserData(prospectList);
    }

    function setFilter(filter: ProspectFilterBy) {
        filterProspects(filter);
    }

    if (status === FETCH_STATUS.LOADING) return (
        <>
            <Header pageTitle="Propects" />
            <div className="h-full w-full flex items-start justify-center pt-56">
                <p className="text-xl font-semibold blue_gradient">Please wait...</p>
            </div>
        </>
    )
    if (status === FETCH_STATUS.ERROR) return (
        <>
            <Header pageTitle="Propects" />
            <div className="h-full w-full flex items-start justify-center pt-56">
                <MessageBox
                    description={errorMessage}
                    messageType="ERROR"
                    onSuccess={async () => await fetchProspects()}
                />
            </div>
        </>
    )

    return (
        <>
            <Header pageTitle="Propects">
                <nav>
                    <ul className="flex gap-3 justify-center w-fit h-fit">
                        <li><input className="search_input" type="search" name="prospect-search" id="prospect-search" placeholder="Search name or keywords" /></li>

                        <li>
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    className="h-full border border-gray-200 rounded hover:border-gray-300 hover:bg-stone-200 focus:bg-stone-200 transition-colors duration-200 p-[11px] shadow focus:shadow-none"
                                >
                                    <FaFilter className="text-gray-500" />
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow bg-stone-100 rounded-sm w-52">
                                    <li><span onClick={() => setFilter("all")}>All</span></li>
                                    <li><span onClick={() => setFilter("approved")}>Approved</span></li>
                                    <li><span onClick={() => setFilter("not approved")}>Not approved</span></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
            </Header>
            <div className="flex flex-wrap gap-5">
                {
                    userData.map((prospect: ProspectRecord) => (
                        <ProspectCard
                            key={prospect._id}
                            data={{ _id: (prospect._id as string), email: prospect.email, first_name: prospect.first_name, last_name: prospect.last_name, phone: (prospect.phone as string), approved: prospect.is_approved }}
                        />
                    ))
                }
            </div>
        </>
    )
}