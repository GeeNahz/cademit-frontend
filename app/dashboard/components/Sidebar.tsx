"use client";

import { useSession } from "next-auth/react";
import NavLink from "@/app/components/NavLink";

import Link from "next/link";
import { FaCaretRight } from "react-icons/fa"

const Sidebar = () => {
    const { data: session } = useSession();

    return (
        <aside className="border-r border-r-stone-300 mt-[calc(3.75rem*-1)] block transition-all ease-linear duration-200 w-[300px] will-change-transform">
            <div className="flex flex-col h-full max-h-screen pt-[3.75rem] top-0 w-[300px] transition-opacity duration-75 ease-linear delay-0">
                <nav className="py-2 pl-3 pr-0 mt-3 flex-grow font-medium overflow-x-hidden">
                    <ul className="m-0 pl-0">
                        {/* <li className="hover:bg-zinc-200 transition-colors rounded-sm">
                            <div className="flex flex-wrap relative rounded-md">
                                <NavLink className="flex-1 py-[0.375rem] px-3 leading-[1.25] flex items-center text-gray-500" href={`/dashboard/${session?.user.id as string}/overview`}>
                                    <span className="flex-1">Overview</span>
                                    <FaCaretRight className="h-5 w-5" />
                                </NavLink>
                            </div>
                        </li> */}
                        <li className="hover:bg-zinc-200 rounded-l-md overflow-hidden transition-colors mt-1 flex flex-wrap relative rounded-sm">
                            <NavLink className="flex-1 py-[0.55rem] px-3 leading-[1.25] flex items-center text-gray-500" href={`/dashboard/${session?.user.id as string}/overview`}>
                                <span className="flex-1">Overview</span>
                            </NavLink>
                        </li>
                        <li className="hover:bg-zinc-200 rounded-l-md overflow-hidden transition-colors mt-1 flex flex-wrap relative rounded-sm">
                            <NavLink className="flex-1 py-[0.55rem] px-3 leading-[1.25] flex items-center text-gray-500" href={`/dashboard/${session?.user.id as string}/prospects`}>
                                <span className="flex-1">Prospects</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar;
