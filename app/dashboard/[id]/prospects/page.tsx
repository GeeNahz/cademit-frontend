"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FaEnvelope, FaPhone, FaFilter, FaAngleLeft, FaAngleRight, FaFileExport } from "react-icons/fa6"
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { APIResponse, ProspectRecord } from "@/app/types";
import { exportDataToCSV } from "@/app/hooks/jsonToCSV";
import { FETCH_STATUS } from "@/utils/status";
import { prospects } from "@/services/ProspectService";

import Header from "../../components/Header";
import MessageBox from "@/app/components/MessageBox";
import ModalPopup from "@/app/components/ModalPopup";


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
        "relative max-w-md w-80 shadow rounded-md p-5 bg-white border-t-8 h-fit",
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


// async function getProspects(skip = 0, limit = 10, userId?: string) {
async function getProspects() {
    try {
        // const response = await prospects(skip, limit, userId);
        const response = await prospects();
        return response;
    } catch (error) {
        throw error;
    }
}

type ProspectFilterBy = "all" | "approved" | "not approved";

export default function Prospects() {
    const { data: session } = useSession();

    const [responseData, setResponseData] = useState<APIResponse>();
    const [prospects, setProspects] = useState<ProspectRecord[]>([]);
    const [userData, setUserData] = useState<ProspectRecord[]>([]);
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [errorMessage, setErrorMessage] = useState("unable to fetch data. Please reload to try again.");

    const searchParams = useSearchParams();
    async function fetchProspects() {
        setStatus(FETCH_STATUS.LOADING);
        let skip = parseInt(searchParams.get("skip") as string) || 0;
        let limit = parseInt(searchParams.get("limit") as string) || 10;
        let userId = session?.user.id

        try {
            // const data = await getProspects(skip, limit, userId);
            const data = await getProspects();
            setResponseData(data as any);

            setProspects(data.results as ProspectRecord[]);
            setStatus(FETCH_STATUS.SUCCESS);
        } catch (error: any) {
            setStatus(FETCH_STATUS.ERROR);
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        fetchProspects();
    }, [searchParams]);

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
                <p className="text-xl font-semibold font-lora italic">Please wait...</p>
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

    const prevLinkStyle = clsx(
        {
            "opacity-50 pointer-events-none": !responseData?.links?.previous.href
        },
    );
    const nextLinkStyle = clsx(
        {
            "opacity-50 pointer-events-none": !responseData?.links?.next.href
        },
    );

    function handleDownloadRecord() {
        exportDataToCSV(userData, "prospects");
    }

    return (
        <div className="min-h-full flex flex-col">
            <section className="header sticky -top-0 z-20 bg-inherit bg-stone-50">
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

                            <li className="h-full p-3 text-gray-500 border border-gray-200 rounded hover:border-gray-300 hover:bg-stone-200 focus:bg-stone-200 transition-colors duration-200 shadow focus:shadow-none" title="export current data" tabIndex={1} onClick={handleDownloadRecord}>
                                <FaFileExport />
                            </li>
                        </ul>
                    </nav>
                </Header>
            </section>
            <section className="flex flex-wrap gap-5 px-3 pb-3 min-h-full overflow-scroll flex-1">
                {
                    userData.map((prospect: ProspectRecord) => (
                        <ProspectCard
                            key={prospect._id}
                            data={{ _id: (prospect._id as string), email: prospect.email, first_name: prospect.first_name, last_name: prospect.last_name, phone: (prospect.phone as string), approved: prospect.is_approved }}
                        />
                    ))
                }
            </section>
            {/* <section className="footer sticky bottom-0 h-fit bg-stone-50">
                <div className="h-12 border-t border-stone-300 w-full flex gap-10 justify-end items-center">
                    <div className="join">
                        <Link href={responseData?.links?.previous.href || "#"} className={"join-item shadow p-3 hover:bg-sky-300 transition-all cursor-pointer " + prevLinkStyle}><FaAngleLeft /></Link>
                        <Link href={responseData?.links?.next.href || "#"} className={"join-item shadow p-3 hover:bg-sky-300 transition-all cursor-pointer " + nextLinkStyle}><FaAngleRight /></Link>
                    </div>
                </div>
            </section> */}
        </div>
    )
}