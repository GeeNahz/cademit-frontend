"use client";

import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { FormField } from "@/app/types";

import { generateFormFields } from "@/utils/forms";

type FormProps = {
    header?: string;
    footer?: string | React.ReactNode;
    desc?: string;
    message?: string;
    messageType?: string;
    type: string;
    fields: FormField[];
    submitting: boolean;
    data: any;
    setData: Dispatch<SetStateAction<any>>;
    handleSubmit: (e: FormEvent) => any;
};

export default function Form({ type, header, footer, desc, fields, submitting, data, message, messageType, setData, handleSubmit, }: FormProps) {
    const formEl = useRef<HTMLFormElement>(null);

    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
        if (formEl.current?.checkValidity()) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [data]);

    const messageStyle = clsx(
        "text-center text-xs sm:text-sm font-inter font-semibold py-2 mt-2 border rounded",
        {
            "bg-blue-100 text-blue-500 border-blue-400": messageType === "info",
            "bg-green-100 text-green-500 border-green-400": messageType === "success",
            "bg-red-100 text-red-500 border-red-400": messageType === "error",
        }
    );

    const btnStyle = clsx(
        "px-5 py-3 text-base font-semibold bg-amber-500 hover:bg-accent-focus active:bg-accent-content transition-colors duration-200 rounded-md text-white w-full",
        {
            "text-neutral opacity-50 pointer-events-none": !isValid || submitting,
            "text-inherit btn-success": isValid,
        },
    );

    const divideClass = clsx(
        {
            "divide-y": footer,
        }
    );

    return (
        <div className="w-full max-w-full my-10 flex items-center flex-col">
            <div className="header">
                <h1 className="head_text font-satoshi text-left">
                    <span className="blue_gradient">{header ? header : `${type} Profile`}</span>
                </h1>
                <p className="desc text-center max-w-xs">
                    {desc ? desc : `${type} your profile.`}
                </p>
            </div>

            <div className={divideClass + " w-full h-full flex items-center flex-col"}>
                <form
                    ref={formEl}
                    onSubmit={handleSubmit}
                    className={divideClass + " mt-10 mb-5 w-full max-w-2xl glassmorphism"}
                >
                    <div className="form w-full mb-8 flex flex-col gap-5">
                        {
                            fields.map((field, index) => generateFormFields(field, data, setData, index))
                        }

                        {
                            message &&
                            <div className={messageStyle}>
                                <p>{message}</p>
                            </div>
                        }

                        <div className="mt-4 gap-4 w-full">
                            <button type="submit" disabled={submitting} className={btnStyle}>
                                {submitting ? <i>{type}...</i> : `${type}`}
                            </button>
                        </div>
                    </div>

                    <div className="footer pt-5 w-full">{footer}</div>
                </form>
            </div>
        </div>
    );
}