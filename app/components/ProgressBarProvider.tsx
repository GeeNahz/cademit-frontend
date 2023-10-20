"use client";


import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


export default function ({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ProgressBar
                shallowRouting
                options={{ showSpinner: true }}
                color="#2185c7"
                height="4px"
            />
        </>
    );
}