"use client";

import { ProspectRecord } from "@/app/types";
import { FETCH_STATUS } from "@/utils/status";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

async function fetchProspect(id: string | number) {
    try {
        const response = await fetch(`/api/v1/prospects/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`${response.statusText}`);
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}

export default function ProspectDetails({ params }: { params: { prospectId: string } }) {
    const [status, setStatus] = useState(FETCH_STATUS.IDLE);
    const [details, setDetails] = useState<ProspectRecord>();
    async function getProspectDetails() {
        try {
            const data = await fetchProspect(params.prospectId);
            setDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProspectDetails();
    }, [])

    async function handleApproval(is_approved: boolean) {
        setStatus(FETCH_STATUS.LOADING);

        const payload = {
            id: details?._id,
            is_approved
        };

        try {
            const response = await fetch("/api/v1/prospects/approve", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setDetails(await response.json());
                setStatus(FETCH_STATUS.SUCCESS);
            } else {
                throw new Error(`${response.statusText}`);
            }
        } catch (error) {
            setStatus(FETCH_STATUS.ERROR)
            console.log(error);
        } finally {
            setTimeout(() => {
                setStatus(FETCH_STATUS.IDLE);
            }, 5000);
        }

    }

    const badgeColor = clsx(
        "badge absolute top-0 right-0",
        {
            "badge-success": details?.is_approved,
            "badge-error": !details?.is_approved,
        },
    );

    return (
        <div className="w-full max-w-3xl">
            {
                details && (<div className="divide-y space-y-10">
                    <div className="title-name">
                        <p className="font-light text-xs text-stone-500 mb-3">Bio data</p>

                        <div className="details relative">
                            <div title={details.is_approved ? "Is approved" : "Not approved"} className={badgeColor}></div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Name: </p>
                                <p className="font-semibold text-base">{details.first_name + " " + details.last_name}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Gender:</p>
                                <p className="font-semibold text-base">{details.gender}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Employment status</p>
                                <p className="font-semibold text-base">{details.employment_status}</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact">
                        <p className="font-light text-xs text-stone-500 mb-3 mt-10">Contact</p>

                        <div className="details">
                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Email: </p>
                                <p className="font-semibold text-base">{details.email}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Phone:</p>
                                <p className="font-semibold text-base">{details.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="application">
                        <p className="font-light text-xs text-stone-500 mb-3 mt-10">Application</p>

                        <div className="details">
                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Course: </p>
                                <p className="font-semibold text-base">{details.course}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Experience level:</p>
                                <p className="font-semibold text-base">{details.experience_level}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Have access to computer:</p>
                                <p className="font-semibold text-base">{details.computer_access ? "Yes" : "No"}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Have access to internet: </p>
                                <p className="font-semibold text-base">{details.internet_access ? "Yes" : "No"}</p>
                            </div>

                            <div className="flex gap-3 items-center">
                                <p className="text-sm">Want to use our workspace:</p>
                                <p className="font-semibold text-base">{details.use_workspace ? "Yes" : "No"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="statement">
                        <p className="font-light text-xs text-stone-500 mb-3 mt-10">Statement of Purpose</p>
                        <div className="textarea textarea-ghost">
                            <p>{details.purpose}</p>
                        </div>
                    </div>

                    <div className="actions pt-10 flex items-center justify-between px-10">
                        <Link className="font-semibold blue_gradient" href={"/dashboard/kladf-asdfjl-as2kj/prospects"}>Back</Link>

                        <div className="approvals flex gap-5">
                            <button
                                disabled={!details.is_approved}
                                className="text-red-500 hover:text-red-700 transition-colors duration-200 underline-offset-2 underline disabled:opacity-50"
                                onClick={() => handleApproval(false)}>
                                    {details.is_approved && (status === FETCH_STATUS.LOADING) ? <i>Revoking...</i> : "Revoke"}
                                </button>

                            <button
                                disabled={details.is_approved}
                                className="btn bg-sky-500 border-0 text-white disabled:opacity-50 disabled:text-black"
                                onClick={() => handleApproval(true)}>
                                    {!details.is_approved && (status === FETCH_STATUS.LOADING) ? <i>Approving...</i> : "Approve"}
                                </button>

                        </div>

                    </div>
                </div>)
            }
        </div>
    );
}