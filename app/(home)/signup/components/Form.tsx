import { Dispatch, FormEvent, SetStateAction } from "react";
import { StudentRecord } from "@/app/types";

import type { StatusType } from "@/app/types";
import clsx from "clsx";

type FormProps = {
    type: string;
    submitting: boolean;
    record: StudentRecord;
    message?: string;
    messageType?: StatusType;
    setRecord: Dispatch<SetStateAction<StudentRecord>>;
    handleSubmit: (e: FormEvent) => any;
};

export default function Form({ type, submitting, record, message, messageType, setRecord, handleSubmit, }: FormProps) {
    const employmentStatuses = [
        { id: 1, status: "Employed", },
        { id: 2, status: "Self-employed", },
        { id: 3, status: "Student", },
    ];

    const courseList = [
        { id: 1, title: "Data Science", },
        { id: 2, title: "Frontend Development", },
        { id: 3, title: "Backend Development", },
        { id: 4, title: "UI/UX Design", },
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

    const messageStyle = clsx(
        "text-center text-xs sm:text-sm font-inter font-semibold py-2 mt-2 border rounded",
        {
            "bg-blue-100 text-blue-500 border-blue-400": messageType === "info",
            "bg-green-100 text-green-500 border-green-400": messageType === "success",
            "bg-red-100 text-red-500 border-red-400": messageType === "error",
        }
    );

    return (
        <div className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text font-satoshi text-left">
                <span className="blue_gradient">{type} Profile</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} your profile.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-5 glassmorphism"
            >
                <div className="flex flex-col md:flex-row gap-3">
                    <label htmlFor="firstname" className="w-full">
                        <span className="font-satoshi font-semibold text-base text-gray-700">First name</span>

                        <input
                            type="text"
                            id="firstname"
                            value={record.first_name}
                            onChange={(e) => setRecord({ ...record, first_name: e.target.value })}
                            placeholder="John"
                            required
                            className="form_input"
                        />
                    </label>

                    <label htmlFor="lastname" className="w-full">
                        <span className="font-satoshi font-semibold text-base text-gray-700">Last name</span>

                        <input
                            type="text"
                            id="lastname"
                            value={record.last_name}
                            onChange={(e) => setRecord({ ...record, last_name: e.target.value })}
                            placeholder="Doe"
                            required
                            className="form_input"
                        />
                    </label>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <label htmlFor="email" className="w-full">
                        <span className="font-satoshi font-semibold text-base text-gray-700">Email</span>

                        <input
                            type="email"
                            id="email"
                            value={record.email}
                            onChange={(e) => setRecord({ ...record, email: e.target.value })}
                            placeholder="example@email.com"
                            required
                            className="form_input"
                        />
                    </label>

                    <label htmlFor="phone" className="w-full">
                        <span className="font-satoshi font-semibold text-base text-gray-700">Phone number</span>

                        <input
                            type="tel"
                            id="phone"
                            value={record.phone}
                            onChange={(e) => setRecord({ ...record, phone: e.target.value })}
                            placeholder="+2345678901234"
                            required
                            className="form_input"
                        />
                    </label>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <label htmlFor="employment-status" className="w-full">
                        <span className="font-satoshi font-semibold text-base text-gray-700">Employment status</span>

                        <select name="employment-status" id="employment-status" onChange={(e) => setRecord({ ...record, employment_status: e.target.value })} value={record.employment_status} required className="form_input">
                            <option value="">-- Select status --</option>
                            {
                                employmentStatuses.map((status) => (
                                    <option key={status.id} value={status.status}>{status.status}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label htmlFor="course" className="w-full">
                        <span className="font-satoshi font-semibold text-base text-gray-700">Course</span>

                        <select name="course" id="course" onChange={(e) => setRecord({ ...record, course: e.target.value })} value={record.course} required className="form_input">
                            <option value="">-- Select course --</option>
                            {
                                courseList.map((course) => (
                                    <option key={course.id} value={course.title}>{course.title}</option>
                                ))
                            }
                        </select>
                    </label>
                </div>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">Experience Level</span>

                    {
                        experienceLevels.map((level) => (
                            <div key={level.id} className="mb-1">
                                <input
                                    type="radio"
                                    name="exp-level"
                                    value={(level.value).toString()}
                                    onChange={(e) => setRecord({ ...record, experience_level: parseInt(e.target.value) })}
                                    required
                                />
                                <span className="ml-3">{level.value} &nbsp; {level.desc}</span>
                            </div>
                        ))
                    }
                </label>

                <label htmlFor="computer" className="w-full flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="computer"
                        checked={record.computer_access}
                        onChange={(e) => setRecord({ ...record, computer_access: e.target.checked })}
                        className="rounded border border-stone-400"
                    />
                    <span className="font-satoshi font-normal text-base text-gray-500">I have access to a computer</span>
                </label>

                <label htmlFor="internet" className="w-full flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="internet"
                        checked={record.internet_access}
                        onChange={(e) => setRecord({ ...record, internet_access: e.target.checked })}
                        className="rounded border border-stone-400"
                    />
                    <span className="font-satoshi font-normal text-base text-gray-500">I have access to good internet connection</span>
                </label>

                <label htmlFor="workspace" className="w-full flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="workspace"
                        checked={record.use_workspace}
                        onChange={(e) => setRecord({ ...record, use_workspace: e.target.checked })}
                        className="rounded border border-stone-400"
                    />
                    <span className="font-satoshi font-normal text-base text-gray-500">I want to use your workspace</span>
                </label>

                {
                    message &&
                    <div className={messageStyle}>
                        <p>{message}</p>
                    </div>
                }

                <div className="mt-4 gap-4 w-full">
                    <button type="submit" disabled={submitting} className="px-5 py-3 text-base font-semibold bg-amber-500 hover:bg-accent-focus active:bg-accent-content transition-colors duration-200 rounded-md text-white w-full">
                        {submitting ? <i>{type}...</i> : `${type}`}
                    </button>
                </div>
            </form>
        </div>
    );
}