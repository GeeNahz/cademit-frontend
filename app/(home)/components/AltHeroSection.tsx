"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Typed from "typed.js";

const AltHeroSection = () => {
    const typedEl = useRef<HTMLSpanElement>(null);
    const typedStrings = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            stringsElement: typedStrings.current as Element,
            typeSpeed: 30,
            backSpeed: 10,
            backDelay: 800,
            cursorChar: "|",
            loop: true,
        })
        
        return () => {
            typed.destroy();
        };
    }, []);
    
    return (
        <main className="min-h-[720px] w-full max-w-[calc(1234px + 56px * 2)] text-center mt-0 sm:mt-20 mb-0 mx-auto py-0 px-[32px] sm:px-[56px] overflow-hidden isolate border-b border-stone-300 flex flex-col items-center justify-center">
            <div>
                <h1 className="p-6 font-extrabold leading-[1] tracking-tighter hero-title-font-size gradient-text text-center sm:text-start ml-0 sm:ml-14">The Tech Plug <span className="block md:hidden"></span> 
                <div className="hidden" ref={typedStrings}>
                    <p>You Can Trust</p>
                    <p>that is guranteed</p>
                    <p>For Everyone</p>
                </div>
                <span ref={typedEl}></span></h1>

                <div className="py-6 px-8 text-stone-500 font-normal leading-[1.8] tracking-[-0.01em] left-px w-[calc(100% - 1px *2)] hero-subtitle-font-size">
                    <p>We are you reliable source for all things technological. <strong className="text-stone-900 font-medium">Let our expertise be your guide</strong> to seamless innovation and digital empowerment.</p>
                </div>

                <div className="hero-footer h-full flex flex-col items-center justify-start gap-4 p-0">
                    <div className="footer-items flex flex-col items-center justify-start p-10 gap-4">
                        <div className="footer-btns flex items-center justify-start p-0 gap-4">
                            <Link href="/signup" className="font-medium btn btn-primary bg-sky-500 hover:bg-sky-600 active:bg-sky-600">Sign up</Link>
                            <Link href="/about" className="font-medium btn btn-outline text-stone-700 border-stone-300 hover:bg-stone-200">Learn more</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AltHeroSection;
