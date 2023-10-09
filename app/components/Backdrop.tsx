"use client";

import clsx from "clsx";

interface Props {
    onClick?: () => any;
    isActive?: boolean;
}

const Backdrop = ({ onClick, isActive }: Props) => {
    const backdropFade = clsx(
        "absolute z-0 top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black transition-all",
        {
            "bg-opacity-40 duration-100 block backdrop-blur-sm": isActive,
            "bg-opacity-0 duration-200 delay-300 hidden": !isActive,
        },
    );

    return (
        <div
            onClick={() => {
                if (onClick) onClick()
            }}
            className={backdropFade}
        ></div>
    )
}

export default Backdrop;
