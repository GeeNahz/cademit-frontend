"use client";

import { HTMLAttributes } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    exact?: boolean;
    children: React.ReactNode;
}

export default function NavLink({ href, exact, children, ...attrs }: NavLinkProps) {
    const pathname = usePathname();
    let url = href.split("?")[0];    
    const active = " bg-primary-focus text-white";
    const isActive = exact ? pathname === href : pathname.startsWith(url);

    if (isActive) {
        attrs.className += active;
    }

    return (
        <Link href={href} {...attrs}>{children}</Link>
    );
}
