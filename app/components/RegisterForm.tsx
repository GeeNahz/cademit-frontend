"use client";

import React, { useState, useEffect, useRef } from "react";
import Paystack from "./Paystack";
import type { PaymentApproach, FormDataType } from "@/app/types"
import { PAYMENT_APPROACH, StatusType } from "@/app/types"
import clsx from "clsx";

type PropsType = {
    formData: FormDataType;
    price: number;
    setPrice: (x: any) => any;
    setFormData: (x: any) => any;
    handleSubmit: (ref: any) => any;
    formTitle?: string;
    formDesc?: string;
    formFooter?: React.ReactNode;
    message?: string | React.ReactNode;
    messageType?: StatusType;
    isLoading?: boolean;
}

function RegisterForm({ formData, price, setPrice, setFormData, handleSubmit, formTitle, formDesc, formFooter, message, messageType, isLoading }: PropsType) {
    const employmentStatus = [
        { id: 1, status: "Employed", },
        { id: 2, status: "Self-employed", },
        { id: 3, status: "Student", },
    ];

    const courseList = [
        { id: 1, title: "Data Science", },
    ];

    const experienceLevels = [
        {
            id: 1,
            value: 0,
            desc: "(I'm new to this field and have no idea)",
        },
        {
            id: 2,
            value: 1,
            desc: "(I have a little idea but don't know what to do)",
        },
        {
            id: 3,
            value: 2,
            desc: "(I have idea and want to build it)",
        },
        {
            id: 4,
            value: 3,
            desc: "(I have good knowledge and want to advance)",
        },
    ];

    const paymentMethods = [
        { id: 1, method: PAYMENT_APPROACH.FULL_PAYMENT, },
        { id: 2, method: PAYMENT_APPROACH.PER_MODULE, }
    ];

    const modulePrice = 15550;

    const courseModules = [
        { id: 1, name: "Beginner", price: modulePrice },
        { id: 2, name: "Intermediate", price: modulePrice },
        { id: 3, name: "Advance", price: modulePrice },
    ];

    const [showModules, setShowModules] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const formEl = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (formEl.current?.checkValidity()) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [formData]);

    useEffect(() => {
        const handleSetPrice = () => {
            if (formData.payment_approach === PAYMENT_APPROACH.FULL_PAYMENT) {
                setPrice(modulePrice * 3);
                setShowModules(false);
                formData.module = PAYMENT_APPROACH.FULL_PAYMENT;
            } else if (formData.payment_approach === PAYMENT_APPROACH.PER_MODULE) {
                setPrice(modulePrice);
                setShowModules(true);
            } else {
                setPrice(0);
                setShowModules(false);
                formData.module = PAYMENT_APPROACH.FULL_PAYMENT;
            }
        };

        handleSetPrice();
    }, [formData.payment_approach]);

    const btnTextColor = clsx(
        "btn btn-block",
        {
            "text-neutral btn-outline opacity-50 pointer-events-none": !isValid || isLoading,
            "text-inherit btn-success": isValid,
        },
    );

    const messageStyle = clsx(
        "text-sm text-center text-semibold py-2 px-3 rounded-md my-3",
        {
            "bg-sky-100 text-sky-400 border border-sky-400": messageType === "info",
            "bg-teal-100 text-teal-400 border border-teal-400": messageType === "success",
            "bg-red-100 text-red-400 border border-red-400": messageType === "error",
        },
    );

    return (
        <div className="h-full w-full py-20 px-5 md:px-0">

            <div className="title mb-5 text-center">
                <h1 className="text-4xl font-bold mb-5">{formTitle} Signup</h1>
                <p className='text-sm text-slate-500 py-3 block text-center'>
                    {formDesc && formDesc}
                </p>
            </div>

            <div className="w-full sm:w-[650px] mx-auto divide-y">

                <form ref={formEl} onSubmit={handleSubmit} className="py-10 px-3 block space-y-3">
                    <div className="group flex flex-col sm:flex-row gap-5">
                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>First name <span className="text-red-400">*</span></span>
                            <input type="text" className='form-input mt-1 block w-full rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' placeholder='John' value={formData.first_name} required onChange={(e) => setFormData((prev: any) => ({ ...prev, first_name: e.target.value }))} />
                        </label>

                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Last name <span className="text-red-400">*</span></span>
                            <input type="text" className='form-input mt-1 block w-full rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' value={formData.last_name} placeholder='Doe' required onChange={(e) => setFormData((prev: any) => ({ ...prev, last_name: e.target.value }))} />
                        </label>
                    </div>

                    <div className="group flex flex-col sm:flex-row gap-5">
                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Email <span className="text-red-400">*</span></span>
                            <input type="email" className='form-input mt-1 block w-full rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' placeholder='example@email.com' required value={formData.email} onChange={e => setFormData((prev: any) => ({ ...prev, email: e.target.value }))} />
                        </label>

                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Phone</span>
                            <input type="tel" className='form-input mt-1 block w-full rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0 placeholder:text-sm' placeholder='+234 567 8901 234' value={formData.phone} onChange={e => setFormData((prev: any) => ({ ...prev, phone: e.target.value }))} />
                        </label>
                    </div>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Employment status <span className="text-red-400">*</span></span>
                        <select name="employment-status" id="employment-status" className="form-select w-full block mt-1 rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0" onChange={e => setFormData((prev: any) => ({ ...prev, employment_status: e.target.value }))} required>
                            <option value="">-- Select status --</option>
                            {
                                employmentStatus.map((employment) => (
                                    <option key={employment.id} value={employment.status}>{employment.status}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Course <span className="text-red-400">*</span></span>
                        <select name="employment-status" id="employment-status" className="form-select w-full block mt-1 rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0" onChange={e => setFormData((prev: any) => ({ ...prev, course: e.target.value }))} required>
                            <option value="">-- Select course --</option>
                            {
                                courseList.map((employment) => (
                                    <option key={employment.id} value={employment.title}>{employment.title}</option>
                                ))
                            }
                        </select>
                    </label>

                    <fieldset className="block w-full">
                        <legend className="text-slate-600 text-sm">Experience Level <span className="text-red-400">*</span></legend>
                        <span className="text-slate-400 text-xs">On a scale of 0 - 3, what is your experience level on the course you've chosen?</span>
                        <div className="mt-2">
                            {
                                experienceLevels.map((exp) => (
                                    <div key={exp.id}>
                                        <label className="inline-flex items-center">
                                            <input className="form-radio focus:ring-0" type="radio" name="experience-level" value={exp.value} required onChange={(e) => setFormData((prev: any) => ({ ...prev, experience_level: parseInt(e.target.value) }))} />
                                            <span className=" text-sm ml-2">{exp.value}. {exp.desc}</span>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </fieldset>

                    <div>
                        <label className="block w-full">
                            <span className='text-slate-600 text-sm'>Method of payment <span className="text-red-400">*</span></span>
                            <p className="text-xs text-slate-400 mt-1">Each module costs the same.</p>
                            <select name="employment-status" id="employment-status" className="form-select w-full block mt-1 rounded border-zinc-200 focus:border focus:border-primary-focus focus:bg-transparent focus:ring-0" value={formData.payment_approach} onChange={(e) => setFormData((prev: any) => ({ ...prev, payment_approach: e.target.value as PaymentApproach }))} required>
                                <option value="">-- Select method of payment --</option>
                                {
                                    paymentMethods.map((method) => (
                                        <option key={method.id} value={method.method}>{method.method}</option>
                                    ))
                                }
                            </select>
                        </label>

                        {
                            showModules && (<div className="modules mt-3">
                                <fieldset className="block w-full">
                                    <legend className="text-slate-600 text-xs">Select a module</legend>
                                    <div className="mt-2">
                                        {
                                            courseModules.map((module) => (
                                                <div key={module.id}>
                                                    <label className="inline-flex items-center mt-2">
                                                        <input className="form-radio focus:ring-0" type="radio" name="module" value={module.name} onChange={(e) => setFormData((prev: any) => ({ ...prev, module: e.target.value }))} required />
                                                        <p className=" text-sm ml-2">{module.name}</p>
                                                    </label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </fieldset>
                            </div>)
                        }

                        <p className="text-stone-600 font-satoshi font-medium mt-3 ml-3">
                            Total: ₦ <span>{price}</span>
                        </p>
                    </div>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Access to a computer</span>
                        <div className="flex items-center mt-2">
                            <input className="form-checkbox block" type="checkbox" checked={formData.computer_access} onChange={(e) => setFormData(((prev: any) => ({ ...prev, computer_access: e.target.checked })))} />
                            <span className="text-slate-500 text-xs ml-2">Do you have access to a working computer?</span>
                        </div>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Internet acess</span>
                        <div className="flex items-center mt-2">
                            <input className="form-checkbox block" type="checkbox" checked={formData.internet_access} onChange={(e) => setFormData((prev: any) => ({ ...prev, internet_access: e.target.checked }))} />
                            <span className="text-slate-500 text-xs ml-2">Do you have access to good internet?</span>
                        </div>
                    </label>

                    <label className="block w-full">
                        <span className='text-slate-600 text-sm'>Our workspace</span>
                        <div className="flex items-center mt-2">
                            <input className="form-checkbox block" type="checkbox" checked={formData.use_workspace} onChange={(e) => setFormData((prev: any) => ({ ...prev, use_workspace: e.target.checked }))} />
                            <span className="text-slate-500 text-xs ml-2">Do you want to opt in to our workspace?</span>
                        </div>
                    </label>

                    {
                        message && (
                            <div className="messages pt-5">
                                <p className={messageStyle}>
                                    {message}
                                </p>
                            </div>
                        )
                    }

                    <div className="action divide-y-2 pt-5">
                        <button type="submit" className={btnTextColor}>Sign up</button>
                        {/* <Paystack
                            amount={price}
                            email={formData.email}
                            reference={(generateReferenceKey(formData))}
                            handleSubmit={(ref) => handleSubmit(ref)}
                            isDisable={!isValid}
                        /> */}
                    </div>

                </form>

                <p className='text-sm text-slate-500 py-10 block text-center'>
                    {formFooter && formFooter}
                </p>
            </div>
        </div>
    )
}

export default RegisterForm;
