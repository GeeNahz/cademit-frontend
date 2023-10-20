"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { ChevronDownIcon, Bars3Icon } from "@heroicons/react/20/solid"

import Backdrop from "@/app/components/Backdrop";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function changeIsOpenState(e: React.ChangeEvent<HTMLInputElement>) {
        setIsOpen(e.target.checked);
    }

    function closeMenubar() {
        setIsOpen(false);
    }

    useEffect(() => {
        let body = document.getElementsByTagName("body")[0] as HTMLBodyElement;
        isOpen ? body.style.overflowY = "hidden" : body.style.overflowY = "scroll";
    }, [isOpen]);


    return (
        // <header className="text-neutral h-fit z-20 shadow-sm lg:shadow w-full sticky top-0">
        <nav className="h-[3.75rem] w-full text-sm sticky top-0 z-50 border border-b border-b-stone-100">
            <div className="bg-white bg-opacity-60 glass z-50 relative h-full flex items-center">
                <div className="container flex justify-between items-center mx-auto">
                    <div className="flex gap-5 items-center">
                        <div className="logo transform translate-y-2">
                            <Link href="/" className="w-[145px] h-[51.55px]">
                                <img
                                    src="/logo.png"
                                    alt="CADEMit"
                                    width="145"
                                    height="51.55"
                                />
                            </Link>
                        </div>

                        <nav className="links hidden lg:block">
                            <ul className="flex gap-4">
                                <li>
                                    <Link href="/" className="hover:text-primary transition-colors duration-200">Product</Link>
                                </li>
                                <li className="dropdown dropdown-hover">
                                    <div className="hover:text-primary transition-colors duration-200 group w-full">
                                        <label tabIndex={0} className="m-1">Services <ChevronDownIcon className="inline h-5 w-5" /></label>
                                        <p tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-md bg-stone-100 rounded-box w-fit group-hover:text-neutral whitespace-nowrap">
                                            <Link href="/signup/pg-cohort" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3">PG Cohort Signup</Link>
                                            <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3">Support</Link>
                                            <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3">Community</Link>
                                            <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3">Hackathon</Link>
                                            <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3">Certifications and Accreditations</Link>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-primary transition-colors duration-200">About Us</Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="hover:text-primary transition-colors duration-200">Blogs and News</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="ctas hidden lg:flex gap-5">
                        <Link href="/signup" className="font-medium btn btn-primary bg-sky-500 hover:bg-sky-600 active:bg-sky-600">Sign up</Link>
                        <Link href="#" className="font-medium btn btn-outline text-stone-700 border-stone-300 hover:bg-stone-200">Sign in</Link>
                    </div>

                    <div className="block lg:hidden">
                        <div className="menu-btn flex items-center gap-2 cursor-pointer">
                            <Bars3Icon className="h-5 w-5" /> <span className="uppercase">menu</span>
                        </div>

                        <input
                            type="checkbox"
                            name="menu-toggle"
                            id="menu-toggle"
                            checked={isOpen}
                            onChange={changeIsOpenState}
                            className="fixed z-40 top-5 w-16 bg-neutral hover:cursor-pointer peer opacity-0"
                        />

                        <div className="opacity-30 z-10 h-screen hidden -left-[150%] peer-checked:-left-5 peer-checked:opacity-100 peer-checked:block transition-all duration-300 delay-100 w-fit absolute top-[3.70rem] bottom-0 border-none outline-none">
                            <div className="z-50 h-full glass bg-opacity-70 relative">
                                <ul className="space-y-10 text-start p-10 w-72 sm:w-96">
                                    <li>
                                        <Link href="/" onClick={closeMenubar} className="hover:text-primary transition-colors duration-200">Product</Link>
                                    </li>
                                    <li className="dropdown dropdown-hover">
                                        <div className="hover:text-primary transition-colors duration-200 group w-full">
                                            <label tabIndex={0} className="m-1">Services <ChevronDownIcon className="inline h-5 w-5" /></label>
                                            <p tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-md bg-stone-100 rounded-box w-fit group-hover:text-neutral whitespace-nowrap">
                                                <Link href="/signup/pg-cohort" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3" onClick={closeMenubar}>PG Cohort Signup</Link>
                                                <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3" onClick={closeMenubar}>Support</Link>
                                                <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3" onClick={closeMenubar}>Community</Link>
                                                <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3" onClick={closeMenubar}>Hackathon</Link>
                                                <Link href="/" className="w-full hover:text-primary hover:bg-white transition-colors my-px rounded-lg py-2 px-3" onClick={closeMenubar}>Certifications and Accreditations</Link>
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/about" onClick={closeMenubar} className="hover:text-primary transition-colors duration-200">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" onClick={closeMenubar} className="hover:text-primary transition-colors duration-200">Blogs and News</Link>
                                    </li>
                                    <li>
                                        <Link href="/signup" onClick={closeMenubar} className="btn btn-block btn-primary">Sign up</Link>
                                    </li>
                                    <li>
                                        <Link href="#" onClick={closeMenubar} className="btn btn-block btn-primary btn-outline">Sign in</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Backdrop onClick={closeMenubar} isActive={isOpen} />
        </nav>
        // </header>
    );
}