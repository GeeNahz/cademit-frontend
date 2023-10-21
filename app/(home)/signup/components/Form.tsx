"use client";

import { Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { FormField, FormSelectOptions, INPUT_TYPES } from "@/app/types";


type FormProps = {
    header?: string;
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

function generateFormFields(field: FormField, data: {} | any, setData: Dispatch<SetStateAction<any>>, idx: string | number) {
    switch (field.type) {
        case INPUT_TYPES.TEXT:
        case INPUT_TYPES.EMAIL:
        case INPUT_TYPES.TEL:
        case INPUT_TYPES.PASSWORD:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full">
                    <span className="font-satoshi font-semibold text-base text-gray-700">{field.label}</span>

                    <input
                        type={field.type}
                        id={field.fieldProps?.id}
                        value={(field.value as string | number)}
                        onChange={(e) => setData({ ...data, [field.fieldName]: e.target.value })}
                        placeholder={field.fieldProps?.placeholder}
                        required={field.fieldProps?.required}
                        className="form_input"
                    />
                </label>
            );
        case INPUT_TYPES.RADIO:
            return (
                <label key={field.fieldName}>
                    <span className="font-satoshi font-semibold text-base text-gray-700">{field.label}</span>

                    {
                        (field?.selectOptions as []).map((option: FormSelectOptions) => (
                            <div key={option.id} className="mb-1">
                                <input
                                    type={field.type}
                                    name={field.fieldName}
                                    value={(option.value).toString()}
                                    onChange={(e) => setData({ ...data, [field.fieldName]: parseInt(e.target.value) })}
                                    required
                                />
                                <span className="ml-3">{option.value} &nbsp; {option.title}</span>
                            </div>
                        ))
                    }
                </label>
            );
        case INPUT_TYPES.CHECKBOX:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full flex items-center gap-3">
                    <input
                        type={field.type}
                        id={field.fieldProps?.id}
                        checked={field.value as boolean}
                        onChange={(e) => setData({ ...data, [field.fieldName]: e.target.checked })
                        }
                        className="rounded border border-stone-400"
                        required={field.fieldProps?.required}
                    />
                    <span className="font-satoshi font-normal text-base text-gray-500">{field.label}</span>
                </label>
            );
        case INPUT_TYPES.SELECT:
            return (
                <label key={field.fieldName} htmlFor={field.fieldProps?.id} className="w-full">
                    <span className="font-satoshi font-semibold text-base text-gray-700">{field.label}</span>

                    <select name={field.fieldName} id={field.fieldProps?.id} onChange={(e) => setData({ ...data, [field.fieldName]: e.target.value })} value={field.value as string} required={field.fieldProps?.required} className="form_input">
                        <option value="">-- Select {field.label} --</option>
                        {
                            (field.selectOptions as []).map((option: FormSelectOptions) => (
                                <option key={option.id} value={(option.value as string | number)}>{option.title}</option>
                            ))
                        }
                    </select>
                </label>
            );
        default:
            return (
                <p key={idx} className="text-red text-lg font-semibold text-center py-5">Please provide a field with valid input type: {field.type}</p>
            );
    };
}

export default function Form({ type, header, desc, fields, submitting, data, message, messageType, setData, handleSubmit, }: FormProps) {
    const formEl = useRef<HTMLFormElement>(null);
    
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
      console.log("Changed data.");
      
      return () => {}
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
            "text-neutral btn-outline opacity-50 pointer-events-none": !isValid || submitting,
            "text-inherit btn-success": isValid,
        },
    );

    return (
        <div className="w-full max-w-full my-10 flex items-center flex-col">
            <h1 className="head_text font-satoshi text-left">
                <span className="blue_gradient">{header ? header : `${type} Profile`}</span>
            </h1>
            <p className="desc text-center max-w-xs">
                {desc ? desc : `${type} your profile.`}
            </p>

            <form
                ref={formEl}
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
            >
                {
                    fields.map((field, idx) => generateFormFields(field, data, setData, idx))
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
            </form>
        </div>
    );
}